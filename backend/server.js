const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.BACKEND_PORT;
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const DB_URI = 'mongodb+srv://pranavmenon2025:lDh5FqImNCDMXcwS@cluster0.4ky7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Schemas and Models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // 'admin', 'faculty', 'student'
  mail_id: { type: String, unique: true }, // Unique email
  facultyId: mongoose.Schema.Types.ObjectId, // Reference for students to their advisor
  batch: String,
  // faculty-specific fields
  profession: String,
  // Student-specific fields
  advisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  entryNo: { type: String, unique: true, sparse: true }, // Unique Entry Number
  year: String, // Student Year
  department: String, // Student Department
});

const User = mongoose.model('User', userSchema);

// OTP Generation and Email Sending Logic
let otpStore = {};

const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hartikarora2502@gmail.com', // Use your email
      pass: 'hoqw xjth razc okbp', // Use your email password
    },
  });

  const mailOptions = {
    from: 'hartikarora2502@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('OTP sent: ' + info.response);
    }
  });
};

// Send OTP
app.post('/api/sendOtp', async (req, res) => {
  const { email } = req.body;

  // Verify if email exists in the database
  const user = await User.findOne({ mail_id: email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000); // Random 6-digit OTP
  otpStore[email] = otp;

  // Send OTP email
  sendOtpEmail(email, otp);

  res.status(200).json({ message: 'OTP sent to email' });
});

// Verify OTP
app.post('/api/verifyOtp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ mail_id: email });

  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    // OTP verified, generate a JWT token for the user
    const token = jwt.sign({ email }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'OTP verified', role: user.role, username: user.username, _id: user._id, token });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Add Student
app.post('/api/students', async (req, res) => {
  const { studentName, studentMail, studentEntry, studentYear, studentDept, studentAdvisor} = req.body;

  if (!studentName || !studentMail || !studentEntry || !studentYear || !studentDept || !studentAdvisor) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const faculty = await User.findOne({ username: studentAdvisor, role: 'faculty' });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty advisor not found' });
    }

    const newStudent = new User({
      username: studentName,
      mail_id: studentMail,
      entryNo: studentEntry,
      year: studentYear,
      department: studentDept,
      advisor: faculty._id,
      role: 'student',
    });

    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email or Entry No already exists' });
    } else {
      res.status(500).json({ message: 'Failed to add student' });
    }
  }
});

// Add Faculty
app.post('/api/faculty', async (req, res) => {
  const { facultyName, facultyMail, facultyDept, facultyProfession} = req.body;

  if (!facultyName || !facultyMail || !facultyDept || !facultyProfession) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newFaculty = new User({
      username: facultyName,
      mail_id: facultyMail,
      department: facultyDept,
      profession: facultyProfession,
      role: 'faculty',
    });

    await newFaculty.save();

    res.status(201).json({ message: 'Faculty added successfully', faculty: newFaculty });
  } catch (error) {
    console.error('Error adding faculty:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Failed to add faculty' });
    }
  }
});

// Assign Faculty to Student
app.post('/api/assignFaculty', async (req, res) => {
  const { facultyMail, studentMail } = req.body;

  try {
    const faculty = await User.findOne({ mail_id: facultyMail, role: 'faculty' });
    const student = await User.findOne({ mail_id: studentMail, role: 'student' });

    if (!faculty || !student) {
      return res.status(404).json({ message: 'Faculty or Student not found' });
    }

    student.facultyId = faculty._id;
    await student.save();

    res.status(200).json({ message: 'Faculty assigned to student successfully' });
  } catch (error) {
    console.error('Error assigning faculty:', error);
    res.status(500).json({ message: 'Failed to assign faculty' });
  }
});

// Get Students Assigned to Faculty
app.get('/api/facultyStudents', authenticate, async (req, res) => {
  const { email } = req.user;

  try {
    const faculty = await User.findOne({ mail_id: email, role: 'faculty' });
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const students = await User.find({ facultyId: faculty._id });

    res.status(200).json({ message: 'Students fetched successfully', students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

// Protected Route
app.get('/api/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// Start Server


// Course addition Server
const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode: String,
  description: String,
  semester: String,
  instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offeringDept: String,
});

const Course = mongoose.model("Course", courseSchema);

app.post("/api/courses", async (req, res) => {
  const { courseName, courseCode, description, semester, _id, offeringDept } = req.body;
  console.log("Starting course registration");
  console.log(courseName, courseCode, description, semester, _id);
  if (!courseName || !courseCode || !description || !semester || !_id || !offeringDept) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  console.log(_id);

  const instructorID = _id;
  const newCourse = new Course({
    courseName,
    courseCode,
    description,
    semester,
    instructorID,
    offeringDept
  }); 

  try {
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully!" });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course." });
  }
});

// Add enrollments:

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the student
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the course
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the course instructor
  advisorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the faculty advisor
  instructorApproval: { type: Boolean, default: false }, // Approval status from the course instructor
  advisorApproval: { type: Boolean, default: false }, // Approval status from the faculty advisor
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

app.get("/api/courseEnrollments", async (req, res) => {
  try {
    console.log("GET REQUEST!");
    const { studentId } = req.query;
    // const { studentId } = req.query;  
    const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    // Find enrollments for the student & populate course details
    const enrollments = await Enrollment.find({studentId: studentId })
      .populate("courseId", "courseCode courseName") // Fetch only necessary fields
      .lean();

    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Server error" });
  }
});




app.post("/api/enroll", async (req, res) => {
  console.log("This is an enrollment request");
  const { studentId, courseId } = req.body;
  console.log("Student ID ", studentId);
  console.log("Course ID ", courseId);
  if (!studentId || !courseId) {
    return res.status(400).json({ message: "Student ID and Course ID are required." });
  }

  try {
    // Fetch the student's advisor
    // let studentId = '678f897f06f3a1c7903e4ce4';
    const student = await User.findById(studentId);
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student not found or invalid role." });
    }

    const advisorId = student.advisor; // Assuming facultyId stores the advisor's user ID
    if (!advisorId) {
      return res.status(400).json({ message: "Advisor not found for the student." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const instructorId = course.instructorID; // Assuming instructorId stores the instructor's user ID
    if (!instructorId) {
      return res.status(400).json({ message: "Instructor not found for the course." });
    }

    // Create the enrollment
    const Enrollment = mongoose.model("Enrollment", enrollmentSchema); // Define the model
    const enrollment = new Enrollment({
      studentId,  // Ensure correct field names (camelCase)
      courseId,
      instructorId,
      advisorId,
    });


    await enrollment.save();
    res.status(201).json({ message: "Enrollment request created successfully.", enrollment });
  } catch (error) {
    console.error("Error creating enrollment request:", error);
    res.status(500).json({ message: "Failed to create enrollment request." });
  }
});


// show courses

app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructorID", "username");  
    res.json(courses); 
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});

app.get("/api/students", async (req, res) => {
  try{
    const students = await User.find({role : "student"});
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// API to get all faculty from database
app.get("/api/faculty", async (req, res) => {
  try{
    const faculty = await User.find({role : "faculty"});
    res.json(faculty);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Approve Routes

app.get("/api/approval-requests", async (req, res) => {
  const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
  try {
    const requests = await Enrollment.find({})
      .populate("studentId", "entryNo username")
      .populate("courseId", "courseName");

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching approval requests:", error);
    res.status(500).json({ message: "Failed to fetch approval requests." });
  }
});

app.post("/api/approve-instructor", async (req, res) => {
  const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
  const { id, approve } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Enrollment ID is required." });
  }

  try {
    if (approve === false) {
      // If approval is false, delete the enrollment request
      await Enrollment.findByIdAndDelete(id);
      return res.status(200).json({ message: "Enrollment request deleted successfully." });
    }

    // If approval is true, update the instructorApproval field
    const update = { instructorApproval: approve };
    await Enrollment.findByIdAndUpdate(id, update);

    res.status(200).json({ message: "Instructor approval updated successfully." });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ message: "Failed to process the request." });
  }
});


app.post("/api/approve-advisor", async (req, res) => {
  const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
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


// Fetch Faculty Course
app.get("/api/faculty-courses", async (req, res) => {
  try {
    const facultyId = req.headers["faculty-id"]; // Assuming faculty ID is passed in headers

    console.log("Get Faculty Requests");
    if (!facultyId) {
      return res.status(400).json({ message: "Faculty ID is required." });
    }


    const courses = await Course.find({ instructorID: facultyId }).populate("instructorID");
    console.log(courses);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching faculty courses:", error);
    res.status(500).json({ message: "Failed to fetch faculty courses." });
  }
});


// Student Record 
app.get("/api/student-details" , async (req, res) => {
  try {
    const student = req.headers["student-id"];
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const studentRecord = await User.findById(student);
    console.log(studentRecord);
    res.json(studentRecord);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// delete user from database by admin 

app.delete("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedStudent = await User.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
});

// delete faculty from database by admin
app.delete("/api/faculty/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
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



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
