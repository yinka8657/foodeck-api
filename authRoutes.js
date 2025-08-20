// authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db');

const router = express.Router();

// REGISTER
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    try {
        const stmt = db.prepare(`
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
        `);
        stmt.run(username, email, password_hash);

        res.json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const stmt = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = stmt.get(username);

    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isValid = bcrypt.compareSync(password, user.password_hash);
    if (!isValid) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
});

module.exports = router;
