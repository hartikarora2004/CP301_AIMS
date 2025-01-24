import React from "react";
import "./Navbar.css";
import Logout from "./logout";
import "../assets/download.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/faculty" style={{ color: "white", textDecoration: "none" }}>AIMS</a></div>
      <div className="menu">
        <a href="/faculty/courses">Courses Offered</a>
        {/* <a href="#">Registered Courses</a> */}
        <a href="/faculty/approve-course">Approve Courses</a>

      </div>
      <div className="profile">
        <span>(Faculty)</span>
        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;
