import { mailTrapClient, sender } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

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