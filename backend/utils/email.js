const nodemailer = require("nodemailer");
require('dotenv').config();

const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID, // Use your email
      pass: process.env.PASSWORD, // Use your email password
    },
  });

  const mailOptions = {
    from: "hartikarora2502@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = sendOtpEmail;