import React from 'react'
import './DropContainer.css';

export default function DropContainer(props) {
    const onDragOver = (event) => {
        event.preventDefault();
    }

    return (
        <div className='drop-container' onDrop={event => props.onDrop(event)} onDragOver={(event => onDragOver(event))}>
            <p>Drop Zone 🛬</p>
        </div>
    )
}
