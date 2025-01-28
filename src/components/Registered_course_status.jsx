import React, { useEffect, useState } from "react";
import Navbar_student from "./navbar_student";
import "./Registered_course_status.css";
import { useNavigate } from "react-router-dom";

const Registered_course_status = () => {
  const [courses, setCourses] = useState([]);
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


  const handleDrop = async (objectId) => {
    //const studentId = localStorage.getItem('_id');
    //console.log("Student ID = ", studentId);
    //console.log("Object ID = ", objectId);
    
    const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/courses/drop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ objectId }),
    });
  
    if (response.ok) {
      const data = await response.json();
      //setEnrolledCourses((prev) => prev.filter(id => id !== courseId)); // Remove the course from the enrolled list
      alert(data.message);
      //navigate("/student/registered-course-status");
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  };

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


  useEffect(() => {
    const fetchCourses = async () => {
      try {
          const studentId = localStorage.getItem("_id"); // Retrieve studentId from localStorage
          if (!studentId) {
            console.error("No student ID found in localStorage");
            return;
          }
      
          const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/courses/courseEnrollments?studentId=${studentId}`);
          const data = await response.json();
          //console.log(data);
          setCourses(data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };    
      
      fetchCourses();
    }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <Navbar_student entryNumber={studentDetails.entryNo} />
      <div className="ApproveTable">
        <h2>Course Status</h2>
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S#</th>
              <th>Course Title/Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.courseId.courseCode} | {course.courseId.courseName}</td>
                <td>
                  {course.instructorApproval
                    ? course.advisorApproval
                      ? "Enrolled"
                      : "Pending Advisor Approval"
                    : "Pending Instructor Approval"}
                </td>
                <td>
                <button
                  className="drop-button"
                  onClick={() => handleDrop(course._id)}
                >
                  Drop
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registered_course_status;
