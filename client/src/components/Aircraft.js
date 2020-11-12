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
        var loadZoneImg = <span className={`${styles.box} ${styles.loadzone} ${styles.clear}`}></span>;
        if (aircraft.LoadingAt == "North") {
            loadZoneImg = <span className={`${styles.box} ${styles.loadzone} ${styles.white}`}><img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={North} alt="North" /></span>;
        }
        else if (aircraft.LoadingAt == "South") {
            loadZoneImg = <span className={`${styles.box} ${styles.loadzone} ${styles.white}`}><img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={South} alt="South" /></span>;
        }
        else if (aircraft.LoadingAt == "Military") {
            loadZoneImg = <span className={`${styles.box} ${styles.loadzone} ${styles.white}`}><img key={aircraft.Name} style={{maxWidth: "100%", maxHeight: "100%"}} src={Military} alt="Military" /></span>;
        }


        var CallState = <span className={`${styles.box} ${styles.callstatecontainer} ${styles.clear}`}></span>;
        if (aircraft.CallState == "10 Min")
            CallState = <span className={`${styles.box} ${styles.callstatecontainer} ${styles.red}`}>
                <svg viewBox="0 0 170 100" className={styles.callstate}>
                    <text textAnchor="middle" x="85" y="67">{aircraft.CallState}</text>
                </svg>
            </span>;
        else if (aircraft.CallState == "5 Min")
            CallState = <span className={`${styles.box} ${styles.callstatecontainer} ${styles.yellow}`}>
                <svg viewBox="0 0 170 100" className={styles.callstate}>
                    <text textAnchor="middle" x="85" y="67">{aircraft.CallState}</text>
                </svg>
            </span>;
        else if (aircraft.CallState == "Now")
            CallState = <span className={`${styles.box} ${styles.callstatecontainer} ${styles.green}`}>
                <svg viewBox="0 0 170 100" className={styles.callstate}>
                    <text textAnchor="middle" x="85" y="67">{aircraft.CallState}</text>
                </svg>
            </span>;
        
        
        var Timer = <span className={styles.timer}>
                <svg viewBox="0 0 145 100" className={styles.call}>
                    <text textAnchor="end" x="128.5" y="84">{aircraft.Call}</text>
                </svg>
            </span>;
        if (aircraft.Call == "00" && !aircraft.CallState)
            Timer = <span className={`${styles.timer} ${styles.zerotimer}`}>
                <svg viewBox="0 0 145 100" className={styles.call}>
                    <text className={styles.graytext} textAnchor="end" x="128.5" y="84">{aircraft.Call}</text>
                </svg>
            </span>;
        
        
            return (
            <div className={styles.container}>
                <span style={{flex: 40, fontSize: "6vmin"}} className={styles.box}>
                    <div className={styles.nameContainer}>
                        <svg viewBox="0 0 100 10" className={styles.name}>
                            <text textAnchor="left" x="2" y="9.5">{aircraft.Name}</text>
                            <text textAnchor="end" x="98" y="9.5">{aircraft.LoadNumber}</text>
                        </svg>
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