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
    const button = document.querySelector('.button')
    const frame = document.querySelector('.container-DetailsAlert')
    loader.style.animation = 'scaling 2s ease-out forwards'
    button.style.animation = 'opacityButton 1.2s ease-in alternate infinite'
    
    // Set a timer before displaying the excuse
    setTimeout(() => {
      frame.style.display = 'flex'
      // Stops loading animation
      loader.style.animation = 'none'
      button.style.animation = 'none'
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
      , 2400)

  }

  render() {
    const modifyBackground = 'background ' + this.state.category;
    return (
      <div className={modifyBackground}>
        <div className='Layout'>
          <Button fonction={this.displayRandomExcuse} category={this.state.category} />
          <Radio func={this.changeCategory} />
          <DetailsAlert 
            picture="https://pbs.twimg.com/profile_images/755026402475466752/4Fa09qRh_bigger.jpg"            
            details= "Détails de l'incident"
            excuse={this.state.excuse}
            />
        </div>
      </div>
    );
  }
}



  


export default App;
