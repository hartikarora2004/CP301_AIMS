import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/download.png";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove student-related data from localStorage
    localStorage.removeItem("_id");
    localStorage.removeItem("role");
    localStorage.removeItem("student_token");
    console.log("Running logout"); // If using token-based authentication

    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="logout">
      <img 
        src={require("../assets/download.png")} 
        alt="Logout" 
        style={{ width: "30px", height: "30px", cursor: "pointer" }} 
        onClick={handleLogout} 
      />
    </div>
  );
};
export default Logout;
