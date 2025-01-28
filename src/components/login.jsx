import React, { useState } from "react";
import { useAuth } from "../context/authContext"; // Import useAuth for authentication
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate(); // Initialize navigate for routing

  const handleSendOtp = async () => {
    if (!email.endsWith("@iitrpr.ac.in")) {
      setError("Please enter a valid IIT Ropar email address.");
      return;
    }
    setError(""); // Clear any previous error messages
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/sendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        alert('OTP sent successfully!');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpPattern = /^\d{6}$/;
    if (!otp.match(otpPattern)) {
      setError("OTP must be a 6-digit number.");
      return;
    }
    setError(""); // Clear any previous error messages
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/auth/verifyOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        setRole(data.role);
        setUsername(data.username);
        localStorage.setItem('instructorName', data.usrname);
        localStorage.setItem('_id', data._id);
        localStorage.setItem('role', data.role);
        //console.log(data.username);
        //console.log(localStorage.getItem('instructorName'));
        //console.log(localStorage.getItem('_id')); 
        login(); // Call login function to update auth context
        redirectToPage(data.role);
        //console.log(data.role);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const redirectToPage = (role) => {
    // Use navigate for routing without page reload
    if (role === 'student') {
      navigate("/student");
    } else if (role === 'faculty') {
      navigate("/faculty");
    } else if (role === 'admin') {
      navigate("/admin");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpSent) {
      handleVerifyOtp();
    } else {
      handleSendOtp();
    }
  };

  return (
    <>
      <div className="header">Academic Information Management System</div>
      <main className="content">
        <div className="login-option">
          <h2>Login with Email and OTP</h2>
          <form className="otp-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && !otpSent && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="send-otp-button"
              disabled={!email || loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            {otpSent && (
              <>
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                {error && otpSent && <div className="error-message">{error}</div>}

                <button
                  type="submit"
                  className="verify-otp-button"
                  disabled={!otp || loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
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
