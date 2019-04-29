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
import CardComponent from "./components/CardComponent";
import LoaderText from "./components/LoaderText"

class App extends Component {
  // Declare App states
  state = {
    category: "transport",
    excuse: "",
    transport_data: [],
    transport_logo: "",
    transport_index: 0,
    transport_last_time: "",
    transport_time: "",
    transport_issue: ""
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
    const frame = document.querySelector(".CardComponent");

    const leftArrow = document.querySelector(".left-arrow");

    const home = document.querySelector(".Home");
    const cards = document.querySelector(".Cards");

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
      cards.style.display = "flex";
      home.style.display = "none";
      
      // Stops loading animation
      loader.style.animation = "none";

      leftArrow.classList.add("inactive")

      switch (this.state.category) {
        case "transport":
          this.setState({
            excuse: "Désolé je vais être en retard, il y a " + this.state.transport_data[0].issueText + " sur la " + this.state.transport_data[0].line.name + " à cause " + this.state.transport_data[0].cause,
            transport_logo: this.state.transport_data[0].line.image,
            transport_last_time: this.state.transport_data[0].last_time,
            transport_time: this.state.transport_data[0].time,
            transport_issue: this.state.transport_data[0].issue
          })
          break;
  
        case "funny":
            // Function that randomize index in data
          const randomize = (data) => Math.floor(Math.random() * data.length);
          // Declare empty variable that will store randomized index
          let idRandomzized;
          idRandomzized = randomize(RandomData[1].funny);
          // Update excuse state with randomized index
          this.setState({
            excuse: RandomData[1].funny[idRandomzized].excuse
          })
          break;
  
        default:
          console.log("test");
      }

    }, 2400);
  };

  toNextCard = () => {

    if (this.state.category === "funny") {
        // Function that randomize index in data
      const randomize = (data) => Math.floor(Math.random() * data.length);
      // Declare empty variable that will store randomized index
      let idRandomzized;
      idRandomzized = randomize(RandomData[1].funny);
      // Update excuse state with randomized index
      this.setState({
        excuse: RandomData[1].funny[idRandomzized].excuse
      })
    } else {
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
          excuse: "Désolé je vais être en retard, il y a " + this.state.transport_data[prevState.transport_index + 1].issueText + " sur la " + this.state.transport_data[prevState.transport_index + 1].line.name + " à cause " + this.state.transport_data[prevState.transport_index + 1].cause,
          transport_logo: this.state.transport_data[prevState.transport_index + 1].line.image,
          transport_last_time: this.state.transport_data[prevState.transport_index + 1].last_time,
          transport_time: this.state.transport_data[prevState.transport_index + 1].time,
          transport_issue: this.state.transport_data[prevState.transport_index + 1].issue
          }))
          console.log(this.state.transport_index)
      } 
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
        excuse: "Désolé je vais être en retard, il y a " + this.state.transport_data[prevState.transport_index - 1].issueText + " sur la " + this.state.transport_data[prevState.transport_index - 1].line.name + " à cause " + this.state.transport_data[prevState.transport_index - 1].cause,
        transport_logo: this.state.transport_data[prevState.transport_index - 1].line.image,
        transport_last_time: this.state.transport_data[prevState.transport_index - 1].last_time,
        transport_time: this.state.transport_data[prevState.transport_index - 1].time,
        transport_issue: this.state.transport_data[prevState.transport_index - 1].issue
        }))
    }
  }

  render() {

    const modifyBackground = "background " + this.state.category;
    
    return (
      <div className={modifyBackground}>
        <div className="Layout">
          <div className="Home">
            <Button
              fonction={this.displayRandomExcuse}
              category={this.state.category}
            />
            {/* <LoaderText /> */}
            <Radio func={this.changeCategory} />
          </div>
          <div className="Cards">
            <CardComponent
              dataTitle={this.state.category.toUpperCase()}
              dataExcuse={this.state.excuse}
              dataLogo={this.state.transport_logo}
              dataLastTime={this.state.transport_last_time}
              dataTime={this.state.transport_time}
              dataIssue={this.state.transport_issue}
              toPrevious={this.toPreviousCard}
              toNext={this.toNextCard}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
