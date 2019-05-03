import React, { Component } from "react";

// CSS
import "./App.css";
import "./components/Radio.css";

// Data
import RandomData from "./data/random_excuses";
import FunnyData from "./data/funny_excuses";
// Components
import Button from "./components/Button";
import Radio from "./components/Radio";
import CardComponent from "./components/CardComponent";
import CardFunny from "./components/CardFunny"

// import LoaderText from "./components/LoaderText"

class App extends Component {
  // Declare App states
  state = {
    category: "transport",
    transport_excuse: "",
    // API DATA
    transport_data: [],
    traffic_data: [],
    funny_data: FunnyData,
    // Traffic states
    traffic_time: "",
    traffic_index: 0,
    // Transport states
    transport_logo: "",
    transport_index: 0,
    transport_last_time: "",
    transport_time: "",
    transport_issue: "",
    // Weeather states
    weather_icon: "",
    weather_desc: "",
    // Funny states:
    funny_excuse: "",
    funny_image: ""
  };

  // Request Weather API
  getweatherExcuse_data = () => {
    // Fetch info
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Paris&lang=fr&units=metric&appid=f3c5761a4b0770555f6e829dd7c70ac5"
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ weather_icon: this.getIcon(res.weather[0].icon) });
        this.setState({ weather_desc: res.weather[0].description });
      });
  };

  // Get Icon from weather API
  getIcon(icon) {
    return `//openweathermap.org/img/w/${icon}.png`;
  }

  componentDidMount() {
    fetch("/api/transport")
      .then(response => response.json())
      .then(data => {
        this.setState({
          transport_data: data
        });
      });
    this.getweatherExcuse_data();
    //Traffic data
    let trafficData = [];

    //Fetch traffic API
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "http://dev.virtualearth.net/REST/v1/Traffic/Incidents/48.799206,2.257003,48.911702,2.427980?key=AkmwWft6jf42P1wcoVkMwpvQ3t2k1eiXe-YNTjC--9CgwR1Jd1F60UovK6VLVNDF";
    fetch(proxyurl + url)
      .then(response => response.json())
      .then(response => {
        // Sort newest to oldest
        const compare = (a, b) => {
          if (a.lastModified > b.lastModified) return -1;
          if (a.lastModified < b.lastModified) return 1;
          return 0;
        };
        response.resourceSets[0].resources.sort(compare);

        //Map & formated time
        response.resourceSets[0].resources.map(item => {
          const formatedDate = Number(item.lastModified.slice(6, -2));

          //Push of traffic data
          trafficData.push({
            date: formatedDate,
            cause: item.description
          });

          //State of traffic data
          this.setState({
            traffic_data: trafficData,
          });
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

    const leftArrowTransport = document.querySelector(".Transport .left-arrow");
    const leftArrowTraffic = document.querySelector(".Traffic .left-arrow");

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
      switch (this.state.category) {
        case "transport":
          buttonT.style.animation = "none";
          break;
        case "funny":
          buttonF.style.animation = "none";
          break;

        default:
          console.log("test");
      }
      cards.style.display = "flex";
      home.style.display = "none";

      // Stops loading animation
      loader.style.animation = "none";

      leftArrowTransport.classList.add("inactive");
      leftArrowTraffic.classList.add("inactive");
      // 
      document.querySelector(".Meteo .right-arrow").style.visibility = "hidden";
      document.querySelector(".Meteo .left-arrow").style.visibility = "hidden";

      switch (this.state.category) {
        case "transport":
        // Display the serious cards and hide funny one
          document.querySelector(".Meteo").style.display = "block"
          document.querySelector(".Transport").style.display = "block"
          document.querySelector(".Traffic").style.display = "block"
          document.querySelector(".Insolite").style.display = "none"
        // Set States
          this.setState({
            // Set transport states
            transport_excuse:
              "Désolé je vais être en retard, il y a " +
              this.state.transport_data[0].issueText +
              " sur la " +
              this.state.transport_data[0].line.name +
              " à cause " +
              this.state.transport_data[0].cause,
            transport_logo: this.state.transport_data[0].line.image,
            transport_last_time: this.state.transport_data[0].last_time,
            transport_time: this.state.transport_data[0].time,
            transport_issue: this.state.transport_data[0].issue,
            // Set traffic states
            traffic_time: this.state.traffic_data[0].date,
            traffic_issue: this.state.traffic_data[0].cause
          });

          // Set state for weather 
          const weatherDescription = this.state.weather_desc;

          if (weatherDescription.includes("pluie")) {
            this.setState({
              weather_excuse: "Il pleut trop pour travailler"
            });
          } else if (weatherDescription.includes("neige")) {
            this.setState({ weather_excuse: "Il neige batard!" });
          } else if (weatherDescription.includes("nuage")) {
            this.setState({ weather_excuse: "Je déteste les nuages" });
          } else if (weatherDescription.includes("orages")) {
            this.setState({ weather_excuse: "Je déteste les orages" });
          } else if (weatherDescription.includes("brouillard ")) {
            this.setState({ weather_excuse: "Je déteste le brouillard " });
          } else if (weatherDescription.includes("  bruine")) {
            this.setState({ weather_excuse: "Je déteste la bruine" });
          } else if (weatherDescription.includes("grésil")) {
            this.setState({ weather_excuse: "Je déteste le grésil " });
          } else if (weatherDescription.includes("brume ")) {
            this.setState({ weather_excuse: "Je déteste le brume " });
          } else if (weatherDescription.includes("tornade  ")) {
            this.setState({ weather_excuse: "Je déteste les tornades " });
          } else if (weatherDescription.includes("ouragan ")) {
            this.setState({ weather_excuse: "Je déteste les ouragans " });
          } else if (weatherDescription.includes("venteux ")) {
            this.setState({ weather_excuse: "Je déteste le vent  " });
          } else if (weatherDescription.includes("grêle ")) {
            this.setState({ weather_excuse: "Je déteste le grêle " });
          } else if (weatherDescription.includes("ciel ")) {
            this.setState({
              weather_excuse: "tu n'as aucune exuse fréro "
            });
          }
          break;

        case "funny":
          // Display the funny card and hide serious ones
          document.querySelector(".Meteo").style.display = "none"
          document.querySelector(".Transport").style.display = "none"
          document.querySelector(".Traffic").style.display = "none"
          document.querySelector(".Insolite").style.display = "block"
          // hide left arrow wg
          document.querySelector(".Insolite .left-arrow").style.visibility = "hidden";
          // Function that randomize index in data
          const randomize = data =>
            Math.floor(Math.random() * data.length);
          // Declare empty variable that will store randomized index
          let idRandomzized;
          idRandomzized = randomize(this.state.funny_data);
          // Update excuse state with randomized index
          this.setState({
            funny_excuse: this.state.funny_data[idRandomzized].excuse,
            funny_image: this.state.funny_data[idRandomzized].image
          });
          break;

        default:
          console.log("test");
      }
    }, 2400);
  };

  toNextCard = (e) => {
    if (this.state.category === "funny") {
      // Function that randomize index in data
      const randomize = data => Math.floor(Math.random() * data.length);
      // Declare empty variable that will store randomized index
      let idRandomzized;
      idRandomzized = randomize(this.state.funny_data);
      // Update excuse state with randomized index
      this.setState({
        funny_excuse: this.state.funny_data[idRandomzized].excuse,
        funny_image: this.state.funny_data[idRandomzized].image
      });
    } else {
      const leftArrowTransport = document.querySelector(".Transport .left-arrow");
      const rightArrowTransport = document.querySelector(".Transport .right-arrow");
      const leftArrowTraffic = document.querySelector(".Traffic .left-arrow");
      const rightArrowTraffic = document.querySelector(".Traffic .right-arrow");
      // Set different states depending on cards arrow click
      switch(e.target){
        case rightArrowTransport:
        if (this.state.transport_index < this.state.transport_data.length - 1) {
          // Removes inactive style on left arrow
          leftArrowTransport.classList.remove("inactive");
  
          // Add inactive style on right arrow
          // We have to length -2 instead of -1 because the index state is not updated yet at the moment the user clicks
          if (this.state.transport_index === this.state.transport_data.length - 2) {
            rightArrowTransport.classList.add("inactive");
          }
  
          // Updating card info relatively to the previous card info by adding 1 on index
          this.setState(prevState => ({
            transport_index: prevState.transport_index + 1,
            transport_excuse:
              "Désolé je vais être en retard, il y a " +
              this.state.transport_data[prevState.transport_index + 1].issueText +
              " sur la " +
              this.state.transport_data[prevState.transport_index + 1].line.name +
              " à cause " +
              this.state.transport_data[prevState.transport_index + 1].cause,
            transport_logo: this.state.transport_data[
              prevState.transport_index + 1
            ].line.image,
            transport_last_time: this.state.transport_data[
              prevState.transport_index + 1
            ].last_time,
            transport_time: this.state.transport_data[
              prevState.transport_index + 1
            ].time,
            transport_issue: this.state.transport_data[
              prevState.transport_index + 1
            ].issue,
            // traffic_issue: this.state.traffic_data[prevState.transport_index + 1].cause,
            // traffic_time: this.state.traffic_data[prevState.transport_index + 1].date
          }));
        }
        break;
        case rightArrowTraffic:
        if (this.state.traffic_index < this.state.traffic_data.length - 1) {
          // Removes inactive style on left arrow
          leftArrowTraffic.classList.remove("inactive");
  
          // Add inactive style on right arrow
          // We have to length -2 instead of -1 because the index state is not updated yet at the moment the user clicks
          if (this.state.traffic_index === this.state.traffic_data.length - 2) {
            rightArrowTraffic.classList.add("inactive");
          }
  
          // Updating card info relatively to the previous card info by adding 1 on index
          this.setState(prevState => ({
            traffic_index: prevState.traffic_index + 1,
            traffic_issue: this.state.traffic_data[prevState.traffic_index + 1].cause,
            traffic_time: this.state.traffic_data[prevState.traffic_index + 1].date
          }));
          console.log(this.state.traffic_index);
        }
        break;
        default:
        alert("problem")
      }
      
    }
  };

  toPreviousCard = (e) => {
    const leftArrowTransport = document.querySelector(".Transport .left-arrow");
    const rightArrowTransport = document.querySelector(".Transport .right-arrow");
    const leftArrowTraffic = document.querySelector(".Traffic .left-arrow");
    const rightArrowTraffic = document.querySelector(".Traffic .right-arrow");
    switch(e.target) {
      case leftArrowTransport:
      if (this.state.transport_index > 0) {
        // Removes inactive style on right arrow
        rightArrowTransport.classList.remove("inactive");
          rightArrowTraffic.classList.remove("inactive");
  
        // Adds inactive style on right arrow
        // We have to use the index 1 instead of 0 because the index state is not updated yet at the moment the user clicks
        if (this.state.transport_index === 1) {
          leftArrowTransport.classList.add("inactive");
          leftArrowTraffic.classList.add("inactive");
        }
        // Updating card info relatively to the previous card info by substracting 1 on index
        this.setState(prevState => ({
          transport_index: prevState.transport_index - 1,
          transport_excuse:
            "Désolé je vais être en retard, il y a " +
            this.state.transport_data[prevState.transport_index - 1].issueText +
            " sur la " +
            this.state.transport_data[prevState.transport_index - 1].line.name +
            " à cause " +
            this.state.transport_data[prevState.transport_index - 1].cause,
          transport_logo: this.state.transport_data[prevState.transport_index - 1]
            .line.image,
          transport_last_time: this.state.transport_data[
            prevState.transport_index - 1
          ].last_time,
          transport_time: this.state.transport_data[prevState.transport_index - 1]
            .time,
          transport_issue: this.state.transport_data[
            prevState.transport_index - 1
          ].issue
        }));
      }
      break;
      case leftArrowTraffic:
      if (this.state.traffic_index > 0) {
        // Removes inactive style on right arrow
          rightArrowTraffic.classList.remove("inactive");
  
        // Adds inactive style on right arrow
        // We have to use the index 1 instead of 0 because the index state is not updated yet at the moment the user clicks
        if (this.state.traffic_index === 1) {
          leftArrowTraffic.classList.add("inactive");
        }
  
        // Updating card info relatively to the previous card info by substracting 1 on index
        this.setState(prevState => ({
          traffic_index: prevState.traffic_index - 1,
          traffic_issue: this.state.traffic_data[prevState.traffic_index- 1].cause,
          traffic_time: this.state.traffic_data[prevState.traffic_index - 1].date
        }));
      }
      break;
      default:
      alert("problem");
    }
  };

  goBack = () => {
    const cards = document.querySelector(".Cards");
    const home = document.querySelector(".Home");
    // All Arrows
    const allLeftArrows = document.querySelectorAll(".left-arrow");
    const allRightArrows = document.querySelectorAll(".right-arrow");

    // Resets Arrows inactive display
    for (let i = 0; i < allLeftArrows.length; i++) {
      allLeftArrows[i].classList.remove("inactive");
      allRightArrows[i].classList.remove("inactive");
    }

    cards.style.display = "none";
    home.style.display = "flex";
  };

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
            <button className="back-btn" onClick={this.goBack}>
              <i className="fas fa-arrow-left back-logo" />
              Retour
            </button>
            <CardComponent
              dataTitle={"Transport"}
              titleImage={"https://image.flaticon.com/icons/svg/1185/1185517.svg"}
              dataExcuse={this.state.transport_excuse}
              dataLogo={this.state.transport_logo}
              dataLastTime={this.state.transport_last_time}
              dataIssue={"Problème: " + this.state.transport_issue}
              toPrevious={this.toPreviousCard}
              toNext={this.toNextCard}
              details="Détail de l'incident"
            />
            <CardComponent
              dataTitle={"Meteo"}
              titleImage={"https://image.flaticon.com/icons/svg/1146/1146868.svg"}
              dataExcuse={this.state.weather_excuse}
              dataLogo={this.state.weather_icon}
              dataIssue={this.state.weather_desc}
              toPrevious={this.toPreviousCard}
              toNext={this.toNextCard}
            />
            <CardComponent
              dataTitle={"Traffic"}
              titleImage={"https://image.flaticon.com/icons/svg/1683/1683859.svg"}
              dataExcuse={"J'étais bloqué dans le traffic"}
              dataIssue={this.state.traffic_issue}
              time={this.state.traffic_time}
              toPrevious={this.toPreviousCard}
              toNext={this.toNextCard}
            />
            <CardFunny
              // Data
              dataTitle={"Insolite"}
              titleImage={
                "https://image.flaticon.com/icons/svg/1185/1185517.svg"
              }
              dataExcuse={this.state.funny_excuse}
              dataLogo={this.state.funny_image}
              // Functionnalities
              goBack={this.goBack}
              toNext={this.toNextCard}
              toPrevious={this.toPreviousCard}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
