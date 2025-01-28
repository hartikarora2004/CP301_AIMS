import React, { useEffect, useState } from "react";
import "./ApproveCourse.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const ApproveCourses = () => {
  const [instructorApprovals, setInstructorApprovals] = useState([]);
  const [advisorApprovals, setAdvisorApprovals] = useState([]);
  const userId = localStorage.getItem("_id"); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchApprovalRequests = async () => {
      //console.log(userId, localStorage.getItem("role"));
      //console.log(localStorage.getItem("role") != 'faculty');
      if (!userId || localStorage.getItem("role") != "faculty") {
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
        navigate("/"); // Replace "/login" with the actual path of your login page
        return;
      }
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/faculty/approval-requests`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        //console.log(data);
        // Filter data for instructor and advisor approvals
        const instructorData = data.filter(
          (request) =>
            !request.instructorApproval && !request.advisorApproval && request.instructorId === userId
        );
        const advisorData = data.filter(
          (request) =>
            request.instructorApproval && !request.advisorApproval && request.advisorId === userId
        );

        setInstructorApprovals(instructorData);
        setAdvisorApprovals(advisorData);
      } catch (error) {
        console.error("Error fetching approval requests:", error);
      }
    };

    fetchApprovalRequests();
  }, [userId]);

  const handleApproval = async (id, role, approve) => {
    try {
      const endpoint =
        role === "instructor"
          ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/faculty/approve-instructor`
          : `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/faculty/approve-advisor`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approve }),
      });

      if (response.ok) {
        alert("Action completed successfully");
        // Update state to remove approved item
        if (role === "instructor") {
          setInstructorApprovals(instructorApprovals.filter((item) => item._id !== id));
        } else {
          setAdvisorApprovals(advisorApprovals.filter((item) => item._id !== id));
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error processing approval:", error);
      alert("Failed to process approval.");
    }
  };

  const renderTable = (data, role) => (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>S#</th>
          <th>Roll No.</th>
          <th>Name</th>
          <th>Course Title</th>
          <th>Approve</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row._id}>
            <td>{index + 1}</td>
            <td>{row.studentId.entryNo}</td>
            <td>{row.studentId.username}</td>
            <td>{row.courseId.courseName}</td>
            <td>
              <button
                style={{ color: "green", marginRight: "10px" }}
                onClick={() => handleApproval(row._id, role, true)}
              >
                ✅
              </button>
              <button
                style={{ color: "red" }}
                onClick={() => handleApproval(row._id, role, false)}
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <Navbar />
      <div className="ApproveTable">
        <h2>Approve Requests</h2>

        <h3>Approve As Instructor</h3>
        {instructorApprovals.length > 0 ? (
          renderTable(instructorApprovals, "instructor")
        ) : (
          <p>No requests pending for instructor approval.</p>
        )}

        <h3>Approve As Advisor</h3>
        {advisorApprovals.length > 0 ? (
          renderTable(advisorApprovals, "advisor")
        ) : (
          <p>No requests pending for advisor approval.</p>
        )}
      </div>
    </div>
  );
};

export default ApproveCourses;
