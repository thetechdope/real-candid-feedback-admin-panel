import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import HeaderComponent from "../Common/HeaderComponent";
import { Link } from "react-router-dom";
import BarChartComponent from "./Charts";
import CircularProgress from "@mui/material/CircularProgress";
import FeedbackComponent from "../Common/FeedbackComponent";
import axios from "axios";
import baseUrl from "../Common/baseUrl";

const Dashboard = () => {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getDashboardData();
  }, []);
  const getDashboardData = async () => {
    setIsLoading(true);
    const data = await axios.get(`${baseUrl}/dashboard/`);
    setCount(data.data);
    console.log(data.data);
    console.log(data.data.feedbacksCount.length);
    setIsLoading(false);
  };
  return (
    <>
      <HeaderComponent heading="Dashboard" />
      {isLoading === true ? (
        <div className="loader">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="dashbord">
            <div className="number-cards">
              <Link className="cards" to="/customers">
                <CardComponent
                  bgColor="CornflowerBlue"
                  varient="CUSTOMERS"
                  varientNum={count && count.customersCount}
                />
              </Link>
              <Link className="cards" to="/businesses">
                <CardComponent
                  bgColor="ForestGreen"
                  varient="BUSINESSES"
                  varientNum={count && count.businessesCount}
                />
              </Link>
              <Link className="cards" to="/allfeedback">
                <CardComponent
                  bgColor="Orange"
                  varient="FEEDBACKS"
                  varientNum={count && count.feedbacksCount.length}
                  className="feedback-card"
                />
              </Link>
            </div>
            <h3 className="head-dashbord">Rating Graph</h3>
            <BarChartComponent />
            <div>
              <h3 className="head-dashbord">Recently Added Feedback</h3>
              <FeedbackComponent sliceNumber="-5" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;