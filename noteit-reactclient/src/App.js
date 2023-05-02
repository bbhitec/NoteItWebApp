import React, { useState } from 'react';  // [demo] make sure react is imported
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
    <>
      {/* HEADER CONTAINER */}
      <div className='noteit__header sticky-top bg-dark text-light'>
        <div className="d-flex my-4 px-1 align-items-center noteit__cred">
          <img src={logo} className="mx-3 noteit__logo" alt="NoteIt Logo" width="50" />
          <h1 className='noteit__title my-0 align-items-center' >NoteIt</h1>
          {/* <h4 className=''>ASP.NET Core app</h4> */}
        </div>
        <div className='noteit__menu d-flex align-self-center'>
          <button onClick={() => setShowingCreateNewNoteForm(true)} className='btn btn-primary btn-sm me-2' data-tooltip-content="New Note" data-tooltip-id="menu-tooltip">
            <BiPlus size='2rem' />
          </button>
          <button onClick={getNotes} className='btn btn-secondary btn-sm me-1' aria-label='Menu' data-tooltip-content="Reload Notes" data-tooltip-id="menu-tooltip">
            <BiRefresh size='2rem' />
          </button>
          {/* [wip] user area, tutorial and tech stack demo area */}
          <Tooltip id="menu-tooltip" place="bottom" variant="info" />
        </div>

        {/* [wip] fix dropdown? add search? */}
        {/* <ul className='app-nav'>
          <li className='app-search'></li>
          <li className='dropdown'>
            <a className='app-nav__item' href="#" data-toggle='dropdown' aria-label='Menu'>
              <BsPersonFill size='3rem' />
            </a>
            <ul className='dropdown-menu settings-menu dropdown-menu-right' data-bs-theme="dark">
              <li><a className='dropdown-item' href=''>Item</a></li>
              <li><a className='dropdown-item' href=''>Item</a></li>
              <li><a className='dropdown-item' href=''>Item</a></li>
              <li><a className='dropdown-item' href=''>Item</a></li>
            </ul>
          </li>
        </ul> */}
        {/* <ul class="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" data-bs-theme="light">
          <li><a class="dropdown-item rounded-2 active" href="#">Action</a></li>
          <li><a class="dropdown-item rounded-2" href="#">Another action</a></li>
          <li><a class="dropdown-item rounded-2" href="#">Something else here</a></li>
          <li><a class="dropdown-item rounded-2" href="#">Separated link</a></li>
        </ul> */}

      </div>


      {/* MAIN WINDOW CONTAINER */}
      {/* <div className='container-fluid vh-100 row bg-dark text-light'> */}
      {/* <div className='col-xl-8 mx-auto vh-100 bg-dark text-light' id='main-container'> */}
      <div className='bg-dark text-light' id='main-container'>
        {/* [demo] calling react component function, if has items, or no other form is active*/}
        {/* {(notes.length > 0 && showingCreateNewNoteForm === false && noteIdBeingUpdated === null) && renderItemsTable()} */}
        {(notes.length > 0 && showingCreateNewNoteForm === false && noteIdBeingUpdated === null) && renderItemsCards()}

        {/* render create/update note forms in this same port */}
        {showingCreateNewNoteForm && <NoteCreateForm onNoteCreated={onNoteCreated} />}
        {noteIdBeingUpdated !== null && <NoteUpdateForm note={noteIdBeingUpdated} onNoteUpdated={onNoteUpdated} />}

        {/* </div> */}
        {/* </div> */}
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
          <div onClick={() => setNotes([])} className='btn btn-secondary btn-sm col-2 my-2 mx-auto'>
            <BiXCircle size='2rem' /> Clear Notes
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
      notesCopy.splice(index, 1);  // [demo] remove element at index
    }

    setNotes(notesCopy);  // refresh notes list

    alert(`Note "${deletedNoteId.title}" successfully deleted!`);

  }

}

export default App;
