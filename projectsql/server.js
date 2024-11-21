const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/harish", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected...");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const studentSchema = new mongoose.Schema({
    name: String,
    id: String,
    gender: String,
    mail: String,
    branch: String,
    city: String,
    year: String,
    current: String,
}, { collection: "stu" });

const Student = mongoose.model('student_detail', studentSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/register", async (req, res) => {
    try {
        const { name, id, gender, mail, branch, city, year, current } = req.body;
        const newStudent = new Student({ name, id, gender, mail, branch, city, year, current });
        await newStudent.save();
        res.send("Successfully inserted");
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

app.post("/updates", async (req, res) => {
    try {
        const { id, mail } = req.body;
        const updatedStudent = await Student.findOneAndUpdate({ id: id }, { mail: mail }, { new: true });
        if (updatedStudent) {
            res.send("Successfully updated");
        } else {
            res.send("Not updated");
        }
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

app.post("/deletes", async (req, res) => {
    try {
        const { id } = req.body;
        const deletedStudent = await Student.findOneAndDelete({ id: id });
        if (deletedStudent) {
            res.send("Successfully deleted");
        } else {
            res.send("Not deleted");
        }
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

app.get("/fetch", async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (error) {
        res.status(500).send('Error: ' + error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
