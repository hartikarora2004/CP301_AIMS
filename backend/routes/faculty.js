const express = require("express");
const User = require("../models/User");
const Course = require("../models/Courses");
const Enrollment = require("../models/Enrollments")
const router = express.Router();

router.post("/", async (req, res) => {
  const { facultyName, facultyMail, facultyDept, facultyProfession } = req.body;

  if (!facultyName || !facultyMail || !facultyDept || !facultyProfession) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newFaculty = new User({
      username: facultyName,
      mail_id: facultyMail,
      department: facultyDept,
      profession: facultyProfession,
      role: "faculty",
    });

    await newFaculty.save();

    res
      .status(201)
      .json({ message: "Faculty added successfully", faculty: newFaculty });
  } catch (error) {
    console.error("Error adding faculty:", error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Failed to add faculty" });
    }
  }
});

router.post("/assignFaculty", async (req, res) => {
  const { facultyMail, studentMail } = req.body;

  try {
    const faculty = await User.findOne({
      mail_id: facultyMail,
      role: "faculty",
    });
    const student = await User.findOne({
      mail_id: studentMail,
      role: "student",
    });

    if (!faculty || !student) {
      return res.status(404).json({ message: "Faculty or Student not found" });
    }

    student.facultyId = faculty._id;
    await student.save();

    res
      .status(200)
      .json({ message: "Faculty assigned to student successfully" });
  } catch (error) {
    console.error("Error assigning faculty:", error);
    res.status(500).json({ message: "Failed to assign faculty" });
  }
});

router.get("/facultyStudents", async (req, res) => {
  const { email } = req.user;

  try {
    const faculty = await User.findOne({ mail_id: email, role: "faculty" });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const students = await User.find({ facultyId: faculty._id });

    res
      .status(200)
      .json({ message: "Students fetched successfully", students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

router.get("/approval-requests", async (req, res) => {
  try {
    const requests = await Enrollment.find({})
      .populate("studentId", "entryNo username")
      .populate("courseId", "courseName");
      console.log("Get Faculty Requests");
      console.log(requests);

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching approval requests:", error);
    res.status(500).json({ message: "Failed to fetch approval requests." });
  }
});

router.post("/approve-instructor", async (req, res) => {
  const { id, approve } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Enrollment ID is required." });
  }

  try {
    if (approve === false) {
      // If approval is false, delete the enrollment request
      await Enrollment.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Enrollment request deleted successfully." });
    }

    // If approval is true, update the instructorApproval field
    const update = { instructorApproval: approve };
    await Enrollment.findByIdAndUpdate(id, update);

    res
      .status(200)
      .json({ message: "Instructor approval updated successfully." });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ message: "Failed to process the request." });
  }
});

router.post("/approve-advisor", async (req, res) => {
  const { id, approve } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Enrollment ID is required." });
  }

  try {
    const update = { advisorApproval: approve };
    await Enrollment.findByIdAndUpdate(id, update);

    res.status(200).json({ message: "Advisor approval updated successfully." });
  } catch (error) {
    console.error("Error updating advisor approval:", error);
    res.status(500).json({ message: "Failed to update advisor approval." });
  }
});

router.get("/faculty-courses", async (req, res) => {
  try {
    const facultyId = req.headers["faculty-id"]; // Assuming faculty ID is passed in headers

    // console.log("Get Faculty Requests");
    if (!facultyId) {
      return res.status(400).json({ message: "Faculty ID is required." });
    }

    const courses = await Course.find({ instructorID: facultyId }).populate(
      "instructorID"
    );
    // console.log(courses);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching faculty courses:", error);
    res.status(500).json({ message: "Failed to fetch faculty courses." });
  }
});

module.exports = router;
