import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./facultyCourses.css";
import "./login.css";
import { useNavigate } from "react-router-dom";

const FacultyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const facultyId = localStorage.getItem("_id"); // Assuming the faculty ID is stored in localStorage
  const userId = localStorage.getItem("_id"); 
  
  useEffect(() => {
    // Fetch the courses for the logged-in faculty
    const fetchFacultyCourses = async () => {
      //console.log(userId, localStorage.getItem("role"));
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

      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/faculty/faculty-courses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "faculty-id": facultyId,
          },
        });

        if (response.ok) {
          const data = await response.json();
          //console.log(data);
          setCourses(data); // Set the fetched courses in the state
        } else {
          console.error("Failed to fetch courses.");
        }
        
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchFacultyCourses(); // Fetch courses when component mounts
  }, [facultyId]);

  function handleRedirect() {
    navigate("/faculty/createcourse");
  }

  return (
    <div className="FacultyCourses">
      <Navbar />
      <div className="search-results">
        <p className="info">
          The following list shows the courses floated by the concerned faculty in this semester.
        </p>
        <div className="results-container">
          <h3>Results</h3>
          <div className="results-list">
            {courses.length > 0 ? (
              courses.map((result) => (
                <div className="result-row" key={result._id}>
                  <div className="result-checkbox">
                  </div>
                  <div className="result-content">
                    <label htmlFor={`result-${result._id}`}>
                      <a href="#" className="course-link">
                        {result.courseCode}) {result.courseName} | {result.semester}
                      </a>
                      <p>
                        <strong>Status: Running  | </strong>
                        <strong>Session:</strong> {result.semester} | {" "}
                        <strong>Offered by:</strong> {result.offeringDept} | {" "}
                        {/* {console.log(result)} */}
                        {/* {console.log(result.instructorID)} */}
                        <strong>Instructor(s):</strong> {result.instructorID.username}
                      </p>
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses available for the logged-in faculty.</p>
            )}
          </div>
          <button className="action-button" onClick={handleRedirect}>
            Add a Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyCourses;
