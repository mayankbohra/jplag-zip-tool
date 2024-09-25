const express = require('express');
const path = require('path'); 
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/results', express.static(path.join(__dirname, 'results')));

const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth', authRoutes);
console.log("Auth routes configured");

app.use('/api/upload', uploadRoutes);
console.log("Upload routes configured");

app.use((err, req, res, next) => {
    console.log("Status endpoint accessed");
    res.status(500).send({ message: 'Something broke!' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
