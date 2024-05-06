let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
let clearBtn;

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes')
    .then(response => response.json())
    .catch(error => console.error('Error fetching notes:', error));

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  }).then(response => response.json())
    .catch(error => console.error('Error saving note:', error));

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => console.log('Note deleted successfully'))
    .catch(error => console.error('Error deleting note:', error));

const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  saveNote(newNote)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });

};

const handleNoteDelete = (id) => {
  deleteNote(id)
    .then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
};

const handleNoteView = (e) => {
  e.preventDefault();
  const note = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  activeNote = note;
  renderActiveNote();
};

const handleNewNoteView = () => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

const handleRenderBtns = () => {
  show(clearBtn);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

const renderNoteList = (notes) => {
  noteList.innerHTML = ''; // Clear existing list
  if (notes.length === 0) {
    noteList.innerHTML = '<li class="list-group-item">No saved notes</li>';
  } else {
    notes.forEach((note) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      // Set data-note attribute with the note object
      li.setAttribute('data-note', JSON.stringify(note));
      li.innerHTML = `<span class="list-item-title">${note.title}</span>
                      <i class="fas fa-trash-alt float-right text-danger delete-note"></i>`;
      li.addEventListener('click', handleNoteView);
      li.querySelector('.delete-note').addEventListener('click', (e) => {
        e.stopPropagation();
        handleNoteDelete(note.id);
      });
      noteList.appendChild(li);
    });
  }
};

const getAndRenderNotes = () => {
  getNotes()
    .then(renderNoteList)
    .catch(error => console.error('Error getting and rendering notes:', error));
};

document.addEventListener('DOMContentLoaded', () => {
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelector('.list-container .list-group');

  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', renderActiveNote);
  noteForm.addEventListener('input', handleRenderBtns);

  getAndRenderNotes();
});
