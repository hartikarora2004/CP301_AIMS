import React, { useEffect, useState } from "react";
import "./create_faculty.css";
import Navbar from "./adminnav";
import { useNavigate } from "react-router-dom";

const CreateFaculty = () => {
  const navigate = useNavigate();
  const [facultyName, setFacultyName] = useState("");
  const [facultyMail, setFacultyMail] = useState("");
  const [facultyDept, setFacultyDept] = useState("");
  const [facultyProfession, setFacultyProfession] = useState("");
  const [facultyCourses, setFacultyCourses] = useState("");
  const [isAdvisor, setIsAdvisor] = useState(false);
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

    const facultyData = {
      facultyName,
      facultyMail,
      facultyDept,
      facultyProfession,
      facultyCourses,
      isAdvisor,
    };

    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/faculty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facultyData),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("Faculty Created:", data);
        alert("Faculty Added Successfully!");
        navigate("/admin");
        setFacultyName("");
        setFacultyMail("");
        setFacultyDept("");
        setFacultyProfession("");
        setFacultyCourses("");
        setIsAdvisor(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error creating faculty:", err);
      alert("Failed to add faculty. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="form-container">
        <h2>Add a New Faculty</h2>
        <form className="faculty-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="facultyName">Faculty Name</label>
            <input
              type="text"
              id="facultyName"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              placeholder="Enter faculty name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="facultyMail">Faculty Email</label>
            <input
              type="email"
              id="facultyMail"
              value={facultyMail}
              onChange={(e) => setFacultyMail(e.target.value)}
              placeholder="Enter faculty email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="facultyDept">Faculty Department</label>
            <select
              id="facultyDept"
              value={facultyDept}
              onChange={(e) => setFacultyDept(e.target.value)}
              required
            >
              <option value="">--Select an option--</option>
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
            <label htmlFor="facultyProfession">Faculty Profession</label>
            <select
              id="facultyProfession"
              value={facultyProfession}
              onChange={(e) => setFacultyProfession(e.target.value)}
              required
            >
              <option value="">--Select an option--</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Professor">Professor</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Add Faculty
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFaculty;
