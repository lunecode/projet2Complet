import React from "react";
import "./CardFunny.css";

import Excuse from "./Excuse";
import DetailsAlert from "./DetailsAlert";
import CardCTA from './CardCTA'



  const CardFunny = ({dataExcuse, dataLogo, dataTitle, dataTime, dataLastTime, dataIssue, toPrevious, toNext, goBack}) => {
  // Storing card types
  const cardFunny = document.querySelector(".Funny");

    const toNextCard = () => {
      // Logic to display the next card
      const next = cardType => {
        const currentCard = cardType.querySelector(".active");
        const currentIndex = Number(currentCard.getAttribute("data-key"));
        const nextCard = cardType.children[currentIndex + 1];
        // Run code only if we aren't at the last card of the list
        if (currentCard !== cardType.lastChild) {
          // Removes inactive style on left arrow
          currentCard
            .querySelector(".right-arrow")
            .classList.remove("inactive");

          // Removes style of the currend card
          currentCard.classList.remove("active");
          currentCard.style.display = "none";
          // Adds active style to the next card
          nextCard.classList.add("active");
          nextCard.style.display = "flex";

          // Add inactive style on right arrow
          // We have to length -2 instead of -1 because the index state is not updated yet at the moment the user clicks
          if (currentIndex === cardType.children.length - 2) {
            nextCard
              .querySelector(".right-arrow")
              .classList.add("inactive");
            console.log("HIDE");
          }
        }
      };
      next(cardFunny);

    };
  
    const toPreviousCard = () => {

      // Next
      const previous = cardType => {
        const currentCard = cardType.querySelector(".active");
        const currentIndex = Number(currentCard.getAttribute("data-key"));
        const nextCard = cardType.children[currentIndex - 1];

        if (currentCard !== cardType.firstChild) {
          // Removes inactive style on right arrow
          currentCard
            .querySelector(".right-arrow")
            .classList.remove("inactive");

          // Removes style of the currend card
          currentCard.classList.remove("active");
          currentCard.style.display = "none";
          // Add active style to the next card
          nextCard.classList.add("active");
          nextCard.style.display = "flex";

          // Adds inactive style on right arrow
          // We have to use the index 1 instead of 0 because the index state is not updated yet at the moment the user clicks
          if (currentIndex === 1) {
            nextCard.querySelector(".left-arrow").classList.add("inactive");
          }
        }
      };

      previous(cardFunny);

    };


    return (
      <div className="CardWrapper">
        <div className="CardComponent">
          <div className="logoTitleContainer">
            <img
              src="https://image.flaticon.com/icons/svg/725/725107.svg"
              alt="title img"
            />
            <h2>{dataTitle}</h2>
          </div>
          <DetailsAlert
            picture={dataLogo}
            funnyClass="meme"
          />
          <Excuse excuse={dataExcuse} />
          <div className="Card-CTA">
            <i
              className={"fas fa-chevron-left left-arrow"}
              onClick={toPreviousCard}
            />
            <CardCTA dataCopy={dataExcuse} />
            <i
              className={"fas fa-chevron-right right-arrow"}
              onClick={toNextCard}
            />
          </div>
        </div>
      </div>
    );
}

export default CardFunny;










