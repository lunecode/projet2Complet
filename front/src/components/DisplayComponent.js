import React, {Component} from "react";
import "./DisplayComponent.css";
import Excuse from "./Excuse";
import DetailsAlert from "./DetailsAlert";

  const DisplayComponent = ({dataExcuse, dataLogo, toPrevious, toNext}) => {
    return (
      <div className="DisplayComponent">
        <DetailsAlert
          picture={dataLogo}
          details="Détails de l'incident"
          excuse={dataExcuse}
        />
        <button className="sendButton">SEND IT</button>
        <i className="fas fa-chevron-left left-arrow" onClick={toPrevious} />
        <i className="fas fa-chevron-right right-arrow" onClick={toNext} />
      </div>
    );
}

export default DisplayComponent;
