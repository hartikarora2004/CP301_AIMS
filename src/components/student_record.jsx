import React from "react";
import Navbar_student from "./navbar_student";
import "./student_record.css"; // Import the CSS file

const StudentDetails = () => {
  const student_details = {
    firstName: "Arav",
    lastName: "Bhargava",
    mail: "2022csb1157@iitrpr.ac.in",
    entryNumber: "2022CSB1157",
    year: "2022",
    dept: "Computer Science and Engineering",
    degree: "B.Tech",
    category: "General",
  };

  return (
    <div className="student-details">
      <Navbar_student />
      <h2>Student Details</h2>
      <form>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" value={student_details.firstName} readOnly />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" value={student_details.lastName} readOnly />
          </div>
          <div className="form-group">
            <label>Roll No.</label>
            <input type="text" value={student_details.entryNumber} readOnly />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <select value={student_details.degree} disabled>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={student_details.mail} readOnly />
          </div>
          <div className="form-group">
            <label>Department</label>

            <select value={student_details.dept} disabled>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                <option value="Mathematics and Computing">Mathematics and Computing</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Engineering Physics">Engineering Physics</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
            </select>
          </div>
          <div className="form-group">
            <label>Year-of-entry</label>
            <input type="text" value={student_details.year} readOnly />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={student_details.category} disabled>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC/ST">SC/ST</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentDetails;
