import React, { Component } from "react";

// CSS
import "./App.css";
import "./components/Radio.css";

// Data
import RandomData from "./data/random_excuses";
import TransportData from "./data/transport_excuses";

// Components
import DetailsAlert from "./components/DetailsAlert";
import Button from "./components/Button";
import Radio from "./components/Radio";
import DisplayComponent from "./components/DisplayComponent";

class App extends Component {
  // Declare App states
  state = {
    category: "transport",
    excuse_transport: "",
    transport_data: [],
    transport_logo: "",
    transport_index: 0,
  };

  componentDidMount() {
    fetch("/api/transport")
      .then(response => response.json())
      .then(data => {
        this.setState({
          transport_data: data
        });
      });
  }

  // Change excuses category
  changeCategory = event => {
    this.setState({
      category: event.target.id
    });
  };

  displayRandomExcuse = () => {
    // Loading animation
    const loader = document.querySelector(".scaling");
    const buttonT = document.querySelector(".button.transport");
    const buttonF = document.querySelector("button.funny");
    const frame = document.querySelector(".DisplayComponent");
    const leftArrow = document.querySelector(".left-arrow")
    loader.style.animation = "scaling 2s ease-out forwards";

    switch (this.state.category) {
      case "transport":
        buttonT.style.animation =
          "opacityButtonT 1.2s ease-in alternate infinite";
        break;

      case "funny":
        buttonF.style.animation =
          "opacityButtonF 1.2s ease-in alternate infinite";
        break;

      default:
        console.log("test");
    }
    // Set a timer before displaying the excuse
    setTimeout(() => {
      frame.style.display = "flex";
      // Stops loading animation
      loader.style.animation = "none";

      buttonT.style.animation = "none";

      leftArrow.classList.add("inactive")

      this.setState({
        excuse_transport: "Désolé je vais être en retard, il y a " + this.state.transport_data[0].issue + " sur le " + this.state.transport_data[0].line.name + " à cause " + this.state.transport_data[0].cause,
        transport_logo: this.state.transport_data[0].line.image
      })

    }, 2400);
  };

  toNextCard = () => {
    const leftArrow = document.querySelector(".left-arrow")
    const rightArrow = document.querySelector(".right-arrow")
    
    if (this.state.transport_index < this.state.transport_data.length - 1) {
      // Removes inactive style on left arrow
      leftArrow.classList.remove("inactive")

      // Add inactive style on right arrow
      // We have to length -2 instead of -1 because the index state is not updated yet at the moment the user clicks
      if (this.state.transport_index === this.state.transport_data.length - 2) {
        rightArrow.classList.add("inactive")
      }

      // Updating card info relatively to the previous card info by adding 1 on index
      this.setState(prevState => ({
        transport_index: prevState.transport_index + 1,
        excuse_transport: "Désolé je vais être en retard, il y a " + this.state.transport_data[prevState.transport_index + 1].issue + " sur le " + this.state.transport_data[prevState.transport_index + 1].line.name + " à cause " + this.state.transport_data[prevState.transport_index + 1].cause,
        transport_logo: this.state.transport_data[prevState.transport_index + 1].line.image
        }))
        console.log(this.state.transport_index)
    } 

  }

  toPreviousCard = () => {
    const leftArrow = document.querySelector(".left-arrow")
    const rightArrow = document.querySelector(".right-arrow")

    if (this.state.transport_index > 0) {
      // Removes inactive style on right arrow
      rightArrow.classList.remove("inactive")

      // Adds inactive style on right arrow
      // We have to use the index 1 instead of 0 because the index state is not updated yet at the moment the user clicks
      if (this.state.transport_index === 1) {
        leftArrow.classList.add("inactive")
      }

      // Updating card info relatively to the previous card info by substracting 1 on index
      this.setState(prevState => ({
        transport_index: prevState.transport_index - 1,
        excuse_transport: "Désolé je vais être en retard, il y a " + this.state.transport_data[prevState.transport_index - 1].issue + " sur le " + this.state.transport_data[prevState.transport_index - 1].line.name + " à cause " + this.state.transport_data[prevState.transport_index - 1].cause,
        transport_logo: this.state.transport_data[prevState.transport_index - 1].line.image
        }))
    }
  }

  render() {

    const modifyBackground = "background " + this.state.category;
    
    return (
      <div className={modifyBackground}>
        <div className="Layout">
          <Button
            fonction={this.displayRandomExcuse}
            category={this.state.category}
          />
          <Radio func={this.changeCategory} />
          <DisplayComponent dataExcuse={this.state.excuse_transport} dataLogo={this.state.transport_logo} toPrevious={this.toPreviousCard} toNext={this.toNextCard}/>
        </div>
      </div>
    );
  }
}

export default App;
