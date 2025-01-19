import React, { useState } from "react";
import AdminNav from "./adminnav";
import "./admin.css";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("students");
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        entryNo: "",
        year: "",
        department: ""
    });

    const [facultyData, setFacultyData] = useState({
        name: "",
        email: "",
        department: "",
        designation: ""
    });

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        console.log("Student Data:", studentData);
    };

    const handleFacultySubmit = (e) => {
        e.preventDefault();
        console.log("Faculty Data:", facultyData);
    };

    return (
        <div className="admin-container">
            <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="tab-content">
                {activeTab === "students" && (
                    <div className="students-section">
                        <div className="form-section">
                            <h3>Add New Student</h3>
                            <form onSubmit={handleStudentSubmit}>
                                <div className="form-group">
                                    <label>Student Name</label>
                                    <input
                                        type="text"
                                        value={studentData.name}
                                        onChange={(e) =>
                                            setStudentData({
                                                ...studentData,
                                                name: e.target.value
                                            })
                                        }
                                        placeholder="Enter student name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Student Email</label>
                                    <input
                                        type="email"
                                        value={studentData.email}
                                        onChange={(e) =>
                                            setStudentData({
                                                ...studentData,
                                                email: e.target.value
                                            })
                                        }
                                        placeholder="Enter student email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Entry Number</label>
                                    <input
                                        type="text"
                                        value={studentData.entryNo}
                                        onChange={(e) =>
                                            setStudentData({
                                                ...studentData,
                                                entryNo: e.target.value
                                            })
                                        }
                                        placeholder="Enter entry number"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Year</label>
                                    <input
                                        type="text"
                                        value={studentData.year}
                                        onChange={(e) =>
                                            setStudentData({
                                                ...studentData,
                                                year: e.target.value
                                            })
                                        }
                                        placeholder="Enter year"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <select
                                        value={studentData.department}
                                        onChange={(e) =>
                                            setStudentData({
                                                ...studentData,
                                                department: e.target.value
                                            })
                                        }
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Humanities">Humanities</option>
                                        <option value="Electrical">Electrical</option>
                                    </select>
                                </div>
                                <button type="submit" className="submit-btn">Add Student</button>
                            </form>
                        </div>

                        <div className="table-section">
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
                                    <tr>
                                        <td>John Doe</td>
                                        <td>john@example.com</td>
                                        <td>2022CSB1234</td>
                                        <td>2022</td>
                                        <td>Computer Science</td>
                                        <td>
                                            <button className="action-btn edit">Edit</button>
                                            <button className="action-btn delete">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "faculty" && (
                    <div className="faculty-section">
                        <div className="form-section">
                            <h3>Add New Faculty</h3>
                            <form onSubmit={handleFacultySubmit}>
                                <div className="form-group">
                                    <label>Faculty Name</label>
                                    <input
                                        type="text"
                                        value={facultyData.name}
                                        onChange={(e) =>
                                            setFacultyData({
                                                ...facultyData,
                                                name: e.target.value
                                            })
                                        }
                                        placeholder="Enter faculty name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={facultyData.email}
                                        onChange={(e) =>
                                            setFacultyData({
                                                ...facultyData,
                                                email: e.target.value
                                            })
                                        }
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <select
                                        value={facultyData.department}
                                        onChange={(e) =>
                                            setFacultyData({
                                                ...facultyData,
                                                department: e.target.value
                                            })
                                        }
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Humanities">Humanities</option>
                                        <option value="Electrical">Electrical</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Designation</label>
                                    <select
                                        value={facultyData.designation}
                                        onChange={(e) =>
                                            setFacultyData({
                                                ...facultyData,
                                                designation: e.target.value
                                            })
                                        }
                                        required
                                    >
                                        <option value="">Select Designation</option>
                                        <option value="Professor">Professor</option>
                                        <option value="Associate Professor">Associate Professor</option>
                                        <option value="Assistant Professor">Assistant Professor</option>
                                    </select>
                                </div>
                                <button type="submit" className="submit-btn">Add Faculty</button>
                            </form>
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
                                    <tr>
                                        <td>Dr. Ravi Kumar</td>
                                        <td>ravi@example.com</td>
                                        <td>Computer Science</td>
                                        <td>Associate Professor</td>
                                        <td>
                                            <button className="action-btn edit">Edit</button>
                                            <button className="action-btn delete">Delete</button>
                                        </td>
                                    </tr>
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
