import React from "react";
import "./CardFunny.css";
import "./CardComponent.css";


import Excuse from "./Excuse";
import DetailsAlert from "./DetailsAlert";
import CardCTA from './CardCTA'

  const CardFunny = ({dataExcuse, dataLogo, dataTitle, dataTime, dataLastTime, dataIssue, toPrevious, toNext, goBack}) => {

    const cardClasses = 'cardComponent ' + dataTitle;

    return (
      <div className={cardClasses}>
        <div className="headerCard">
          <img
            src="https://image.flaticon.com/icons/svg/725/725107.svg"
            alt="title img"
          />
          <h2>{dataTitle}</h2>
        </div>
        <DetailsAlert picture={dataLogo} funnyClass="meme" />
        <div className="frame">
          <div className="excuse">
            <div className="excuse-scroll">"{dataExcuse}"</div>
          </div>
        </div>
        <div className="Card-CTA">
          <i className={"fas fa-chevron-left left-arrow"} />
          <CardCTA dataCopy={dataExcuse} />
          <i
            className={"fas fa-chevron-right right-arrow"}
            onClick={toNext}
          />
        </div>
      </div>
    );
}

export default CardFunny;










