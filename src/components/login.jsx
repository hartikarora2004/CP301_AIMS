import React, { useState } from "react";// Importing your Nav component
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent

  const handleSendOtp = () => {
    // Check if email ends with '@iitrpr.ac.in'
    if (!email.endsWith("@iitrpr.ac.in")) {
      setError("Please enter a valid IIT Ropar email address.");
      return;
    }
    setError(""); // Clear any previous error messages
    setOtpSent(true); // OTP sent
    alert(`Sending OTP to ${email}`);
  };

  const handleVerifyOtp = () => {
    // Check if OTP is a 6-digit number
    const otpPattern = /^\d{6}$/;
    if (!otp.match(otpPattern)) {
      setError("OTP must be a 6-digit number.");
      return;
    }
    setError(""); // Clear any previous error messages
    alert(`Verifying OTP: ${otp}`);
  };

  return (
    <>
      <div className="header">Academic Information Management System</div>
      <main className="content">
        <div className="login-option">
          <h2>Login with Email and OTP</h2>
          <form className="otp-form">
            <label htmlFor="email">Enter your Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && !otpSent && <div className="error-message">{error}</div>} {/* Show error below email input if OTP hasn't been sent */}

            <button
              type="button"
              className="send-otp-button"
              onClick={handleSendOtp}
              disabled={!email}
            >
              Send OTP
            </button>

            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={!otpSent}
            />
            {error && otpSent && <div className="error-message">{error}</div>} {/* Show error below OTP input if OTP is sent */}

            <button
              type="button"
              className="verify-otp-button"
              onClick={handleVerifyOtp}
              disabled={!otp || !otpSent}
            >
              Verify OTP
            </button>
          </form>
        </div>
      </main>
      <div className="footer">
        © 2025 IIT Ropar | Contact: aims_help@iitrpr.ac.in
      </div>
    </>
  );
}

export default Login;
