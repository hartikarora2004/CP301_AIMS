import React, { useState } from "react";
import "./create_student.css";
import Navbar_student from "./navbar_student";

const CreateStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [studentEntry, setStudentEntry] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [studentDept, setStudentDept] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Created:", { studentName, studentMail, studentEntry, studentYear, studentDept });
    alert("Student Added Successfully!");
    setStudentName("");
    setStudentMail("");
    setStudentEntry("");
    setStudentYear("");
    setStudentDept("");
  };

  return (
    <div>
        <Navbar_student />
        <div className="form-container">
        <h2>Add a New Student</h2>
        <form className="course-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="studentMail">Student Mail</label>
            <input
                type="text"
                id="studentMail"
                value={studentMail}
                onChange={(e) => setStudentMail(e.target.value)}
                placeholder="Enter student mail"
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="studentEntry">Student Entry</label>
            <input
                type="text"
                id="studentEntry"
                value={studentEntry}
                onChange={(e) => setStudentEntry(e.target.value)}
                placeholder="Enter student entry no."
                required
            ></input>
            </div>

            <div className="form-group">
            <label htmlFor="studentYear">Student Year</label>
            <input
                type="text"
                id="studentYear"
                value={studentYear}
                onChange={(e) => setStudentYear(e.target.value)}
                placeholder="Enter student year."
                required
            ></input>
            </div>

            <div className="form-group">
            <label htmlFor="studentDept">Student Dept</label>
            <select
                type="text"
                id="studentDept"
                value={studentDept}
                onChange={(e) => setStudentDept(e.target.value)}
                required>
                <option value="">--Select an option--</option> {/* Placeholder */}
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                <option value="Mathematics and Computing">Mathematics and Computing</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Engineering Physics">Engineering Physics</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
            </select>
            </div>



            <button type="submit" className="submit-btn">
            Add Student
            </button>
        </form>
        </div>
    </div>
    
  );
};

export default CreateStudent;
