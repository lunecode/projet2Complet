import React, { Component } from 'react';
import './DetailsAlert.css'

class DetailsAlert extends Component {
    render() {
      return (
        <div className= "container-DetailsAlert">
            <div className="divDetails">
            <div className="picture">
             <img src={this.props.picture} alt="RER D"/>
            </div>
             <p className="details">{this.props.details}</p>

            </div>
        </div>
            );
        }
        }


export default DetailsAlert;