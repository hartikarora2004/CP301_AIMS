import React, { useState, useEffect } from "react";
import "./open_courses.css";
import "./login.css";
import Navbar_student from "./navbar_student";

const OpenCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch courses from backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses"); // Endpoint for courses
        const data = await response.json();
        console.log(data);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    
    fetchCourses();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleEnroll = async (courseId) => {
    const studentId = localStorage.getItem('_id');
    console.log("Student ID = ", studentId);
    console.log("Course ID = ", courseId);
    const response = await fetch("http://localhost:5000/api/enroll", {
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
      <Navbar_student />
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
                      <strong>Session:</strong> {course.semester}.{" "}
                      <strong>Offered by:</strong> 
                      <strong>Instructor(s):</strong> {course.instructorName}.
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
