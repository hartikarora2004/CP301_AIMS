import React, { useState, useEffect } from "react";
import "./open_courses.css";
import "./login.css";
import Navbar_student from "./navbar_student";
import { useNavigate } from "react-router-dom";

const OpenCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userId = localStorage.getItem("_id");
  const navigate = useNavigate();

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
  // Fetch courses from backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
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
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/courses`); // Endpoint for courses
        const data = await response.json();
        //console.log(data);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    
    fetchCourses();
  }, []); // Empty dependency array means this runs once when the component mounts

  useEffect(() => {
      // Fetch the details for the logged-in student
      const fetchStudentDetails = async () => {
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

  const handleEnroll = async (courseId) => {
    const studentId = localStorage.getItem('_id');
    //console.log("Student ID = ", studentId);
    //console.log("Course ID = ", courseId);
    const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/courses/enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, courseId }),
    });

    if (response.ok) {
      const data = await response.json();
      setEnrolledCourses((prev) => [...prev, courseId]);
      alert(data.message);
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  };

  return (
    <div className="OpenCourses">
      <Navbar_student entryNumber={studentDetails.entryNo} />
      <div className="search-results">
        <p className="info">
          The following list shows the courses floated by the institute in this semester.
        </p>
        <div className="results-container">
          <h3>Available Courses</h3>
          <div className="results-list">
            {courses.map((course) => (
              <div className="result-row" key={course.id}>
                <div className="result-checkbox">
                  {/* <input type="checkbox" id={`result-${course.id}`} /> */}
                </div>
                <div className="result-content">
                  <label htmlFor={`result-${course.id}`}>
                    <a href="#" className="course-link">
                      {course.courseCode} | {course.courseName} | {course.description}
                    </a>
                    <p>                
                      <strong>Session:</strong> {course.semester} | {" "}
                      <strong>Offered by:</strong> {course.offeringDept} |  
                      <strong> Instructor(s):</strong> {course.instructorID.username}. 
                    </p>
                  </label>
                  <button onClick={() => handleEnroll(course._id)}>Enroll</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenCourses;
