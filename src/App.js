import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Faculty from "./components/faculty";
import FacultyCourses from "./components/facultyCourse.jsx";
import ApproveCourse from "./components/ApproveCourses.jsx";
import CreateCourseForm from "./components/CreateCourse.jsx";
import "./App.css";

function App() {
  return (
    <Router> {/* Added Router here */}
      <div className="login-page">
        {/* <header className="header">
          <h1>AIMS :: Academic Information Management System</h1>
          <p>
            By proceeding with the login you agree to the{" "}
            <a href="#">terms of use</a> of this service.
          </p>
        </header>

        <Login /> */}
        <Routes>
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/courses" element={<FacultyCourses />}/>
          <Route path="/faculty/approve-course" element={<ApproveCourse  />}/>
          <Route path="/faculty/createcourse" element={<CreateCourseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
