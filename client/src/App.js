import axios from "axios";
import React, { Component, useState } from "react";
import AircraftList from "./components/AircraftList";
import * as io from "socket.io-client";
import './App.css';
import WeatherHold from './img/WeatherHoldRight.png';
import WindHold from './img/WindHoldRight.png';

const ENDPOINT = "http://localhost:5000";
const socket = io();

class App extends Component {
  constructor(props) {
    super();
    this.state = {
        flightInfo: {}
    }
  }

  componentDidMount () {
    axios
    .get("/api/flight-info", {})
    .then(res => {
        this.setState({flightInfo: res.data});
    })
    .catch(err =>
      console.log(err)
    );
    
    socket.on('update-flights', (data)=> {
      this.setState({flightInfo: data});
    });
  }

  componentWillUnmount () {
    socket.off('update-flights');
  }

  render() {
    var aircrafts = [];
    var weather;
    var time;
    if (this.state.flightInfo.ManifestPost) {
      if (this.state.flightInfo.ManifestPost.Aircraft && 
        this.state.flightInfo.ManifestPost.Aircraft.LoadTimer) 
        aircrafts = this.state.flightInfo.ManifestPost.Aircraft.LoadTimer;

      if (this.state.flightInfo.ManifestPost.WeatherState == "Blue Skies") {
        weather = <span className="WeatherContainer">
              <div>Uppers <span style={{color: "#7CFC00"}}>{this.state.flightInfo.ManifestPost.UpperReport}</span></div>
              <div>Jump run <span style={{color: "#7CFC00"}}>{this.state.flightInfo.ManifestPost.JumpRunReport}</span></div>
              <div><span style={{color: "#7CFC00"}}>{this.state.flightInfo.ManifestPost.SeparationReport}</span> seconds between groups</div>
            </span>
      }
      else if (this.state.flightInfo.ManifestPost.WeatherState == "Wind Hold") {
        weather = <span className="WeatherContainer"><img style={{maxWidth: "100%", maxHeight: "100%"}} src={WindHold} alt="WindHold" /></span>
      }
      else if (this.state.flightInfo.ManifestPost.WeatherState == "Weather Hold") {
        weather = <span className="WeatherContainer"><img style={{maxWidth: "100%", maxHeight: "100%"}} src={WeatherHold} alt="WeatherHold" /></span>
      }
      else if (this.state.flightInfo.ManifestPost.WeatherState == "Non-Licensed Jumper Wind Hold") {
        weather = <span className="WeatherContainer">
              <div>Uppers <span style={{color: "#7CFC00"}}>{this.state.flightInfo.ManifestPost.UpperReport}</span></div>
              <div>Jump run <span style={{color: "#7CFC00"}}>{this.state.flightInfo.ManifestPost.JumpRunReport}</span></div>
              <div><span style={{color: "#7CFC00"}}>{this.state.flightInfo.ManifestPost.SeparationReport}</span> seconds between groups</div>
              <div><span style={{color: "#E01C0B"}}>Non-Licensed Jumper Wind Hold</span></div>
            </span>
      }
      
      if (this.state.flightInfo.ManifestPost.Timestamp != null) {
        var timeVal = new Date(this.state.flightInfo.ManifestPost.Timestamp);
        var hr = timeVal.getHours();
        var min = timeVal.getMinutes();
        if (min < 10) {
          min = "0" + min;
        }
        var ampm = "AM";
        if( hr > 12 ) {
            hr -= 12;
            ampm = "PM";
}
        time = <span className="TimeContainer"><span><span style={{fontSize: "10vmin"}}>{hr}:{min}</span><span style={{fontSize: "4vmin", color: "#4070EF"}}> {ampm}</span></span></span>;
      }
    }
    return (
      <div className="App">
          <div className="AircraftListContainer"><AircraftList aircrafts={aircrafts}/></div>
          <div className="FooterContainer">
            {time}
            {weather}
          </div>
      </div>
    );
  }
}

export default App;
