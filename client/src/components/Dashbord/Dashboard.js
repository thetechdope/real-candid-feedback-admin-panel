import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import HeaderComponent from "../Common/HeaderComponent";
import { Link } from "react-router-dom";
// import BarChartComponent from "./Charts";
import CircularProgress from "@mui/material/CircularProgress";
// import FeedbackComponent from "../Common/FeedbackComponent";
import axios from "axios";
import baseUrl from "../Common/baseUrl";
import DropDown from "./DropDown";


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [allBusinessName, setAllBusinessName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const response = await axios.get(`${baseUrl}/api/dashboard/`);
    if (response.status === 200) {
      setDashboardData(response.data);
      // console.log(response.data.allFeedbacks);
      const allBusinessName = response.data.allBusinesses.map((val) => ({
        name: val.businessName,
        email: val.businessEmail,
      }));
      setAllBusinessName(allBusinessName);
      setIsLoading(false);
    }
  };
  return (
    <>
      <HeaderComponent heading="Dashboard" />
      {isLoading ? (
        <div className="loader">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="dashbord">

            {/* Dashboard Cards */}
            {Object.keys(dashboardData).length > 0 && (
              <div className="number-cards">
                <Link className="cards" to="/customers">
                  <CardComponent
                    bgColor="CornflowerBlue"
                    varient="CUSTOMERS"
                    varientNum={
                      dashboardData && dashboardData.allCustomersCount
                    }
                  />
                </Link>
                <Link className="cards" to="/businesses">
                  <CardComponent
                    bgColor="ForestGreen"
                    varient="BUSINESSES"
                    varientNum={
                      dashboardData && dashboardData.allBusinesses.length
                    }
                  />
                </Link>
                <Link className="cards" to="/allfeedback">
                  <CardComponent
                    bgColor="Orange"
                    varient="FEEDBACKS"
                    varientNum={
                      dashboardData && dashboardData.allFeedbacks.length
                    }
                    className="feedback-card"
                  />
                </Link>
              </div>
            )}
           
            <h3 className="head-dashbord">Rating Graph</h3>
            {/* <BarChartComponent /> */}
            <div className="dropdown-container">
              <DropDown allBusinessName={allBusinessName} />
            </div>
<<<<<<< HEAD
            {/* <div>
              <h3 className="head-dashbord">Recently Added Feedbacks</h3>
              <FeedbackComponent sliceNumber={-3} />
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
=======
            </div> */}
=======
>>>>>>> 923355a3e2424445a3369cac4ccc2700a495a7c4
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
