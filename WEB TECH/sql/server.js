const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',              // Default XAMPP username
  password: '',              // Default XAMPP MySQL password
  database: 'gowdham',   // Replace with your database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('MySQL Connected...');
});

// Serve AngularJS Frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// CRUD Operations

// Get All Bookings
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
    res.json(rows);
  });
});

// Add Booking
app.post('/users', (req, res) => {
  const { name, email, phone, date, status } = req.body;
  const sql = 'INSERT INTO users (name, email, phone, date, status) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [name, email, phone, date, status], (err, result) => {
    if (err) {
      console.error('Error adding booking:', err);
      return res.status(500).json({ error: 'Failed to add booking' });
    }
    res.json({ message: 'Booking added', id: result.insertId });
  });
});

// Update Booking
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, date, status } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, date = ?, status = ? WHERE id = ?';
  connection.query(sql, [name, email, phone, date, status, id], (err) => {
    if (err) {
      console.error('Error updating booking:', err);
      return res.status(500).json({ error: 'Failed to update booking' });
    }
    res.json({ message: 'Booking updated' });
  });
});

// Delete Booking
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], (err) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ error: 'Failed to delete booking' });
    }
    res.json({ message: 'Booking deleted' });
  });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
