import React, { useState } from "react";
import "../styles/Card.css";
import Form from "./Form";
import Image from "../assets/image 1.png";

export default function Card({ title, description, requirements, salary, deadline }) {
  const [showForm, setShowForm] = useState(false);

  const handleApplyClick = () => {
    setShowForm(true);
  };

  return (
    <div className="card-container">
      <img alt="" className="card-img" src={Image} />
      <div className="corner-image top-left"></div>
      <div className="corner-image top-right"></div>
      <div className="corner-image bottom-left"></div>
      <div className="corner-image bottom-right"></div>
      <div className="card-text">
        <h1 className="title">{title}</h1>
        <p className="desc">{deadline}</p>
        <p className="desc">{requirements}</p>
        <p className="desc">{salary}</p>
        <p className="desc">{description}</p>
        <button type="button" className="btn" onClick={handleApplyClick}>Apply</button>
        {showForm && <Form />}
      </div>
    </div>
  );
}
