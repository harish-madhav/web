const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect("mongodb://localhost:27017/studentDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Student Schema and Model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    grade: { type: Number, required: true },
});

const Student = mongoose.model("Student", studentSchema);

// Routes
// Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: "Error fetching students" });
    }
});

// Add a student
app.post("/students", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json({ message: "Student added successfully" });
    } catch (err) {
        res.status(400).json({ message: "Error adding student" });
    }
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting student" });
    }
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
