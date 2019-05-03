import React, { Component } from "react";
import "./DetailsAlert.css";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fr';

class DetailsAlert extends Component {
  render() {
    return (
      <div className="container-DetailsAlert">
        <div className="divDetails">
          <div className="picture">
            <img src={this.props.picture} alt="train line logo" className={this.props.funnyClass}/>
          </div>
          <p className="details">{this.props.details}</p>
          <p>{this.props.issue}</p>
          <p>{this.props.lastTime}</p>
         {/* <Moment fromNow ago locale="fr"><p>{this.props.time}</p></Moment> */}
        </div>
      </div>
    );
  }
}

export default DetailsAlert;
