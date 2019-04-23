import React, { Component } from 'react';

// CSS
import './App.css';
import './components/Radio.css'

// Data
import RandomData from './data/random_excuses';
import TransportData from './data/transport_excuses'

// Components
import DetailsAlert from './components/DetailsAlert'
import Button from './components/Button'
import Radio from './components/Radio'
import DisplayComponent from './components/DisplayComponent'

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
    const loader = document.querySelector('.scaling')
    const buttonT = document.querySelector('.button.transport')
    const buttonF = document.querySelector('button.funny')
    const frame = document.querySelector('.DisplayComponent')
    loader.style.animation = 'scaling 2s ease-out forwards'
    

    switch (this.state.category) {

      case "transport":
      buttonT.style.animation = 'opacityButtonT 1.2s ease-in alternate infinite'
      break;

      case "funny":
      buttonF.style.animation = 'opacityButtonF 1.2s ease-in alternate infinite'
    }
    // Set a timer before displaying the excuse
    setTimeout(() => {
      frame.style.display = 'flex'
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
          buttonT.style.animation = 'none'
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
          buttonF.style.animation = 'none'
          idRandomzized = randomize(RandomData[1].funny);
          this.setState({
            excuse: RandomData[1].funny[idRandomzized].excuse
          })
          break;

        default:
          console.log("VA BOSSER")
      }
    }
      , 2400)

  }

  render() {
    const modifyBackground = 'background ' + this.state.category;
    return (
      <div className={modifyBackground}>
        <div className='Layout'>
          <Button fonction={this.displayRandomExcuse} category={this.state.category} />
          <Radio func={this.changeCategory} />
          <DisplayComponent dataExcuse={this.state.excuse}/>
        </div>
      </div>
    );
  }
}



  


export default App;
