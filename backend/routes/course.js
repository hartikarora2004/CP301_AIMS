const express = require("express");
const Course = require("../models/Courses");
const Enrollment = require("../models/Enrollments");
const User = require("../models/User");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/", async (req, res) => {
  const { courseName, courseCode, description, semester, _id, offeringDept } =
    req.body;
  //console.log("Starting course registration");
  //console.log(courseName, courseCode, description, semester, _id);
  if (
    !courseName ||
    !courseCode ||
    !description ||
    !semester ||
    !_id ||
    !offeringDept
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //console.log(_id);

  const instructorID = _id;
  const newCourse = new Course({
    courseName,
    courseCode,
    description,
    semester,
    instructorID,
    offeringDept,
  });

  try {
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully!" });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course." });
  }
});

router.get("/courseEnrollments", async (req, res) => {
  try {
    //console.log("GET REQUEST!");
    const { studentId } = req.query;
    // const { studentId } = req.query;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    // Find enrollments for the student & populate course details
    const enrollments = await Enrollment.find({ studentId: studentId })
      .populate("courseId", "courseCode courseName") // Fetch only necessary fields
      .lean();

    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/enroll", async (req, res) => {
  //console.log("This is an enrollment request");
  const { studentId, courseId } = req.body;
  //console.log("Student ID ", studentId);
  //console.log("Course ID ", courseId);
  if (!studentId || !courseId) {
    return res
      .status(400)
      .json({ message: "Student ID and Course ID are required." });
  }

  try {
    const existingEnrollment = await Enrollment.findOne({studentId, courseId});
    if (existingEnrollment) {
      return res.status(400).json({ message: "Enrollment already exists." });
    }
    // Fetch the student's advisor
    const student = await User.findById(studentId);
    //console.log(student);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found or invalid role." });
    }

    const advisorId = student.advisor; // Assuming facultyId stores the advisor's user ID
    if (!advisorId) {
      return res
        .status(400)
        .json({ message: "Advisor not found for the student." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const instructorId = course.instructorID; // Assuming instructorId stores the instructor's user ID
    if (!instructorId) {
      return res
        .status(400)
        .json({ message: "Instructor not found for the course." });
    }

    // Create the enrollment
    const enrollment = new Enrollment({
      studentId, // Ensure correct field names (camelCase)
      courseId,
      instructorId,
      advisorId,
    });

    await enrollment.save();
    res.status(201).json({
      message: "Enrollment request created successfully.",
      enrollment,
    });
  } catch (error) {
    console.error("Error creating enrollment request:", error);
    res.status(500).json({ message: "Failed to create enrollment request." });
  }
});



router.post("/drop", async (req, res) => {
  //console.log("This is a drop request");
  const { objectId } = req.body;
  //console.log("Student ID: ", studentId);
  //console.log("Object ID: ", objectId);

  // if (!studentId || !courseId) {
  //   return res
  //     .status(400)
  //     .json({ message: "Student ID and Course ID are required." });
  // }

  try {
    // Find the enrollment by matching both studentId and courseId
    const enrollment = await Enrollment.findOne({ _id:objectId });
    if (!enrollment) {
      return res
        .status(404)
        .json({ message: "Enrollment not found." });
    }

    // Delete the enrollment from the database
    await Enrollment.deleteOne({ _id:objectId});

    res.status(200).json({
      message: "Enrollment dropped successfully.",
    });
  } catch (error) {
    console.error("Error dropping enrollment:", error);
    res.status(500).json({ message: "Failed to drop enrollment." });
  }
});




router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructorID", "username");
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

module.exports = router;
