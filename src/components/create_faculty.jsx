import React, { useState } from "react";
import "./create_faculty.css";
import Navbar_student from "./navbar_student";

const CreateFaculty = () => {
  const [facultyName, setFacultyName] = useState("");
  const [facultyMail, setFacultyMail] = useState("");
  const [facultyDept, setFacultyDept] = useState("");
  const [facultyProfession, setFacultyProfession] = useState("");
  const [facultyCourses, setFacultyCourses] = useState("");
  const [isAdvisor, setIsAdvisor] = useState(false);

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
      const response = await fetch("http://localhost:5000/api/faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facultyData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Faculty Created:", data);
        alert("Faculty Added Successfully!");
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
      <Navbar_student />
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

          <div className="form-group">
            <label htmlFor="facultyCourses">Courses Instructed</label>
            <input
              type="text"
              id="facultyCourses"
              value={facultyCourses}
              onChange={(e) => setFacultyCourses(e.target.value)}
              placeholder="Enter course names separated by commas"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={isAdvisor}
                onChange={(e) => setIsAdvisor(e.target.checked)}
              />
              Is Faculty an Advisor?
            </label>
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
