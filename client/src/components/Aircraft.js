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
                <span style={{flex: 45}} className={styles.headerBox}>
                    <div className={styles.nameContainer}>
                        <span>Name</span>
                        <span style={{paddingRight: "1vh"}}>Load</span>
                    </div>
                </span>
                <span style={{flex: 20}} className={styles.headerBox}>Load Zone</span>
                <span style={{flex: 12}} className={styles.headerBox}></span>
                <span style={{flex: 7}} className={styles.headerBox}>Call</span>
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
        var CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "white"}} className={styles.box}></span>;
        if (aircraft.CallState == "10 Mins")
        CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "#E01C0B"}} className={styles.box}>{aircraft.CallState}</span>;
        else if (aircraft.CallState == "5 Mins")
            CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "#FFFF00"}} className={styles.box}>{aircraft.CallState}</span>;
        else if (aircraft.CallState == "Now")
            CallState = <span style={{flex: 12, fontSize: "4vh", backgroundColor: "#7CFC00"}} className={styles.box}>{aircraft.CallState}</span>;
        var Timer = <span style={{flex: 7, fontSize: "7vh"}} className={styles.box}>{aircraft.Call}</span>;
        if (aircraft.Call == "00" && !aircraft.CallState)
            Timer = <span style={{flex: 7, fontSize: "7vh", color: "#708090", backgroundColor: "#D3D3D3"}} className={styles.box}>{aircraft.Call}</span>;
        return (
            <div className={styles.container}>
                <span style={{flex: 45, fontSize: "7vh"}} className={styles.box}>
                    <div className={styles.nameContainer}>
                        <span>{aircraft.Name}</span>
                        <span>{aircraft.LoadNumber}</span>
                    </div>
                </span>
                <span style={{flex: 20}} className={styles.box}>
                    {loadZoneImg}   
                </span>
                {CallState}
                {Timer}
            </div>
        );
    }
  }
}

export default Aircraft;