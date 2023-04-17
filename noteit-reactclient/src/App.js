import React, { useState } from 'react';  // [demo] make sure react is imported
import Constants from './utilities/Constants';
import NoteCreateForm from './components/NoteCreateForm';
import NoteUpdateForm from './components/NoteUpdateForm';
import logo from './logo.svg';


function App() {
  // [demo] load the notes state in js array: [item, function], empty by default
  const [notes, setNotes] = useState([]);
  const [showingCreateNewNoteForm, setShowingCreateNewNoteForm] = useState(false);  // new note form is hidden by default
  const [noteIdBeingUpdated, setNoteIdBeingUpdated] = useState(null);


  // implementing the get function
  function getNotes() {
    const url = Constants.API_URL_GET_ALL_NOTES;

    // [demo] fetch with a GET directive and save to a .json
    // [wiki] this request must be authorized with a CORS policy server-size
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(itemsFromServer => {
        // console.log(itemsFromServer); // output to console
        setNotes(itemsFromServer);  // update the corresponding state
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      }); // handle failure case
  }

  function deleteNote(noteId) {
    const url = `${Constants.API_URL_DELETE_NOTE_BY_ID}/${noteId}`; // [demo] interpolated string to build note id deletion route

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(itemsFromServer => {
        console.log(itemsFromServer); // output to console
        onNoteDeleted(noteId);  // update the corresponding state
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      }); // handle failure case
  }

  return (
    <div className='container'>
      <div className='row min-vh-100'>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewNoteForm === false && noteIdBeingUpdated === null) && (
            <div>
              <img src={logo} className="mx-auto d-block" alt="NoteIt Logo" width="200" height="200"/>
              <h1 className='display-1 text-center'>NoteIt App</h1>
              <h4 className='text-center'>ASP.NET Core app</h4>
              <div className='mt-4'>
                <button onClick={getNotes} className='btn btn-primary btn-lg w-100'>Fetch Notes from Server</button>
                <button onClick={() => setShowingCreateNewNoteForm(true)} className='btn btn-secondary btn-lg w-100 mt-2'>New Note</button>
              </div>
            </div>
          )}

          {/* [demo] calling react component function, if has items, or no other form is active*/}
          {(notes.length > 0 && showingCreateNewNoteForm === false && noteIdBeingUpdated === null) && renderItemsTable()}

          {showingCreateNewNoteForm && <NoteCreateForm onNoteCreated={onNoteCreated} />}

          {noteIdBeingUpdated !== null && <NoteUpdateForm note={noteIdBeingUpdated} onNoteUpdated={onNoteUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderItemsTable() {
    return (
      <div className='table-responsive mt-5'>
        <p className='mb-1'><small>Database items</small></p>
        <table className='table table-hover border-dark table-sm align-middle'>
          <thead>
            <tr>
              <th scope="col">NoteId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {/* map a row for each fetched item */}
            {notes.map((note) => (
              <tr key={note.NoteId}>
                <th scope="row">{note.noteId}</th>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>
                  <button onClick={() => setNoteIdBeingUpdated(note)} className='btn btn-primary mt-2'>Update</button>
                  {/* [demo] adding a user query for deletion dialog */}
                  <button onClick={() => { if(window.confirm(`Are you sure you want to delete the item "${note.title}"?`)) deleteNote(note.noteId)}} className='btn btn-outline-secondary mt-2'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* table-clearing button */}
        <button onClick={() => setNotes([])} className='btn btn-light btn-lg w-100'>Clear Table</button>

      </div>
    );
  }

  // handle the result from new note creation
  function onNoteCreated(createdNote) {
    setShowingCreateNewNoteForm(false); // hide form once new note is created

    if (createdNote === null) {
      return; // only update if the new note is present
    }

    alert(`The new note was successfully created! It will show up in the table under "${createdNote.title}"!`);

    getNotes();
  }

  // note update functionality
  function onNoteUpdated(updatedNote) {
    setNoteIdBeingUpdated(null);

    // stop on bad update
    if (updatedNote === null) {
      return;
    }

    let notesCopy = [...notes]; // copy array

    // find the corresponding note and update it within the given notes array
    const index = notesCopy.findIndex((notesCopyNote, currentIndex) => {
      if (notesCopyNote.noteId === updatedNote.noteId) {
        return true;
      }
      return false;
    });

    // update if found
    if (index !== -1) {
      notesCopy[index] = updatedNote;
    }

    setNotes(notesCopy);  // refresh notes list

    alert(`Note "${updatedNote.title}" was successfully updated!`);

  }

  // note deletion function
  function onNoteDeleted(deletedNoteId) {

    let notesCopy = [...notes]; // copy array

    // find the corresponding note and to delete
    const index = notesCopy.findIndex((notesCopyNote, currentIndex) => {
      if (notesCopyNote.noteId === deletedNoteId) {
        return true;
      }
      return false;
    });

    // update if found
    if (index !== -1) {
      notesCopy.splice(index,1);  // [demo] remove element at index
    }

    setNotes(notesCopy);  // refresh notes list

    alert(`Note "${deletedNoteId.title}" successfully deleted!`);

  }

}

export default App;
