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

// MySQL Connection (Modify to work with XAMPP MySQL)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',              // Default XAMPP username
  password: '',              // Default XAMPP MySQL password (blank by default)
  database: 'new',            // Replace 'new' with the name of your database
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

// Get All Users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(rows);
  });
});

// Add User
app.post('/users', (req, res) => {
  const { name, email, phone } = req.body;
  const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).json({ error: 'Failed to add user' });
    }
    res.json({ message: 'User added', id: result.insertId });
  });
});

// Update User
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
  connection.query(sql, [name, email, phone, id], (err) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Failed to update user' });
    }
    res.json({ message: 'User updated' });
  });
});

// Delete User
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [id], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
    res.json({ message: 'User deleted' });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
