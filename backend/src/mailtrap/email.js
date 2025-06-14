import { mailTrapClient, sender } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplates.js"

export const sendVerificationMail = async (email, verificationToken) => {

    const recipient = [{email}]

    try{
        
        const response =  await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verfication",
        })

        console.log("Verfication Email sent successfully", response)

    } catch(error){
        console.log("Failed to send Verfication Email", error);
        throw new Error(`Failed to send Verfication Email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {

    const recipient = [{email}]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: '54f513c5-d36d-45c0-bfb7-86af12ad728a',
            template_variables: {
                name: name
            },
        }); 
        console.log(`Welcome Email send succesfully ${response}`)
        
    } catch(error){
        console.log("Failed to send Welcome Email", error);
        throw new Error(`Failed to send Welcome Email: ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, name, resetUrl) => {
    const recipient = [{ email }]
    try {
        const response = mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE
                .replace("{name}", name)
                .replace("{resetURL}", resetUrl),
            category: "Password Reset",
        })

    } catch(error) {
        console.log(`Error sending password reset email ${error}`);
        throw new Error(`Error sending password reset email ${error}`);
    }
}