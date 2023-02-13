import React, { useEffect, useState } from "react";
import CardComponent from "../CardComponent";
import HeaderComponent from "../Common/HeaderComponent";
import { Link } from "react-router-dom";
import LineChartComponent from "../Charts";
import axios from "axios";

const Dashboard = () => {
  const [count, setCount] = useState({});
  useEffect(() => {
    getDashboardData();
  }, []);
  const getDashboardData = async () => {
    const data = await axios.get(`http://localhost:3001/api/dashboard/`);
    setCount({ ...data.data });
  };
  return (
    <>
      <HeaderComponent heading="Dashboard" />
      <div className="dashbord">
        <div className="number-cards">
          <Link className="cards" to="/customers">
            <CardComponent
              bgColor="CornflowerBlue"
              varient="CUSTOMERS"
              varientNum={count.customersCount}
            />
          </Link>
          <Link className="cards" to="/business">
            <CardComponent
              bgColor="ForestGreen"
              varient="BUSINESSES"
              varientNum={count.businessesCount}
            />
          </Link>
          <Link className="cards" to="/">
            <CardComponent
              bgColor="Orange"
              varient="FEEDBACK"
              varientNum={count.feedbacksCount}
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
