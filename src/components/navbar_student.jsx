import React from "react";
import "./Navbar.css";
import "../assets/download.png";
import Logout from "./logout";

const Navbar_student = ({ entryNumber }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/student" style={{ color: "white", textDecoration: "none" }}>AIMS</a>
      </div>
      <div className="menu">
        <a href="/student/student-record">Student record</a>
        <a href="/student/open-courses">Open courses</a>
        <a href="/student/registered-course-status">Registered course status</a>
      </div>
      <div className="profile">
        {/* {console.log(entryNumber)} */}
        <span>{entryNumber ? `${entryNumber} (Student)` : "Loading..."}</span>
        <Logout />
      </div>
    </nav>
  );
};

export default Navbar_student;
