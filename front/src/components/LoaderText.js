
import React, { Component } from "react";
import "./LoaderText.css";

class LoaderText extends Component {

  state = {
    text: "des transports"
  }
  
  componentDidMount() {
    const dynamicText = [
      "des transports",
      "de la météo",
      "du traffic"
    ];
    let count = 0;
    const test = () => {
        setTimeout( () => {
          this.setState({
            text: dynamicText[count]
          });
          console.log(dynamicText[count])
        }, 750);
        if (count < dynamicText.length - 1) {
          count = count + 1;
        } else {
          count = 0;
        }
    }
    // Change 
    window.setInterval(test, (2000))
  }

  render() {
    return (
      <div className="loading-text-wrap">
        <p className="text-begin">Analyse</p>
        <p className="text-end">{this.state.text}</p>
      </div>
    );
  }
}

export default LoaderText;