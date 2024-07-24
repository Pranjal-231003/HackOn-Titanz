import React from "react";
import "../styles/Form.css";

const Form = () => {
  return (
    <form className="form">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-input" id="email" placeholder="Email" required />

      {/* <span className="form-title">Upload your file</span> */}
      <p className="form-paragraph">File should be a pdf</p>
      <label htmlFor="file-input" className="drop-container">
        <span className="drop-title">Drop files here</span>
        or
        <input type="file" accept="application/pdf" required id="file-input" />
      </label>
      <button className="btn">Submit</button>
    </form>
  );
};

export default Form;
