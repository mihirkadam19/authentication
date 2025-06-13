import { MailtrapClient } from "mailtrap";

export const mailTrapClient = new MailtrapClient({
  token: process.env.API_TOKEN_MAILTRAP,
});


export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};