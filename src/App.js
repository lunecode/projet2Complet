import React, { Component } from 'react';
import './App.css';

import RandomData from './data/random_excuses';
import TransportData from './data/transport_excuses'
import Excuse from './components/Excuse'
import Button from './components/Button'
import Loader from './components/Loader'

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
    const loader = document.querySelector('.box')
    loader.style.animation = 'sca 1s ease-out forwards'
    setTimeout(() => {
      loader.style.animation = 'none'
      // Function that randomize index in data
      const randomize = (data) => Math.floor(Math.random() * data.length);
      // Declare empty variable that will store randomized index
      let idRandomzized;
      const disruptedTransportData = TransportData.filter(data => data.disruption !== false)
      switch (this.state.category) {
        case "transport":
          idRandomzized = randomize(disruptedTransportData);
          // Update excuse state with randomized index
          this.setState({
            excuse: "Désolé patron il y a " + disruptedTransportData[idRandomzized].excuse + " sur la ligne " + disruptedTransportData[idRandomzized].name
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

      , 1500)

  }

  render() {
    // console.table(RandomData[0].serious)
    // console.table(RandomData[1].funny)
    // console.table(TransportData)
    return (
      <div className='Layout'>
        <h2>Choissisez une catégorie d'excuse</h2>
        <div>
          <div className='Radio-group'>
            <input type="radio" id="transport" name="drone" value="transports"
              defaultChecked="checked"
              onChange={this.changeCategory}>
            </input>
            <label htmlFor="transport">Transports</label>

            <input type="radio" id="serious" name="drone" value="serious" 
            onChange={this.changeCategory}>
            </input>
            <label htmlFor="serious">Sérieux</label>

            <input type="radio" id="funny" name="drone" value="funny" 
            onChange={this.changeCategory}>
            </input>
            <label htmlFor="funny">Insolite</label>
          </div>
        </div>
        <div className='interaction'>
          <Button fonction={this.displayRandomExcuse} />
          <Loader />
        </div>
        <Excuse excuse={this.state.excuse}/> 
      </div>
    );
  }
}






export default App;
