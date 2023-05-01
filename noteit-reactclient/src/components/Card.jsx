import React from 'react'
import { BiEdit, BiMinusCircle } from "react-icons/bi"





function Card({ title, content, onUpdate, onDelete }) {
    return (
        // [wip] minimum width, proper responsive layouts
        //style={{height: 150 + 'px'}}
        // style={{width: 18 + 'rem'}}
        <div className="card m-1 bg-dark col-2" style={{width: 14 + 'rem'}}>
            {/* <img src="" class="card-img-top" alt="..." /> */}
            <div class="card-body text-light">
                <h5 class="card-title text-muted">{title}</h5>
                <p class="card-text">{content}</p>
                <span className='d-flex'>
                    <a href="#" class="me-2" onClick={onUpdate}>
                        <BiEdit size='1.5rem' />
                    </a>
                    <a href="#" class="text-secondary" onClick={onDelete}>
                        <BiMinusCircle size='1.5rem' />
                    </a>
                </span>
            </div>
        </div>
    )
}

export default Card