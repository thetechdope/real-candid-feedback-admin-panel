import React, { useState, useEffect } from "react";
import CardComponent from "../CardComponent";
import HeaderComponent from "../Common/HeaderComponent";
import { Link } from "react-router-dom";
import LineChartComponent from "../Charts";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

const Dashboard = () => {
  const [count, setCount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getDashboardData();
  }, []);
  const getDashboardData = async () => {
    setIsLoading(true);
    const data = await axios.get(`http://localhost:3001/api/dashboard/`);
    setCount({ ...data.data });
    setIsLoading(false);
  };
  return (
    <>
      <HeaderComponent heading="Dashboard" />
      {isLoading == true ? (
        <div className="loader">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="dashbord">
          <div className="number-cards">
            <Link className="cards" to="/customers">
              <CardComponent
                bgColor="CornflowerBlue"
                varient="CUSTOMERS"
                varientNum={count.customersCount}
              />
            </Link>
            <Link className="cards" to="/businesses">
              <CardComponent
                bgColor="ForestGreen"
                varient="BUSINESSES"
                varientNum={count.businessesCount}
              />
            </Link>
            <Link className="cards" to="/feedbacks">
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
      )}
    </>
  );
};

export default Dashboard;
