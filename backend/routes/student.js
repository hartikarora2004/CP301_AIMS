const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/students", async (req, res) => {
  const {
    studentName,
    studentMail,
    studentEntry,
    studentYear,
    studentDept,
    studentAdvisor,
  } = req.body;

  if (
    !studentName ||
    !studentMail ||
    !studentEntry ||
    !studentYear ||
    !studentDept ||
    !studentAdvisor
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const faculty = await User.findOne({
      username: studentAdvisor,
      role: "faculty",
    });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty advisor not found" });
    }

    const newStudent = new User({
      username: studentName,
      mail_id: studentMail,
      entryNo: studentEntry,
      year: studentYear,
      department: studentDept,
      advisor: faculty._id,
      role: "student",
    });

    await newStudent.save();

    res
      .status(201)
      .json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Email or Entry No already exists" });
    } else {
      res.status(500).json({ message: "Failed to add student" });
    }
  }
});

router.get("/student-details", async (req, res) => {
  try {
    const student = req.headers["student-id"];
    //console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const studentRecord = await User.findById(student);
    //console.log(studentRecord);
    res.json(studentRecord);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
