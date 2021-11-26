import React from "react";
import PropTypes from "prop-types";
import "./carrierResourceCard.css";
import { Link, NavLink } from "react-router-dom";
function CarrierResourceCard({ jobName = "" }) {
  return (
    <Link to={jobName} className="CarrierResourceCardContainer">
      <h1>{jobName}</h1>
    </Link>
  );
}

CarrierResourceCard.propTypes = {};

export default CarrierResourceCard;
