import { User } from '../models/user.model.js'
import { randomInt } from 'crypto';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/genTokenAndSetCookie.js';
import { sendVerificationMail, sendWelcomeEmail } from '../mailtrap/email.js';

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

        generateTokenAndSetCookie(res, user._id);
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

export const login = (req, res) => {
    res.send("Login route updated");
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