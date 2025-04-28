const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// In-memory users database (simple)
const users = [];

// Admin credentials
const adminUsername = "homeboy1234";
const adminPassword = "Homeboy1234????";

// API: Register User
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const newUser = { email, password, verified: false };
    users.push(newUser);
    res.json({ message: "Registration successful! Please verify your email." });
});

// API: Login User
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
    }
    if (!user.verified) {
        return res.status(400).json({ message: "Email not verified." });
    }
    res.json({ message: "Login successful!" });
});

// API: Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminUsername && password === adminPassword) {
        return res.json({ message: "Admin login successful!" });
    } else {
        return res.status(400).json({ message: "Invalid admin credentials." });
    }
});

// API: Verify User Email
app.post('/api/verify-email', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
        user.verified = true;
        res.json({ message: "Email verified successfully!" });
    } else {
        res.status(404).json({ message: "User not found." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});