const nodemailer = require("nodemailer");

const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hartikarora2502@gmail.com", // Use your email
      pass: "hoqw xjth razc okbp", // Use your email password
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