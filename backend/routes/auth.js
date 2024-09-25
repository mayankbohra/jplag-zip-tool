const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const users = [
    { username: 'admin', password: 'admin' }
];

// Function to ensure directories exist
const ensureDirectoriesExist = () => {
    const uploadDir = path.join(__dirname, '../uploads/');
    const resultsDir = path.join(__dirname, '../results/');

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log('Created uploads directory:', uploadDir);
    }

    // Create results directory if it doesn't exist
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
        console.log('Created results directory:', resultsDir);
    }
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Ensure the directories exist upon login
        ensureDirectoriesExist();
        
        return res.status(200).json({ message: 'Login successful', loggedIn: true });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
