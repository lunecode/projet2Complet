import React from "react";
import "./CardComponent.css";

import Excuse from "./Excuse";
import DetailsAlert from "./DetailsAlert";
import CardCTA from './CardCTA'


  const CardComponent = ({dataExcuse, dataLogo, dataTitle, dataTime, dataLastTime, dataIssue, toPrevious, toNext}) => {
    return (
      <div className="DisplayComponent">
        <div className="logoTitleContainer">
          <img src="" alt="title img" />
          <h1>{dataTitle}</h1>
        </div>
        <DetailsAlert
          picture={dataLogo}
          details="Détails de l'incident"
          lastTime={dataLastTime}
          time={dataTime}
          issue={dataIssue}
        />
        <Excuse excuse={dataExcuse} /> 
        <CardCTA sendButton='SEND IT'/>
        <i
          className={"fas fa-chevron-left left-arrow"}
          onClick={toPrevious}
        />
        <i
          className={"fas fa-chevron-right right-arrow"}
          onClick={toNext}
        />
      </div>
    );
}

export default CardComponent;
