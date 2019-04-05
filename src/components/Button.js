import React from 'react';
import './Button.css'

const Button = ({fonction}) => {
    return (
      <div>
        <button className='button' onClick={fonction}><span className='fuck'>FUCK</span> <span className='it'>IT !</span></button>
        <figure/>
    </div>)
}

export default Button;