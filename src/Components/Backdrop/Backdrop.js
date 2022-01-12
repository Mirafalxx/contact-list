import React from "react";
import "./Backdrop.css";

const Backdrop = ({ show, onClick }) =>
  show ? <div className="Backdrop" onClick={onClick}></div> : null;

export default Backdrop;
