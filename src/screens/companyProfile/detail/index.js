import React from "react";
import { useParams } from "react-router-dom";
import "../companyProfile.css";

export default function CompanyProfileDetail() {
  const { id } = useParams();
  return (
    <div className="CompanyProfileContainer">
      <div style={{ width: "100%", marginBottom: 30 }}>
        <h1 style={{ textAlign: "center" }}>{id}</h1>
        <table className="company_table">
          <tr>
            <th>Name of company</th>
            <td>Wipro</td>
          </tr>
          <tr>
            <th>Name of company</th>
            <td>Wipro</td>
          </tr>
          <tr>
            <th>Name of company</th>
            <td>Wipro</td>
          </tr>
          <tr>
            <th>Name of company</th>
            <td>Wipro</td>
          </tr>
          <tr>
            <th>Name of company</th>
            <td>Wipro</td>
          </tr>
          <tr>
            <th>Name of company</th>
            <td>Wipro</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
