import React, { useState } from 'react'
import Constants from '../utilities/Constants';


// functional component for a new noteform
export default function NoteUpdateForm(props) {

    // provide placeholder for the fields
    // in the update screen, we populate the fields with the note to be updated
    const initialFormData = Object.freeze({
        title: props.note.title,
        content: props.note.content
    });

    const [formData, setFormData] = useState(initialFormData);



    // we receive event and change the title to value
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // collect the inputted data...
        const noteToUpdate = {
            noteId: props.note.noteId,
            title: formData.title,
            content: formData.content
        };

        // prep API route...
        const url = Constants.API_URL_UPDATE_NOTE;

        // and send a post directive to the server
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  // indicate we're sending a json file to the web API
            },
            body: JSON.stringify(noteToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer); // output to console
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            }); // handle failure case

        props.onNoteUpdated(noteToUpdate);
    };



    return (
        <form className='noteit__form col-10 mx-auto'>
            <h1 className='pt-5'>Updating Note "{props.note.title}".</h1>

            <div className='mt-5'>
                <label className='form-label' for='formUpdateTitle'>Note Title</label>
                <input value={formData.title} name='title' type='text' className='form-control bg-dark text-light' id='formUpdateTitle' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='form-label' for='formUpdateContent'>Note Content</label>
                {/* <input value={formData.content} name='content' type='text' className='form-control' onChange={handleChange} /> */}
                <textarea value={formData.content} name='content' type='text' rows='4' className="form-control bg-dark text-light" id='formUpdateContent' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className='btn btn-success btn-lg w-100 mt-5'>Submit</button>
            <button onClick={() => props.onNoteUpdated(null)} className='btn btn-outline-secondary btn-lg w-100 mt-3'>Cancel</button>
        </form>
    );
}
