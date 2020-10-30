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
                        <span>Aircraft</span>
                        <span style={{paddingRight: "1vh"}}>Load</span>
                    </div>
                </span>
                <span style={{flex: 20}} className={styles.headerBox}>Loading Area</span>
                <span style={{flex: 12}} className={styles.headerBox}></span>
                <span style={{flex: 10}} className={styles.headerBox}>Call</span>
            </div>
        )
    }
    else {
        var loadZoneImg = <span style={{flex: 20, backgroundColor: "#00000000"}} className={styles.box}></span>;
        if (aircraft.LoadingAt == "North") {
            loadZoneImg = <span style={{flex: 20, backgroundColor: "#FFFFFF"}} className={styles.box}><img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={North} alt="North" /></span>;
        }
        else if (aircraft.LoadingAt == "South") {
            loadZoneImg = <span style={{flex: 20, backgroundColor: "#FFFFFF"}} className={styles.box}><img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={South} alt="South" /></span>;
        }
        else if (aircraft.LoadingAt == "Military") {
            loadZoneImg = <span style={{flex: 20, backgroundColor: "#FFFFFF"}} className={styles.box}><img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={Military} alt="Military" /></span>;
        }
        var CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "#00000000"}} className={styles.box}></span>;
        if (aircraft.CallState == "10 Min")
        CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "#E01C0B"}} className={styles.box}>{aircraft.CallState}</span>;
        else if (aircraft.CallState == "5 Min")
            CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "#FFFF00"}} className={styles.box}>{aircraft.CallState}</span>;
        else if (aircraft.CallState == "Now")
            CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "#7CFC00"}} className={styles.box}>{aircraft.CallState}</span>;
        var Timer = <span style={{flex: 10, fontSize: "10vh"}} className={styles.timer}><span style={{marginBottom: "1vh", marginRight: "1.3vh"}}>{aircraft.Call}</span></span>;
        if (aircraft.Call == "00" && !aircraft.CallState)
            Timer = <span style={{flex: 10, fontSize: "10vh", color: "#708090", backgroundColor: "#D3D3D3", border: ".75vh solid #708090"}} className={styles.timer}><span style={{marginBottom: "1vh", marginRight: "1.3vh"}}>{aircraft.Call}</span></span>;
        return (
            <div className={styles.container}>
                <span style={{flex: 40, fontSize: "7vh"}} className={styles.box}>
                    <div className={styles.nameContainer}>
                        <span>{aircraft.Name}</span>
                        <span>{aircraft.LoadNumber}</span>
                    </div>
                </span>
                {loadZoneImg}
                {CallState}
                {Timer}
            </div>
        );
    }
  }
}

export default Aircraft;