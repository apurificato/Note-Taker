const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

// Define the path to the database file
const dbFilePath = path.join(__dirname, '../db/db.json');

// Route to get all notes
router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read notes from database' });
    }
});

// Route to add a new note
router.post('/', async (req, res) => {
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
// Route to delete a note
router.delete('/:id', async (req, res) => {
    const noteId = req.params.id;
    
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        let notes = JSON.parse(data);
        // Find the index of the note with the given ID
        const noteIndex = notes.findIndex(note => note.id === noteId);
        if (noteIndex === -1) {
            return res.status(404).json({ error: 'Note not found' });
        }
        // Remove the note from the array
        notes.splice(noteIndex, 1);
        // Write the updated notes array back to the file
        await fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2));
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete note from database' });
    }
});

// // Route to update a note
// router.put(':id', async (req, res) => {
//     const noteId = req.params.id;
//     const updatedNote = req.body;
    
//     try {
//         const data = await fs.readFile(dbFilePath, 'utf8');
//         let notes = JSON.parse(data);
//         // Find the index of the note with the given ID
//         const noteIndex = notes.findIndex(note => note.id === noteId);
//         if (noteIndex === -1) {
//             return res.status(404).json({ error: 'Note not found' });
//         }
//         // Update the note with the new content
//         notes[noteIndex] = {
//             ...notes[noteIndex],
//             ...updatedNote
//         };
//         // Write the updated notes array back to the file
//         await fs.writeFile(dbFilePath, JSON.stringify(notes, null, 2));
//         res.status(200).json({ message: 'Note updated successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to update note in database' });
//     }
// });



module.exports = router;