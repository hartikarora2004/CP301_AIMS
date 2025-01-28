const express = require("express");
const Course = require("../models/Courses");
const Enrollment = require("../models/Enrollments");
const User = require("../models/User");

const router = express.Router();

router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

router.get("/faculty", async (req, res) => {
  try {
    const faculty = await User.find({ role: "faculty" });
    res.json(faculty);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const deletedStudent = await User.findByIdAndDelete(id);


    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Enrollment.deleteMany({ studentId: id });
    
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
});

router.delete("/faculty/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const deletedFaculty = await User.findByIdAndDelete(id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("Error deleting Faculty:", error);
    res.status(500).json({ message: "Error deleting faculty" });
  }
});

module.exports = router;
