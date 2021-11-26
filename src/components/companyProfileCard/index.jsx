import React from "react";
import "./companyProfileCard.css";
import { Link } from "react-router-dom";
function CompanyProfileCard({ name = "", image = "" }) {
  return (
    <Link to={name} className="CompanyProfileCardContainer">
      <img alt="company" src={image} width={250} height={undefined} />
      <h1>{name}</h1>
    </Link>
  );
}

CompanyProfileCard.propTypes = {};

export default CompanyProfileCard;
