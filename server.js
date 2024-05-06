const express = require('express');
const path = require('path');
const app = express();

const notesRouter = require('./routes/note_routes.js');

const PORT = process.env.PORT || 3333;


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});