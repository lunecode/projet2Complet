import React, { Component } from 'react';
import './CardCTA.css'

class CardCTA extends Component {
    render() {
      return (
        <div>
            <button className='sendButton'>{this.props.sendButton}</button>
        </div>
        ); 
    }
}

export default CardCTA;
