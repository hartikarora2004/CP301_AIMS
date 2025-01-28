import React, { useEffect, useState } from "react";
import "./create_student.css";
import Navbar from "./adminnav";
import { useNavigate } from "react-router-dom";


const CreateStudent = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [studentEntry, setStudentEntry] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [studentDept, setStudentDept] = useState("");
  const [studentAdvisor, setStudentAdvisor] = useState("");
  const userId = localStorage.getItem("_id"); 

  useEffect(() => {
      const Check = async () => {
        //console.log("User ID:", userId);
        //console.log("Role from localStorage:", localStorage.getItem("role"));
  
        if (!userId || localStorage.getItem("role") !== "admin") {
          console.warn("Unauthorized access. Redirecting...");
          if(userId){
            //console.log("Inside If");
            //console.log(localStorage.getItem("role"));
            if(localStorage.getItem("role") == "student"){
              navigate("/student");
              return;
            } else if(localStorage.getItem("role") == "faculty"){
              navigate("/faculty");
              return;
            } else if(localStorage.getItem("role") == "admin"){
              navigate("/admin");
              return;
            }
          }
          navigate("/"); // Replace "/" with the actual path for unauthorized access
          return;
        }
  
        // Add your logic to fetch approval requests if needed
        //console.log("Fetching approval requests...");
      };
      //console.log("Checking");
      Check();
    }, [userId, navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      studentName,
      studentMail,
      studentEntry,
      studentYear,
      studentDept,
      studentAdvisor,
    };

    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/student/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("Student Created:", data);
        alert("Student Added Successfully!");
        navigate("/admin");  
        setStudentName("");
        setStudentMail("");
        setStudentEntry("");
        setStudentYear("");
        setStudentDept("");
        setStudentAdvisor("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error creating student:", err);
      alert("Failed to add student. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar/>
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
              required
            >
              <option value="">--Select an option--</option> {/* Placeholder */}
              <option value="Computer Science and Engineering">
                Computer Science and Engineering
              </option>
              <option value="Artificial Intelligence and Data Science">
                Artificial Intelligence and Data Science
              </option>
              <option value="Mathematics and Computing">
                Mathematics and Computing
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Engineering Physics">
                Engineering Physics
              </option>
              <option value="Chemical Engineering">
                Chemical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Metallurgical and Materials Engineering">
                Metallurgical and Materials Engineering
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="studentAdvisor">Student Advisor</label>
            <input
              type="text"
              id="studentAdvisor"
              value={studentAdvisor}
              onChange={(e) => setStudentAdvisor(e.target.value)}
              placeholder="Enter student Advisor"
              required
            />
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
