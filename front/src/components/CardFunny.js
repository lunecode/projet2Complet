import React from "react";
import "./CardFunny.css";
import "./CardComponent.css";
import CardCTA from './CardCTA';
import{FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

  const CardFunny = ({dataExcuse, dataLogo, dataTitle, dataTime, dataLastTime, dataIssue, toPrevious, toNext, goBack, details}) => {

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
        <div className="container-DetailsAlert">
        <div>
          <div >
            <img src={dataLogo} alt="train line logo" className="meme"/>
          </div>
         {/* <Moment fromNow ago locale="fr"><p>{this.props.time}</p></Moment> */}
        </div>
      </div>
        <div className="frame">
          <div className="excuse">
            <div className="excuse-scroll">"{dataExcuse}"</div>
          </div>
        </div>
        <ul>
            <li>
              <FacebookShareButton
              url={dataLogo}
              quote={dataExcuse}
              hashtag="#SorryBossImLate">
                <FacebookIcon size={50}/>
              </FacebookShareButton> 
            </li>
            <li>
              <TwitterShareButton
                url={dataLogo}
                title={dataExcuse}
                 >
                <TwitterIcon size={50}/>
              </TwitterShareButton>
            </li>
          </ul>
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










