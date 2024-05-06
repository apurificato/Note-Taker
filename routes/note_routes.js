const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

// Define the path to the database file
const dbFilePath = path.join(__dirname, 'db.json');

// Route to get all notes
router.get('/api/notes', async (req, res) => {
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read notes from database' });
    }
});

// Route to add a new note
router.post('/api/notes', async (req, res) => {
    const newNote = req.body;
    
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        const notes = JSON.parse(data);
        newNote.id = Date.now().toString(); // Generate a unique ID for the note
        notes.push(newNote);

        await fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2));
        
        res.status(201).json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to write note to database' });
    }
});

// Additional routes for updating and deleting notes can be added here

module.exports = router;

