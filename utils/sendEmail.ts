import nodemailer, { TransportOptions } from 'nodemailer';

interface EmailOptions {
  email: string | string[];
  subject: string;
  message: string;
}

// 1) Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_NAME,
    pass: process.env.GMAIL_PASSWORD,
  },
} as TransportOptions);

export default async function sendEmail(options: EmailOptions) {
  //2) Define the email options
  const mailOptions = {
    from: `BOTFEST`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3) Actually send the email
  await transporter.sendMail(mailOptions);
}
