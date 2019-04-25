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

      this.setState({
        excuse_transport: "Désolé je vais être en retard, il y a " + this.state.transport_data[0].issue + " sur le " + this.state.transport_data[0].line.name + " à cause " + this.state.transport_data[0].cause,
        transport_logo: this.state.transport_data[0].line.image
      })

    }, 2400);
  };

  toNext = () => {
    if (this.state.transport_index < this.state.transport_data.length - 1) {
      // Removes inactive style on left arrow
      document.querySelector(".left-arrow").classList.remove("inactive")

      this.setState(prevState => ({
        transport_index: prevState.transport_index + 1,
        excuse_transport: "Désolé je vais être en retard, il y a " + this.state.transport_data[prevState.transport_index + 1].issue + " sur le " + this.state.transport_data[prevState.transport_index + 1].line.name + " à cause " + this.state.transport_data[prevState.transport_index + 1].cause,
        transport_logo: this.state.transport_data[prevState.transport_index + 1].line.image
        }))

    } else {
      // Add inactive style on right arrow
      document.querySelector(".right-arrow").classList.add("inactive")
    }

  }

  toPrevious = () => {
    if (this.state.transport_index > 0) {
      // Removes inactive style on right arrow
      document.querySelector(".right-arrow").classList.remove("inactive")

      this.setState(prevState => ({
        transport_index: prevState.transport_index - 1,
        excuse_transport: "Désolé je vais être en retard, il y a " + this.state.transport_data[prevState.transport_index - 1].issue + " sur le " + this.state.transport_data[prevState.transport_index - 1].line.name + " à cause " + this.state.transport_data[prevState.transport_index - 1].cause,
        transport_logo: this.state.transport_data[prevState.transport_index - 1].line.image
        }))

    } else {
      // Add inactive style on left arrow
      document.querySelector(".left-arrow").classList.add("inactive")
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
          <DisplayComponent dataExcuse={this.state.excuse_transport} dataLogo={this.state.transport_logo} toPrevious={this.toPrevious} toNext={this.toNext} />
        </div>
      </div>
    );
  }
}

export default App;
