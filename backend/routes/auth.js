const express = require('express');
const sendOtpEmail  = require('../utils/email');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();
let otpStore = {};

router.post('/sendOtp', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ mail_id: email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;
  sendOtpEmail(email, otp);
  //console.log(otp)
  res.status(200).json({ message: 'OTP sent to email' });
});

router.post('/verifyOtp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ mail_id: email });
  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    const token = jwt.sign({ email }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'OTP verified', role: user.role, username: user.username, _id: user._id, token });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
