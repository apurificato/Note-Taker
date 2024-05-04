const express = require('express');
const fs = require('fs');

const router = express.Router();

// Read initial notes from db.json
let notes = JSON.parse(fs.readFileSync('db.json'));

// Route to get all notes
router.get('/', (req, res) => {
  res.json(notes);
});

// Route to add a new note
router.post('/', (req, res) => {
  const newNote = req.body;
  notes.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notes));
  res.status(201).json(newNote);
});

// Route to delete a note by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter(note => note.id !== id);
  fs.writeFileSync('db.json', JSON.stringify(notes));
  res.sendStatus(204);
});

module.exports = router;
