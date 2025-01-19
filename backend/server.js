const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 5000;
app.use(cors()); 
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const DB_URI = 'mongodb+srv://pranavmenon2025:lDh5FqImNCDMXcwS@cluster0.4ky7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Schemas and Models
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // 'admin', 'faculty', 'student'
  mail_id: String,
  facultyId: mongoose.Schema.Types.ObjectId, // Reference for students to their advisor
  batch: String
});
const User = mongoose.model('User', userSchema);

const courseSchema = new mongoose.Schema({
  courseName: String,
  courseCode: String,
  facultyId: mongoose.Schema.Types.ObjectId, // Reference to the faculty creating the course
  description: String,
  studentsEnrolled: [mongoose.Schema.Types.ObjectId], // List of student IDs
  approvalStatus: String // 'pending', 'approved', 'rejected'
});
const Course = mongoose.model('Course', courseSchema);

const enrollmentRequestSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId, // Reference to the student making the request
  courseId: mongoose.Schema.Types.ObjectId, // Reference to the course
  facultyApproval: {
    status: String, // 'pending', 'approved', 'rejected'
    approvedAt: Date,
    comments: String
  },
  advisorApproval: {
    status: String, // 'pending', 'approved', 'rejected'
    approvedAt: Date,
    comments: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const EnrollmentRequest = mongoose.model('EnrollmentRequest', enrollmentRequestSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Course Enrollment API!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add this route to server.js
app.post('/api/students', async (req, res) => {
    try {
      const { studentName, studentMail, studentEntry, studentYear, studentDept } = req.body;
  
      if (!studentName || !studentMail || !studentEntry || !studentYear || !studentDept) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new student
      const newStudent = new User({
        username: studentName,
        password: '', // Set a default password or generate it
        mail_id: studentMail,
        role: 'student',
        batch: studentYear,
        facultyId: null // Assign a faculty advisor if needed
      });
  
      await newStudent.save();
      res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  