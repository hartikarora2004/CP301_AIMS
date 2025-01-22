import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar_student from "./navbar_student";
import "./Registered_course_status.css";

const Registered_course_status = () => {
  const [courses, setCourses] = useState([]);
  const studentId = localStorage.getItem("_id"); // Ensure studentId is stored in localStorage
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

  useEffect(() => {
      // Fetch the details for the logged-in student
      const fetchStudentDetails = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/student-details", {
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
      
          const response = await fetch(`http://localhost:5000/api/courseEnrollments?studentId=${studentId}`);
          const data = await response.json();
          console.log(data);
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registered_course_status;
