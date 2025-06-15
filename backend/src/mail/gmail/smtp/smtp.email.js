import { transporter } from './smtp.config.js';
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from '../../email.templates.js';

export const sendVerificationMail = async (email, verificationToken) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.GMAIL_SMTP_USER,
            to: email,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });
        console.log("Verification Email sent successfully", response);
    } catch(error) {
        console.log("Failed to send Verification Email", error);
        throw new Error(`Failed to send Verification Email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.GMAIL_SMTP_USER,
            to: email,
            subject: "Welcome Email",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name)
        }); 
        console.log(`Welcome Email send succesfully ${response}`)
        
    } catch(error){
        console.log("Failed to send Welcome Email", error);
        throw new Error(`Failed to send Welcome Email: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, name, resetUrl) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.GMAIL_SMTP_USER,
            to: email,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE
                .replace("{name}", name)
                .replace("{resetURL}", resetUrl),
        })
        console.log("Password Reset Email sent successfully")
    } catch(error) {
        console.log(`Error sending password reset email ${error}`);
        throw new Error(`Error sending password reset email ${error}`);
    }
}

export const sendResetSuccessEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.GMAIL_SMTP_USER,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE
                .replace("{name}", name)
        })
        console.log("Password Reset mail sent")
    } catch(error){
        console.log(`Error sending password reset success email ${error}`);
        throw new Error(`Error sending password reset success email ${error}`);
    }
}