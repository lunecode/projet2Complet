import React from 'react';
import './DisplayComponent.css'
import Excuse from './Excuse'
import DetailsAlert from './DetailsAlert'


const DisplayComponent = ({dataExcuse}) => {

    return (
        <div className='DisplayComponent'>
            <DetailsAlert 
            picture="https://pbs.twimg.com/profile_images/755026402475466752/4Fa09qRh_bigger.jpg"            
            details= "Détails de l'incident"
            excuse={dataExcuse}
            />
            <button className='sendButton'>SEND IT</button>
        </div>
    );
}

export default DisplayComponent 