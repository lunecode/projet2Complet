import React, { Component } from "react";
import "./DetailsAlert.css";

class DetailsAlert extends Component {
  render() {
    return (
      <div className="container-DetailsAlert">
        <div className="divDetails">
          <div className="picture">
            <img src={this.props.picture} alt="train line logo" />
          </div>
          <p className="details">{this.props.details}</p>
          <p>{this.props.issue}</p>
          <p>{this.props.lastTime}</p>
          <p>{this.props.time}</p>
        </div>
      </div>
    );
  }
}

export default DetailsAlert;
