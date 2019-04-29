  
import React from 'react';
import './Button.css'
import Loader from './Loader'
import LoaderText from './LoaderText'

const Button = ({fonction, category}) => {
   const modifyButton = 'button ' + category

    return (
     <div className='loading'>
        <button className={modifyButton} onClick={fonction}><div className='picto'></div></button>
        <Loader />
     </div>)
}

export default Button;
