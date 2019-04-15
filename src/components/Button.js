import React from 'react';
import './Button.css'
import Loader from './Loader'

const Button = ( {fonction}) => {
   // const modifyButton = 'button' + {category}
    return (
     <div className='loading'>
        <button className='button' onClick={fonction}><div className='picto'></div></button>
        <Loader />
     </div>)
}

export default Button;