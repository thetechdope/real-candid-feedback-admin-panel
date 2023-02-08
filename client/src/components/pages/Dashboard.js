import React from "react";
import CardComponent from "../CardComponent";
import HeaderComponent from "../headerComponent";
import { Link } from "react-router-dom";
import LineChartComponent from "../Charts";

const Dashboard = () => {
  return (
    <>
      <HeaderComponent heading="Dashboard" />
      <div className="dashbord">
        <div className="number-cards">
          <Link className="cards" to="/customers">
            <CardComponent
              bgColor="CornflowerBlue"
              varient="CUSTOMERS"
              varientNum="28"
            />
          </Link>
          <Link className="cards" to="/business">
            <CardComponent
              bgColor="ForestGreen"
              varient="BUSINESSES"
              varientNum="14"
            />
          </Link>
          <Link className="cards" to="/">
            <CardComponent
              bgColor="Orange"
              varient="FEEDBACK"
              varientNum="156"
              className="feedback-card"
            />
          </Link>
        </div>
        <LineChartComponent />
      </div>
    </>
  );
};

export default Dashboard;
