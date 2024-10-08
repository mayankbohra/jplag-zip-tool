const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.array('files'), (req, res) => {
    const language = req.body.language;

    if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: 'No files uploaded.' });
    }

    let scriptFile = '';
    switch (language) {
        case 'python':
            scriptFile = path.join(__dirname, '../scripts/python.sh');
            break;
        case 'c':
            scriptFile = path.join(__dirname, '../scripts/c.sh');
            break;
        case 'cpp':
            scriptFile = path.join(__dirname, '../scripts/cpp.sh');
            break;
        case 'java':
            scriptFile = path.join(__dirname, '../scripts/java.sh');
            break;
        default:
            return res.status(400).send({ message: 'Unsupported language' });
    }

    try {
        // Using bash command instead of cmd.exe for Linux compatibility
        const command = `bash "${scriptFile}"`;
        execSync(command, { stdio: 'inherit' });

        fs.readdir(path.join(__dirname, '../results/'), (err, files) => {
            if (err) {
                return res.status(500).send({ message: 'Error reading results directory' });
            }
            const zipFiles = files.filter(file => file.endsWith('.zip'));
            res.send({ message: 'Files uploaded successfully', zipFiles });
        });
    } catch (error) {
        console.error('Error running the script:', error);
        return res.status(500).send({ message: 'Error running the script', error: error.message });
    }
});

router.get('/check-folders', (req, res) => {
    const uploadsDir = path.join(__dirname, '../uploads/');
    const resultsDir = path.join(__dirname, '../results/');

    fs.readdir(uploadsDir, (err, uploads) => {
        if (err) {
            return res.status(500).send({ message: 'Error reading uploads directory' });
        }

        fs.readdir(resultsDir, (err, results) => {
            if (err) {
                return res.status(500).send({ message: 'Error reading results directory' });
            }

            const uploadsEmpty = uploads.length === 0;
            const resultsEmpty = results.length === 0;
            const zipFiles = results.filter(file => file.endsWith('.zip'));

            res.send({ uploadsEmpty, resultsEmpty, zipFiles });
        });
    });
});

router.delete('/clear-files', (req, res) => {
    const uploadDir = path.join(__dirname, '../uploads/');
    const resultsDir = path.join(__dirname, '../results/');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to clear uploads directory.' });
        }

        for (const file of files) {
            fs.unlink(path.join(uploadDir, file), (err) => {
                if (err) {
                    console.error(`Failed to delete ${file}: ${err}`);
                }
            });
        }

        fs.readdir(resultsDir, (err, files) => {
            if (err) {
                return res.status(500).send({ message: 'Failed to clear results directory.' });
            }

            for (const file of files) {
                fs.unlink(path.join(resultsDir, file), (err) => {
                    if (err) {
                        console.error(`Failed to delete ${file}: ${err}`);
                    }
                });
            }

            res.send({ message: 'All files cleared successfully.' });
        });
    });
});

module.exports = router;
