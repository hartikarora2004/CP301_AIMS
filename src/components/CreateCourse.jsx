import React, { useState } from "react";
import "./CreateCourse.css";
import Navbar from "./navbar";

const CreateCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Created:", { courseName, courseCode, description, duration });
    alert("Course Created Successfully!");
    setCourseName("");
    setCourseCode("");
    setDescription("");
    setDuration("");
  };

  return (
    <div>
        <Navbar />
        <div className="form-container">
        <h2>Create a New Course</h2>
        <form className="course-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="courseCode">Course Code</label>
            <input
                type="text"
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="Enter course code"
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                required
            ></textarea>
            </div>

            <div className="form-group">
            <label htmlFor="duration">Duration (in weeks)</label>
            <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
                required
                min="1"
            />
            </div>

            <button type="submit" className="submit-btn">
            Create Course
            </button>
        </form>
        </div>
    </div>
    
  );
};

export default CreateCourseForm;
