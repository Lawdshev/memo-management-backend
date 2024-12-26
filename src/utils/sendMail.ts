import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

const sendEmail = async ({ to, subject, text }: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Or any email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
  });

  const mailOptions = {
    from: "no-reply@yourapp.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
