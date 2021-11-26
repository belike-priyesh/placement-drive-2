import React from "react";
import { useParams } from "react-router-dom";
import "./carrierResourcesDetail.css";

export default function CarrierResourceDetail() {
  const { id } = useParams();
  return (
    <div className="CarrierResourceDetailContainer">
      <h1>{id}</h1>
      <h3> Requirements: </h3>
      <p>
        <ol>
          <li>Java</li>
          <li>Android Studio</li>
          <li>Kotlin (Optional)</li>
          <li>Basic XML Undertanding</li>
          <li>JSON Queries</li>
        </ol>
      </p>
    </div>
  );
}

