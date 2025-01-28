import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./adminnav";
import "./admin.css";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("students");
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("_id"); 

    useEffect(() => {
      if (!userId || localStorage.getItem("role") != "admin") {
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
        const fetchAllStudents = async () => {
          try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/admin/students`); // Endpoint to fetch all students
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setStudents(data); // Set the fetched students data in the state
            //console.log(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAllStudents(); // Fetch all students when the component mounts
      }, []);



      useEffect(() => {
        const fetchAllFaculty = async () => {
          try {
            const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/api/admin/faculty`); // Endpoint to fetch all faculty
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setFaculty(data); // Set the fetched Faculty data in the state
            //console.log(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAllFaculty(); // Fetch all Faculty when the component mounts
      }, []);


      const handleDeleteStudent = async (id) => {
        try {
          const response = await fetch(`/api/admin/students/${id}`, {
            method: "DELETE",
          });
          //console.log(id);
          const data = await response.json();
    
          if (data.message === "Student deleted successfully") {
            // Remove the student from the local state after deletion
            setStudents(students.filter(student => student._id !== id));
          } else {
            alert("Error deleting student");
          }
        } catch (error) {
          console.error("Error deleting student:", error);
        }
      };

      const handleDeleteFaculty = async (id) => {
        try {
          const response = await fetch(`/api/admin/faculty/${id}`, {
            method: "DELETE",
          });
          //console.log(id);
          const data = await response.json();
    
          if (data.message === "Faculty deleted successfully") {
            // Remove the student from the local state after deletion
            setFaculty(faculty.filter(faculty => faculty._id !== id));
          } else {
            alert("Error deleting Faculty");
          }
        } catch (error) {
          console.error("Error deleting faculty:", error);
        }
      };

    return (
        <div className="admin-container">
            <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="tab-content">
                {activeTab === "students" && (
                    <div className="students-section">
                        <div className="table-section">
                            <h3>Add New Student</h3>
                            <button 
                                className="manage-btn"
                                onClick={() => navigate("/admin/create-student")}
                            >
                                Add New Student
                            </button>
                        </div> 
                        <div>
                            <h3>Existing Students</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Entry No</th>
                                        <th>Year</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length > 0 ? (
                                            students.map((student) => (
                                            <tr key={student._id}>
                                                <td>{student.username}</td>
                                                <td>{student.mail_id}</td>
                                                <td>{student.entryNo}</td>
                                                <td>{student.year}</td>
                                                <td>{student.department}</td>
                                                <td>
                                                <button className="action-btn edit">Edit</button>
                                                <button className="action-btn delete" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                            <td colSpan="6">No students found.</td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "faculty" && (
                    <div className="faculty-section">
                        <div className="form-section">
                            <h3>Add New Faculty</h3>

                            <button 
                                className="manage-btn"
                                onClick={() => navigate("/admin/create-faculty")}
                            >
                                Add New Faculty
                            </button>
                            
                        </div>

                        <div className="table-section">
                            <h3>Existing Faculty</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Designation</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faculty.length > 0 ? (
                                            faculty.map((faculty) => (
                                            <tr key={faculty._id}>
                                                <td>{faculty.username}</td>
                                                <td>{faculty.mail_id}</td>
                                                <td>{faculty.department}</td>
                                                <td>{faculty.profession}</td>
                                                <td>
                                                <button className="action-btn edit">Edit</button>
                                                <button className="action-btn delete" onClick={() => handleDeleteFaculty(faculty._id)}>Delete</button>
                                                {/* {console.log(faculty._id)} */}
                                                </td>
                                            </tr>
                                            ))
                                        ) : (
                                            <tr>
                                            <td colSpan="6">No Faculty found.</td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
