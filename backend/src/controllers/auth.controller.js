import { User } from '../models/user.model.js'
import { randomInt } from 'crypto';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; 
import { generateTokenAndSetCookie } from '../utils/genTokenAndSetCookie.js';
import { sendVerificationMail, sendWelcomeEmail, sendPasswordResetEmail } from '../mailtrap/email.js';

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

        // create user 
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            verificationToken, 
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
        res.clearCookie("token")
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
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user){
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired verification code"
            });
        }
    
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
}