import React from 'react'
import { BiEdit, BiXCircle } from "react-icons/bi"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import './Card.css'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


function CardGhost() {
    return (
        <div class="card bg-dark text-light  m-1" aria-hidden="true">
            {/* <img src="..." class="card-img-top" alt="..."> */}
            <div class="card-body bg-dark text-light p-2">
                <h5 class="card-title text-secondary placeholder-glow">
                    <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow lh-sm">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                </p>
                <div className='d-flex'>
                    <a class="btn btn-secondary disabled placeholder col-2 me-2"></a>
                    <a class="btn btn-secondary disabled placeholder col-2 pe-2"></a>
                </div>
            </div>
        </div>
    )
}


function GhostGrid({ items, setNoteIdBeingUpdated, deleteNote }) {
    return (
        <div className="col-10 mx-auto bg-dark text-light">
            <ResponsiveMasonry columnsCountBreakPoints={
                { 350: 2, 650: 3, 1000: 4, 1200: 5, 1400: 6 }}>
                <Masonry columnsCount={3}>
                    <CardGhost />
                    <CardGhost />
                    <CardGhost />
                    <CardGhost />
                    <CardGhost />
                    <CardGhost />
                    <CardGhost />
                    <CardGhost />
                    {/* {items.map((note) => (
                    // <div className='col-6'>
                    // <div className='col-sm-4 col-md-3 py-3'>
                    // <div className="col-sm-6 col-md-4 col-lg-2">
                    <CardGhost title={note.title} content={note.content}
                        onUpdate={() => setNoteIdBeingUpdated(note)}
                        onDelete={() => { if (window.confirm(`Are you sure you want to delete the item "${note.title}"?`)) deleteNote(note.noteId) }}
                    />
                    // </div>
                ))} */}
                    {/* <Alert onClick={() => console.log("Alert Clicked!")} onClose={() => null}>
            This is a ReactNode <div>children prop</div>
            </Alert> */}

                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}

export default GhostGrid