import React, { Component, useState } from "react";
import Aircraft from "./Aircraft"
import styles from "./aircraftlist.module.css";

class AircraftList extends Component {
  constructor(props) {
    super();
    this.state = {
        aircrafts: props.aircrafts
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    var aircrafts = prevState.aircrafts;
    if (nextProps.aircrafts)
        aircrafts = nextProps.aircrafts;
    return {
        aircrafts: aircrafts
    }
  }

  render() {
    const aircrafts = this.state.aircrafts;
    const aircraftElements = [];
    aircraftElements.push(<Aircraft key="header" aircraft="header"/>);
    for(var i=0;i<6;i++){
        if (i < aircrafts.length)
            aircraftElements.push(<Aircraft key={i} aircraft={aircrafts[i]}/>);
        else
        aircraftElements.push(<Aircraft key={i} aircraft={null}/>);
   }
    return (
      <div className={styles.aircraftlist}>
          {aircraftElements}
      </div>
    );
  }
}

export default AircraftList;