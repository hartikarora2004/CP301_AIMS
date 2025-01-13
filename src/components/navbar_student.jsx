import React from "react";
import "./Navbar.css";

const Navbar_student = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/student" style={{ color: "white", textDecoration: "none" }}>AIMS</a></div>
      <div className="menu">
        <a href="/student/student-record">Student record</a>
        <a href="/student/open-courses">Open courses</a>
        <a href="/student/registered-course-status">Registered course status</a>

      </div>
      <div className="profile">
        <span>2022CSB1329 (Student)</span>
        <div className="logout">🔴</div>
      </div>
    </nav>
  );
};

export default Navbar_student;
