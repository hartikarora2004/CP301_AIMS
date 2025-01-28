import React, { useEffect, useState } from "react";
import Navbar_student from "./navbar_student";
import "./student_record.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const [studentDetails, setStudentDetails] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    entryNumber: "",
    year: "",
    dept: "",
    degree: "",
    category: "",
  });

  const userId = localStorage.getItem("_id");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the details for the logged-in student
    const fetchStudentDetails = async () => {
      if (!userId || localStorage.getItem("role") !== "student") {
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
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/student/student-details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "student-id": localStorage.getItem("_id"), // Assuming the student ID is stored in localStorage
          },
        });

        if (response.ok) {
          const data = await response.json();

          setStudentDetails(data); // Set the fetched student details in the state
        } else {
          console.error("Failed to fetch student details.");
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

      fetchStudentDetails(); // Fetch student details when component mounts
  }, []);

  return (
    <div className="student-details">
       <Navbar_student entryNumber={studentDetails.entryNo} />
       {/* {console.log(studentDetails)} */}
      <h2>Student Details</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label>User Name</label>
            <input type="text" value={studentDetails.username} readOnly />
          </div>
          {/* <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={studentDetails.lastName} readOnly />
          </div> */}
          <div className="form-group">
            <label>Roll No.</label>
            <input type="text" value={studentDetails.entryNo} readOnly />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <select value={studentDetails.degree} disabled>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={studentDetails.mail_id} readOnly />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select value={studentDetails.dept} disabled>
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
          <div className="form-group">
            <label>Year-of-entry</label>
            <input type="text" value={studentDetails.year} readOnly />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={studentDetails.category} disabled>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC/ST">SC/ST</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentDetails;
