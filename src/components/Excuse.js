import React from 'react'
import './Excuse.css'

const Excuse = ({ excuse }) => {
    return (
        <div className='excuse'>
            <p>{excuse}</p>
        </div>
    )
}

export default Excuse
