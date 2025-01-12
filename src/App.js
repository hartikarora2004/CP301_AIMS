import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faculty from "./components/faculty";
import MainLogin from "./components/mainloginPage.jsx";
import FacultyCourses from "./components/facultyCourse.jsx";
import ApproveCourse from "./components/ApproveCourses.jsx";
import CreateCourseForm from "./components/CreateCourse.jsx";
import "./App.css";

function App() {
  return (
    <Router> {/* Added Router here */}
      <div className="login-page">
        <Routes>
          <Route path="/" element={<MainLogin />} />
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
