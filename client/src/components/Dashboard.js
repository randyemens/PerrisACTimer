import React, { Component, useState } from "react";
import axios from "axios";
import AircraftList from "./AircraftList";

class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
        flightInfo: {}
    }
  }

  componentDidMount () {
    axios
    .get("/flight-info", {})
    .then(res => {
        this.setState({flightInfo: res.data});
    })
    .catch(err =>
      console.log(err)
    );
  }
  render() {
    var aircrafts = [];
    if (this.state.flightInfo.Manifest && this.state.flightInfo.Manifest.Aircraft)
        aircrafts = this.state.flightInfo.Manifest.Aircraft;
    console.log(this.state.flightInfo);
    return (
      <div className="">
          <AircraftList aircrafts={aircrafts}/>
          <div>Weather</div>
      </div>
    );
  }
}

export default Dashboard;