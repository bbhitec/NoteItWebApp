import React from 'react'
import { BiEdit, BiXCircle } from "react-icons/bi"
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import './Card.css'


function Card({ title, content, onUpdate, onDelete }) {
    return (
        // [wip] minimum width, proper responsive layouts
        <div className="card noteit__card bg-dark text-light m-2">
            {/* // xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-6"> */}
            {/* <img src="" class="card-img-top" alt="..." /> */}
            <div className="card-body noteit__card-body bg-dark text-light" >
                <h5 className="card-title text-muted">{title}</h5>
                <p className="card-text">{content}</p>
                {/* [wip] show on */}
                <div className='d-flex'>
                    <div className="me-2 text-secondary" onClick={onUpdate} data-tooltip-content="Update Note" data-tooltip-id="action-tooltip">
                        <BiEdit size='1.5rem' />
                    </div>
                    <div className="text-secondary" onClick={onDelete} data-tooltip-content="Delete Note" data-tooltip-id="action-tooltip">
                        <BiXCircle size='1.5rem' />
                    </div>
                    <Tooltip id="action-tooltip" place="bottom" variant="info" />
                </div>
            </div>
        </div>
    )
}

export default Card