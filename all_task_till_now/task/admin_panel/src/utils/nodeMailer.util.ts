import nodemailer from "nodemailer";
import { nodemailerConfig } from "../../envConfig";

export class EmailSender {
  static transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: nodemailerConfig.NODEMAILER_EMAIL,
        pass: nodemailerConfig.NODEMAILER_PASSWORD,
    },
  });
}
