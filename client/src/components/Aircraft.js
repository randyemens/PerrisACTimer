import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./aircraft.module.css";
import North from '../img/LoadNorthWideSmall.png';
import South from '../img/LoadSouthWideSmall.png';
import Military from '../img/Military.png';

class Aircraft extends Component {
  constructor(props) {
    super();
    this.state = {
        aircraft: props.aircraft
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
        aircraft: nextProps.aircraft
    }
  }

  render() {
    const aircraft = this.state.aircraft;
    if (aircraft == null) {
        return (
            <div className={styles.emptyContainer}></div>
        );
    }
    else if (aircraft == "header") {
        return (
            <div className={styles.header}>
                <span style={{flex: 40}} className={styles.headerBox}>
                    <div className={styles.nameContainer}>
                        <span>Name</span>
                        <span style={{paddingRight: "1vh"}}>Load</span>
                    </div>
                </span>
                <span style={{flex: 20}} className={styles.headerBox}>Load Zone</span>
                <span style={{flex: 18}} className={styles.headerBox}>Call</span>
                <span style={{flex: 7}} className={styles.headerBox}>Timer</span>
            </div>
        )
    }
    else {
        var loadZoneImg = [];
        if (aircraft.LoadingAt == "North") {
            loadZoneImg.push(<img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={North} alt="North" />);
        }
        else if (aircraft.LoadingAt == "South") {
            loadZoneImg.push(<img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={South} alt="South" />);
        }
        else if (aircraft.LoadingAt == "Military") {
            loadZoneImg.push(<img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={Military} alt="Military" />);
        }
        var Call = "Now";
        if (parseInt(aircraft.Call) > 0)
            Call = "5 Mins";
        else if (parseInt(aircraft.Call) > 5)
            Call = "10 Mins";
        else if (parseInt(aircraft.Call) > 10)
            Call = "";
        var Timer = aircraft.Call;
        return (
            <div className={styles.container}>
                <span style={{flex: 40}} className={styles.box}>
                    <div className={styles.nameContainer}>
                        <span>{aircraft.Name}</span>
                        <span>{aircraft.LoadNumber}</span>
                    </div>
                </span>
                <span style={{flex: 20}} className={styles.box}>
                    {loadZoneImg}   
                </span>
                <span style={{flex: 18}} className={styles.box}>{Call}</span>
                <span style={{flex: 7}} className={styles.box}>{Timer}</span>
            </div>
        );
    }
  }
}

export default Aircraft;