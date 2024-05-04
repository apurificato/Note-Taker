const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define the path to the database file
const dbFilePath = path.join(__dirname, 'db.json');

// Route to get all notes
router.get('/api/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read notes from database' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Route to add a new note
router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read notes from database' });
            return;
        }

        const notes = JSON.parse(data);
        newNote.id = Date.now().toString(); // Generate a unique ID for the note
        notes.push(newNote);

        fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to write note to database' });
                return;
            }
            res.status(201).json(newNote);
        });
    });
});

// Additional routes for updating and deleting notes can be added here

module.exports = router;
