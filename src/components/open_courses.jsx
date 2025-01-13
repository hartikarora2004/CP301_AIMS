import React from "react";
import "./open_courses.css";
import "./login.css";
//import { useNavigate } from "react-router-dom";
import Navbar_student from "./navbar_student";


const OpenCourses = () => {
    //   const navigate = useNavigate();
//   function handleRedirect(){
//     navigate("/faculty/createcourse");
//   }

  const results = [
    {
      id: 1,
      code: "CS301",
      title: "Introduction to Databases",
      details: "3-0-0-6.00-3.00",
      credits: 3.0,
      status: "Completed",
      session: "2024-I",
      enrollment: "138 in Sec.-A",
      offeredBy: "Dept. of Computer Science",
      instructor: "Ravi Kumar",
    },
    {
      id: 2,
      code: "HS406",
      title: "MANAGERIAL SCIENCE",
      details: "3-0-0-6.00-3.00",
      credits: 3.0,
      status: "Completed",
      session: "2022-S",
      enrollment: "5 in Sec.-A",
      offeredBy: "Dept. of Humanities and Social Sciences",
      instructor: "Ravi Kumar",
    },
    {
      id: 3,
      code: "HS406",
      title: "MANAGERIAL SCIENCE",
      details: "3-0-0-6.00-3.00",
      credits: 3.0,
      status: "Completed",
      session: "2022-II",
      enrollment: "57 in Sec.-A",
      offeredBy: "Dept. of Humanities and Social Sciences",
      instructor: "Ravi Kumar",
    },
  ];

  return (
    <div className="OpenCourses">
      <Navbar_student />
      <div className="search-results">
        <p className="info">
          The following list shows the courses floated by the institute in this semester. 
        </p>
        <div className="results-container">
          <h3>Results</h3>
          <div className="results-list">
            {results.map((result) => (
              <div className="result-row" key={result.id}>
                <div className="result-checkbox">

                  <input type="checkbox" id={`result-${result.id}`} />
                </div>
                <div className="result-content">
                  <label htmlFor={`result-${result.id}`}>
                    <a href="#" className="course-link">
                      {result.id}) {result.code} | {result.title} | {result.details}
                    </a>
                    <p>
                      <strong>Credits:</strong> {result.credits}. <strong>Status:</strong> {result.status}.{" "}
                      <strong>Session:</strong> {result.session}.{" "}
                      <strong>Enrollment:</strong> {result.enrollment}.{" "}
                      <strong>Offered by:</strong> {result.offeredBy}.{" "}
                      <strong>Instructor(s):</strong> {result.instructor}.
                    </p>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button className="action-button" >Enroll for Courses</button>
        </div>
      </div>
    </div>
  );
};

export default OpenCourses;
