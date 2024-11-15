const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const db = new sqlite3.Database('./studi_ai.db');

// Middleware for parsing JSON
app.use(express.json());
app.use(express.static('public'));

// Basic routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Set up database
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, question TEXT, answer TEXT)");
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Server error');
        db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], (err) => {
            if (err) return res.status(500).send('Error registering');
            res.status(200).send('Registered successfully');
        });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) return res.status(500).send('Server error');
        if (!user) return res.status(400).send('User not found');
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.status(200).send('Login successful');
            } else {
                res.status(400).send('Invalid password');
            }
        });
    });
});

// Search endpoint
app.post('/search', (req, res) => {
    const { query } = req.body;
    db.get("SELECT answer FROM questions WHERE question LIKE ?", [`%${query}%`], (err, row) => {
        if (err) return res.status(500).send('Server error');
        res.json(row ? row.answer : 'No answer found');
    });
});

// Chat functionality
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
