const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'angular'
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("MySQL connected...");
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/register", (req, res) => {
    const { name, id, gender, mail, branch, city, year, current } = req.body;
    const query = 'INSERT INTO student_detail (name, id, gender, mail, branch, city, year, current) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, id, gender, mail, branch, city, year, current], (error, results) => {
        if (error) {
            return res.status(500).send('Error: ' + error);
        }
        res.send("Successfully inserted");
    });
});

app.post("/updates", (req, res) => {
    const { id, mail } = req.body;
    const query = 'UPDATE student_detail SET mail = ? WHERE id = ?';
    db.query(query, [mail, id], (error, results) => {
        if (error) {
            return res.status(500).send('Error: ' + error);
        }
        if (results.affectedRows > 0) {
            res.send("Successfully updated");
        } else {
            res.send("Not updated");
        }
    });
});


app.post("/deletes", (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM student_detail WHERE id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error: ' + error);
        }
        if (results.affectedRows > 0) {
            res.send("Successfully deleted");
        } else {
            res.send("Not deleted");
        }
    });
});


app.get("/fetch", (req, res) => {
    const query = 'SELECT * FROM student_detail';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Error: ' + error);
        }
        res.send(results);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
