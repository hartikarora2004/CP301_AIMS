import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faculty from "./components/faculty";
import MainLogin from "./components/mainloginPage.jsx";
import FacultyCourses from "./components/facultyCourse.jsx";
import ApproveCourse from "./components/ApproveCourses.jsx";
import CreateCourseForm from "./components/CreateCourse.jsx";
import "./App.css";
import Admin from "./components/admin.jsx"
import Student from "./components/student.jsx";
import StudentDetails from "./components/student_record.jsx";
import OpenCourses from "./components/open_courses.jsx";
import Registered_course_status from "./components/Registered_course_status.jsx";
import CreateStudent from "./components/create_student.jsx";

function App() {
  return (
    <Router> {/* Added Router here */}
      <div className="login-page">
        <Routes>
          <Route path="/" element={<MainLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/courses" element={<FacultyCourses />}/>
          <Route path="/faculty/approve-course" element={<ApproveCourse  />}/>
          <Route path="/faculty/createcourse" element={<CreateCourseForm />} />
          <Route path="/student" element={<Student />} />
          <Route path="/student/student-record" element={<StudentDetails />} />
          <Route path="/student/open-courses" element={<OpenCourses />} />
          <Route path="/student/registered-course-status" element={<Registered_course_status />} />
          <Route path="/admin/create-student" element={<CreateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
