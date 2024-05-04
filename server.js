const express = require('express');
const path = require('path');
const app = express();

const notesRouter = require('./Develop/routes/note_routes.js');

const PORT = process.env.PORT || 3333;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());

app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.get('/api/data', (req, res) => {
//   // Logic to retrieve data from a database or other source
//   const data = { message: 'Hello from the server!' };
//   res.json(data);
// });
