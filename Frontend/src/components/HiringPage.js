import React, { useState } from "react";
import Card from "./Card";
import Form from "./Form";
import "../styles/ApplyPage.css";
import Image from "../assets/Group 133.png";
import { Link } from "react-router-dom";

const HiringPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="landingPage">
        <nav className="nav">
          <div>
            <button className="button2">Login/Signup</button>
          </div>
        </nav>
        <div id="Events_container">
          <div id="Events">
            <div className="events-container">
              <div className="events-grid">
                <Card handleApplyClick={handleApplyClick} />
                <Card handleApplyClick={handleApplyClick} />
                <Card handleApplyClick={handleApplyClick} />
                <Card handleApplyClick={handleApplyClick} />
                <Card handleApplyClick={handleApplyClick} />
                <Card handleApplyClick={handleApplyClick} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <button className="close-btn" onClick={handleCloseForm}>×</button>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringPage;
