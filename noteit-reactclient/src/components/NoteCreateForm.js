import React, { useState } from 'react'
import Constants from '../utilities/Constants';


// functional component for a new noteform
export default function NoteCreateForm(props) {

    // provide placeholder for the fields
    const initialFormData = Object.freeze({
        title: "Note X",
        content: "This is a new note that can be edited"
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
        const noteToCreate = {
            noteId: 0, // the server will create new id
            title: formData.title,
            content: formData.content
        };

        // prep API route...
        const url = Constants.API_URL_CREATE_NOTE;

        // and send a post directive to the server
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // indicate we're sending a json file to the web API
            },
            body: JSON.stringify(noteToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer); // output to console
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            }); // handle failure case

        props.onNoteCreated(noteToCreate);
    };



    return (
        <form className='noteit__form w-100 px-5 pb-5'>
            <h1 className='pt-5'>Create New Note</h1>

            <div className='mt-5'>
                <label className='h3 form-label'>Note Title</label>
                <input value={formData.title} name='title' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Note Content</label>
                <input value={formData.content} name='content' type='text' className='form-control' onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className='btn btn-success btn-lg w-100 mt-5'>Submit</button>
            <button onClick={() => props.onNoteCreated(null)} className='btn btn-outline-secondary btn-lg w-100 mt-3'>Cancel</button>
        </form>
    );
}
