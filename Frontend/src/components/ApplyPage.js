import React from "react";
import Card from "./Card";
import "../styles/ApplyPage.css";
// import Form from "./Form";
import Image from "../assets/Group 133.png";
import { Link } from "react-router-dom";
const HiringPage = () => {
  return (
    <div>
      <div className="landingPage">
        <nav className="nav">
          <div>
            <button class="button2">Login/Signup</button>
          </div>
        </nav>
        <div id="Events_container">
          <div id="Events">
            <div className="events-container">
              <div className="events-grid">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>   
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringPage;
