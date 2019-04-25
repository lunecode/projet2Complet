import React from 'react';
import './DisplayComponent.css'
import Excuse from './Excuse'
import DetailsAlert from './DetailsAlert'


const DisplayComponent = ({dataExcuse, dataLogo}) => {

    return (
        <div className='DisplayComponent'>
            <DetailsAlert 
            picture={dataLogo}      
            details= "Détails de l'incident"
            excuse={dataExcuse}
            />
            <button className='sendButton'>SEND IT</button>
        </div>
    );
}

export default DisplayComponent 