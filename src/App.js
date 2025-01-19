import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Faculty from "./components/faculty";
import MainLogin from "./components/mainloginPage.jsx";
import FacultyCourses from "./components/facultyCourse.jsx";
import ApproveCourse from "./components/ApproveCourses.jsx";
import CreateCourseForm from "./components/CreateCourse.jsx";
<<<<<<< HEAD
import "./App.css";
import Admin from "./components/admin.jsx"
=======
import Student from "./components/student.jsx";
import StudentDetails from "./components/student_record.jsx";
import OpenCourses from "./components/open_courses.jsx";
import Registered_course_status from "./components/Registered_course_status.jsx";
import CreateStudent from "./components/create_student.jsx";
import "./App.css";

>>>>>>> 3367ed245dd768bf7721c242793d1486f661175c
function App() {
  return (
    <Router> {/* Added Router here */}
      <div className="login-page">
        <Routes>
          <Route path="/" element={<MainLogin />} />
<<<<<<< HEAD
          <Route path="/admin" element={<Admin />} />
=======
>>>>>>> 3367ed245dd768bf7721c242793d1486f661175c
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/courses" element={<FacultyCourses />}/>
          <Route path="/faculty/approve-course" element={<ApproveCourse  />}/>
          <Route path="/faculty/createcourse" element={<CreateCourseForm />} />
<<<<<<< HEAD
=======
          <Route path="/student" element={<Student />} />
          <Route path="/student/student-record" element={<StudentDetails />} />
          <Route path="/student/open-courses" element={<OpenCourses />} />
          <Route path="/student/registered-course-status" element={<Registered_course_status />} />
          <Route path="/student/create-student" element={<CreateStudent />} />
>>>>>>> 3367ed245dd768bf7721c242793d1486f661175c
        </Routes>
      </div>
    </Router>
  );
}

export default App;
