import React from "react";
import CarrierResourceCard from "../../components/carrierResourceCard";
import "./carrierResources.css";

const array = [
  "Android Development",
  "Web Development",
  "iOS Development",
  "Cloud Computing",
  "Ethical Hacking",
  "Data Science",
];

export default function CarrierResources() {
  return (
    <div className="CompanyResourceContainer">
      {array.map((item) => (
        <CarrierResourceCard key={item} jobName={item} />
      ))}
    </div>
  );
}
