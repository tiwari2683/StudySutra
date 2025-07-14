//nodemailer package is used to send emails to the users
const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({

      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        
      },
      tls: {
        rejectUnauthorized: false,
      },
      secure: false,
    });
    let info = await transporter.sendMail({
      from: `"ShikshaSutra" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = mailSender;
