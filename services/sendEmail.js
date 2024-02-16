import nodemailer from "nodemailer"

export const sendEmail = async (options) => {
    var transport = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
        
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASS
      },
      tls: {
          rejectUnauthorized:true
        }
      });
    const mailOptions = {
    from:  process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};