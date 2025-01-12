import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">AIMS</div>
      <div className="menu">
        <a href="#">Courses Offered</a>
        <a href="#">Registered Courses</a>
        <a href="#">Approved Courses</a>
        
      </div>
      <div className="profile">
        <span>2022CSB1329 (Student)</span>
        <div className="logout">🔴</div>
      </div>
    </nav>
  );
};

export default Navbar;