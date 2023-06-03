import React, { useEffect, useState } from 'react';  // [demo] make sure react is imported
import Constants from './utilities/Constants';
import NoteCreateForm from './components/NoteCreateForm';
import NoteUpdateForm from './components/NoteUpdateForm';
import { BiRefresh, BiPlus, BiXCircle } from "react-icons/bi"
import logo from './noteit_logo.svg';
// import './styles.css'  // imported theme
import { Tooltip } from "react-tooltip";
import Alert from './components/Alert';
import Footer from './components/Footer';
import CardsGrid from './components/CardsGrid';
import './App.css'
import GhostGrid from './components/GhostGrid';
import Notification from './components/Notification';



function App() {
  // [demo] load the notes state in js array: [item, function], empty by default
  const [notes, setNotes] = useState([]);
  const [showingCreateNewNoteForm, setShowingCreateNewNoteForm] = useState(false);  // new note form is hidden by default
  const [noteIdBeingUpdated, setNoteIdBeingUpdated] = useState(null);
  const [notesAlert, setNotesAlert] = useState(false);
  const [notesNotification, setNotesNotification] = useState(false);
  const [notification, setNotification] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesCleared, setNotesCleared] = useState(false);

  // [demo] use this hook to load the motes on mount once (the empty array is for the items that with cause re-render)
  useEffect((getNotes), [])


  // implementing the get function
  function getNotes() {
    const url = Constants.API_URL_GET_ALL_NOTES;

    setNotesAlert(false);   // refresh alert status
    setNotesCleared(false);  // indicate loading status

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
        setNotesAlert(true);
        // alert(error);
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
    <>
      {/* HEADER CONTAINER */}
      <div className='w-100 bg-dark text-light py-2 py-sm-5'>
        <div className='noteit__header sticky-top col-10 px-0 mx-auto '>
          <div className="d-flex my-4 px-0 align-items-center noteit__cred">
            <img src={logo} className="mx-3 noteit__logo" alt="NoteIt Logo" width="50" />
            <h1 className='noteit__title my-0 align-items-center' >NoteIt</h1>
          </div>
          <div className='noteit__menu d-flex align-self-center'>
            <button onClick={() => setShowingCreateNewNoteForm(true)} className='btn btn-secondary btn-sm me-2 noteit__btn-new' data-tooltip-content="New Note" data-tooltip-id="menu-tooltip">
              <BiPlus size='2rem' />
            </button>
            <button onClick={getNotes} className='btn btn-outline-secondary btn-sm me-1' aria-label='Menu' data-tooltip-content="Reload Notes" data-tooltip-id="menu-tooltip">
              <BiRefresh size='2rem' />
            </button>
            {/* [wip] user area, tutorial and tech stack demo area */}
            <Tooltip id="menu-tooltip" place="bottom" variant="info" />
          </div>

          {/* [wip] fix dropdown? add search? */}
        </div>

      </div>


      {/* MAIN WINDOW CONTAINER */}
      <div className='bg-dark text-light' id='main-container'>

        {/* [demo] calling react component function, if has items, or no other form is active*/}
        {/* {(notes.length > 0 && showingCreateNewNoteForm === false && noteIdBeingUpdated === null) && renderItemsTable()} */}

        {notesAlert ? <Alert> Error fetching notes from the server. Please check your connection and try again! </Alert> : ""}
        {notesNotification ? <Notification onClose={() => setNotesNotification(false)}> {notification} </Notification> : ""}


        {(showingCreateNewNoteForm === false && noteIdBeingUpdated === null && notesAlert === false) &&
          ((notes.length > 0) ? renderItemsCards() : (notesCleared === false && <GhostGrid />) // show placeholders when no cards are loaded
          )}

        {/* render create/update note forms in this same port */}
        {showingCreateNewNoteForm && <NoteCreateForm onNoteCreated={onNoteCreated} />}
        {noteIdBeingUpdated !== null && <NoteUpdateForm note={noteIdBeingUpdated} onNoteUpdated={onNoteUpdated} />}

      </div>

      {/* FOOTER CONTAINER */}
      <Footer />
    </>
  );


  // map notes as cards
  function renderItemsCards() {
    return (
      <>
        <CardsGrid items={notes} setNoteIdBeingUpdated={setNoteIdBeingUpdated} deleteNote={deleteNote} />

        <div className="d-flex row py-3">
          <div onClick={() => {
            setNotes([])
            setNotesCleared(true)
          }
          } className='btn btn-secondary btn-sm col-3 my-3 py-3 mx-auto'>
            <BiXCircle size='1.5rem' /> Clear Notes
          </div>
        </div>
      </>

    )
  }

  // initial notes rendering as a simple table
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
                  <button onClick={() => setNoteIdBeingUpdated(note)} className='btn btn-sm btn-primary'>Update</button>
                  {/* [demo] adding a user query for deletion dialog */}
                  <button onClick={() => { if (window.confirm(`Are you sure you want to delete the item "${note.title}"?`)) deleteNote(note.noteId) }} className='btn btn-sm btn-outline-secondary m-1'>Delete</button>
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
    setNotesNotification(false);
    setNotification(`The new note was successfully created under "${createdNote.title}"!`)
    setNotesNotification(true);

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

    setNotesNotification(true);
    setNotification(`Note "${updatedNote.title}" was successfully updated!`)
  }

  // note deletion function
  function onNoteDeleted(deletedNoteId) {

    let notesCopy = [...notes]; // copy array
    let titleCp = null;   // preserve note title for display prior deleting

    // find the corresponding note and to delete
    const index = notesCopy.findIndex((notesCopyNote, currentIndex) => {
      if (notesCopyNote.noteId === deletedNoteId) {
        titleCp = notesCopyNote.title;
        return true;
      }
      return false;
    });



    // update if found
    if (index !== -1) {
      notesCopy.splice(index, 1);  // [demo] remove element at index
    }

    setNotes(notesCopy);  // refresh notes list

    setNotesNotification(true);
    setNotification(`Note "${titleCp}" successfully deleted!`)

  }

}

export default App;
