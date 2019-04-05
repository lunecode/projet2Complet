import React, { Component } from 'react';
import './App.css';

import RandomData from './data/random_excuses';
import TransportData from './data/transport_excuses'
import Excuse from './components/Excuse'

class App extends Component {

  // Declare App states
  state = {
    category: "transport",
    excuse: "",
  }

  // Change excuses category
  changeCategory = (event) => {
    this.setState({
      category: event.target.id,
    })
  }

  // Display random
  displayRandomExcuse = () => {
    // Function that randomize index in data
    const randomize = (data) => Math.floor(Math.random() * data.length);
    // Declare empty variable that will store randomized index
    let idRandomzized;
    const disruptedTransportData = TransportData.filter(data => data.disruption !== false)
    switch(this.state.category) {
      case "transport":
        idRandomzized = randomize(disruptedTransportData);
        // Update excuse state with randomized index
        this.setState({
          excuse: "Désolé patron il y a eu " + disruptedTransportData[idRandomzized].excuse + " sur la ligne " + disruptedTransportData[idRandomzized].name
        })
        break;
      case "serious":
        idRandomzized = randomize(RandomData[0].serious);
        // Update excuse state with randomized index
        this.setState({
          excuse: RandomData[0].serious[idRandomzized].excuse
        })
        break;
      case "funny":
        idRandomzized = randomize(RandomData[1].funny);
        // Update excuse state with randomized index
        this.setState({
          excuse: RandomData[1].funny[idRandomzized].excuse
        })
        break;
      default:
        console.log("VA BOSSER")
    }
  }

  render() {
    // console.table(RandomData[0].serious)
    // console.table(RandomData[1].funny)
    // console.table(TransportData)
    return (
      <div className="Layout">
        <h1>Choissisez une catégorie d'excuse</h1>
        <div className="Categories">
          <input type="radio" id="transport" name="drone" value="transports"
            defaultChecked="checked"
            onChange={this.changeCategory}>
          </input>
          <label htmlFor="transport">Transports</label>

          <input type="radio" id="serious" name="drone" value="serious" 
          onChange={this.changeCategory}>
          </input>
          <label htmlFor="serious">Sérieuses</label>

          <input type="radio" id="funny" name="drone" value="funny" 
          onChange={this.changeCategory}>
          </input>
          <label htmlFor="funny">Insolites</label>

        </div>
        <div>
          <button type="button" onClick={this.displayRandomExcuse}>Valider</button>
        </div>
        <Excuse excuse={this.state.excuse}/> 
      </div>
    );
  }
}

export default App;
