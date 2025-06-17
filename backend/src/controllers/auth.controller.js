import { User } from '../models/user.model.js'
import { randomInt } from 'crypto';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; 
import { generateTokenAndSetCookie } from '../utils/genTokenAndSetCookie.js';
//import { sendVerificationMail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mail/mailtrap/mailtrap.email.js';
import { sendVerificationMail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mail/gmail/smtp/smtp.email.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // generate verification token
        const verificationToken = randomInt(100000, 999999);
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); //24 hours

        // hashing verification token
        const vt_salt = await bcrypt.genSalt(10);
        const hashedVerficationToken = await bcrypt.hash(verificationToken.toString(), vt_salt);

        // create user 
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            verificationToken: hashedVerficationToken, 
            verificationTokenExpiresAt 
        });

        // save user to DB
        await user.save();

        // create JWT token and add to cookies
        generateTokenAndSetCookie(res, user._id);

        // send a verification mail
        await sendVerificationMail(email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully", 
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if (!email || !password){
            return res.status(400).json({message:"All fields are required."})
        }
        
        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }
        
        // Password Verification
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch){
            user.lastLogin = Date.now();
            generateTokenAndSetCookie(res, user._id)
            return res.status(200).json({
                success:true, 
                message:"Login Successful",
                user: {
                    ...user._doc,
                    password: undefined,
                }        
            });
        } else {
            return res.status(400).json({success:false, message: "Invalid Credentials"});
        }
    } catch(error) {
        console.log("Error Logging in ", error);
        return res.status(500).json({success:false, message:"Server Error"})
    }
};

export const logout = (req, res) => {
    try{
        res.clearCookie("jwt")
        res.status(200).json({success:true, message:"Logout Successful"})
    } catch(error){
        console.log("Error logging out", error.message);
        return res.status(500).json({success:false, message:"Server Error"})
    }
};

export const verifyEmail = async (req, res) => {
    
    const { id, code } = req.body
    try {
        if (!id || !code ){
            return res.status(400).json({message: "Alll fields are required"})
        }

    
        const user = await User.findOne({
            _id: id,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });


        if (!user){
            return res.status(400).json({
                success: false,
                message: "Expired verification code"
            });
        }

        const isMatch = await bcrypt.compare(code.toString(), user.verificationToken);

        if (isMatch){

            user.isVerified = true;
            user.verificationToken=undefined;
            user.verificationTokenExpiresAt=undefined;
            await user.save();
        
            await sendWelcomeEmail(user.email, user.name)
            return res.status(200).json({
                success: true,
                message: "Email verified succesfully",
                user: {
                    ...user._doc,
                    password: undefined,
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            });
        }
    
        
    } catch(error){
        console.log("error in verifying email", error.message)
        return res.status(500).json({success: false, message: "Server Error"})
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{
        if (!email) {
            return res.status(400).json({success: false, message:"Email is required"})
        }
        
        const user = await User.findOne({
            email: email
        })

        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        // setting up a user token for 2 factor authentication with expiration
        user.resetPasswordToken = crypto.randomBytes(24).toString('hex');
        user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000);    //  15 minutes expiration

        // saving to db
        await user.save()

        // send password reset email
        await sendPasswordResetEmail(user.email, user.name, `${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`)

        return res.status(200).json({
            success: true,
            message: "Password Reset link has been sent to your email",
        })

    } catch(error) {
        console.log("Error in Forgot Password logic", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
};

export const resetPassword = async (req, res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        // find user with same reset token and make sure it is not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt : Date.now() },
        });

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or expired reset token"});
        }

        // update password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        // remove reset token and expiration from db
        user.resetPasswordExpiresAt=undefined;
        user.resetPasswordToken=undefined;

        await user.save();

        //sending success email
        await sendResetSuccessEmail(user.email, user.name);
        
        // logging out user
        res.clearCookie("token")
        return res.status(200).json({success: true, message: "Password reset successfully"})

    } catch(error) {
        console.log("Error in Reset Password logic", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
};

export const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password")

        if (!user) return res.status(400).json({success: false, message: "User not found"});

        return res.status(200).json({success: true, user});

    } catch(error){
        console.log("Error in Check Auth", error.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
}