import React, { useMemo, useState } from "react";
import CompanyProfileCard from "../../components/companyProfileCard";
import "./companyProfile.css";
const COMPANYDATA = [
  {
    _id: "1",
    name: "TCS",
    image:
      "https://www.itp.net/cloud/2021/08/31/Qnp1mYOs-ITP-Aug24-TCS-2-1200x900.jpg",
  },
  {
    _id: "2",
    name: "Wipro",
    image:
      "https://www.itp.net/cloud/2021/08/31/Qnp1mYOs-ITP-Aug24-TCS-2-1200x900.jpg",
  },
  {
    _id: "3",
    name: "Cars24",
    image:
      "https://www.itp.net/cloud/2021/08/31/Qnp1mYOs-ITP-Aug24-TCS-2-1200x900.jpg",
  },
  {
    _id: "4",
    name: "Amazon",
    image:
      "https://www.itp.net/cloud/2021/08/31/Qnp1mYOs-ITP-Aug24-TCS-2-1200x900.jpg",
  },
  {
    _id: "5",
    name: "Apple",
    image:
      "https://www.itp.net/cloud/2021/08/31/Qnp1mYOs-ITP-Aug24-TCS-2-1200x900.jpg",
  },
  {
    _id: "6",
    name: "Flipkart",
    image:
      "https://www.itp.net/cloud/2021/08/31/Qnp1mYOs-ITP-Aug24-TCS-2-1200x900.jpg",
  },
];
export default function CompanyProfile() {
  const [searchedText, setSearchedText] = useState("");
  const filterdData = useMemo(
    () =>
      !searchedText
        ? COMPANYDATA
        : COMPANYDATA.filter((item) => item.name.startsWith(searchedText)),
    [searchedText]
  );
  return (
    <div className="CompanyProfileContainer">
      <span className="search-container">
        <input
          id="searchCompany"
          placeholder="Search Company Here"
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
      </span>
      <div className="company-card-container">
        {filterdData?.length ? (
          filterdData.map((item) => (
            <CompanyProfileCard
              key={item._id}
              name={item.name}
              image={item.image}
            />
          ))
        ) : (
          <h1>No Data Available</h1>
        )}
      </div>
    </div>
  );
}
