import React from "react";
import "./CardComponent.css";

import Excuse from "./Excuse";
import DetailsAlert from "./DetailsAlert";
import CardCTA from './CardCTA'



  const CardComponent = ({dataExcuse, dataLogo, dataTitle, dataTime, dataLastTime, dataIssue, toPrevious, toNext}) => {
    return (
      <div className="CardComponent">
        <div className="logoTitleContainer">
          <img
            src="https://www.retif.eu/media/image/400x/picto-028-pole-de-correspondance-ou-gare-routiere-pvc-fond-blanc-125x125mm_01.jpg"
            alt="title img"
          />
          <h2>{dataTitle}</h2>
        </div>
        <DetailsAlert
          picture={dataLogo}
          details="Détails de l'incident"
          lastTime={dataLastTime}
          time={dataTime}
          issue={dataIssue}
        />
        <Excuse excuse={dataExcuse} />
        <div className="Card-CTA">
          <i
            className={"fas fa-chevron-left left-arrow"}
            onClick={toPrevious}
          />
          <CardCTA dataCopy={dataExcuse} />
          <i
            className={"fas fa-chevron-right right-arrow"}
            onClick={toNext}
          />
        </div>
      </div>
    );
}

export default CardComponent;
