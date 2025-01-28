import React, { useState, useEffect } from "react";
import "./CreateCourse.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const CreateCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [offeringDept, setOfferingDept] = useState("");
  const userId = localStorage.getItem("_id"); 
  const navigate = useNavigate();

  useEffect(() => {
    const Check = async () => {
      //console.log("User ID:", userId);
      //console.log("Role from localStorage:", localStorage.getItem("role"));

      if (!userId || localStorage.getItem("role") !== "faculty") {
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


  useEffect(() => {
    const name = localStorage.getItem('instructorName');
    //console.log("UseEffect: Instructor name from localStorage:", name);
    if (name) {
      setInstructorName(name);
    }
  }, []);  

  useEffect(() => {
    if (instructorName) {
      //console.log('Instructor Name:', instructorName); // This will log the updated instructorName
    }
  }, [instructorName]);  // This useEffect will run whenever instructorName changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    const _id = localStorage.getItem('_id');
    const courseData = {
      courseName,
      courseCode,
      description,
      semester,
      _id,
      offeringDept,
    };
    
    //console.log("Course Data:", courseData);
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      //console.log(response);
      if (response.ok) {
        alert("Course Created Successfully!");
        setCourseName("");
        setCourseCode("");
        setDescription("");
        setSemester("");
        setOfferingDept("");
      } else {
        alert("Failed to create course.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating course. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Create a New Course</h2>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="offeringDept">Offering Department</label>
            <input
              type="text"
              id="offeringDept"
              value={offeringDept}
              onChange={(e) => setOfferingDept(e.target.value)}
              placeholder="Enter department name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseCode">Course Code</label>
            <input
              type="text"
              id="courseCode"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Enter course code"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <input
              type="text"
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="Enter semester"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseForm;
