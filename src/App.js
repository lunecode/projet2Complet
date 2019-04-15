import React, { Component } from 'react';

// CSS
import './App.css';

// Data
import RandomData from './data/random_excuses';
import TransportData from './data/transport_excuses'

// Components
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

  displayRandomExcuse = () => {

    // Loading animation
    const loader = document.querySelector('.box')
    loader.style.animation = 'sca 1s ease-out forwards'

    // Set a timer before displaying the excuse
    setTimeout(() => {
      
      // Stops loading animation
      loader.style.animation = 'none'
      // Function that randomize index in data
      const randomize = (data) => Math.floor(Math.random() * data.length);
      // Filter data for transport disruptions
      const disruptedTransportData = TransportData.filter(data => data.disruption !== false)
      let idRandomzized;

      // Get excuse data depending on category selected
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
          this.setState({
            excuse: RandomData[0].serious[idRandomzized].excuse
          })
          break;

        case "funny":
          idRandomzized = randomize(RandomData[1].funny);
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
        </div>
        <Excuse excuse={this.state.excuse} />
      </div>
    );
  }
}






export default App;
