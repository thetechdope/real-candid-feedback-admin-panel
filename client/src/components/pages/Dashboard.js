import React, {useState,useEffect} from "react";
import CardComponent from "../CardComponent";
import HeaderComponent from "../headerComponent";
import { Link } from "react-router-dom";
import LineChartComponent from "../Charts";
import axios from "axios";

const Dashboard = () => {
// -------------------------------------------------------------------------- 
const [numberStats, setNumberStats] = useState({});


const getNumberStats = async () => {
  const response = await axios.get("http://localhost:5000/api/dashboard");
  setNumberStats(response.data);
};
console.log(numberStats);

useEffect(() => {
  getNumberStats();
}, []);
// -------------------------------------------------------------------------- 

  return (
    <>
      <HeaderComponent heading="Dashboard" />
      <div className="dashbord">
        <div className="number-cards">
          <Link className="cards" to="/customers">
            <CardComponent
              bgColor="CornflowerBlue"
              varient="CUSTOMERS"
              varientNum={numberStats.customersCount}
            />
          </Link>
          <Link className="cards" to="/business">
            <CardComponent
              bgColor="ForestGreen"
              varient="BUSINESSES"
              varientNum={numberStats.businessesCount}
            />
          </Link>
          <Link className="cards" to="/">
            <CardComponent
              bgColor="Orange"
              varient="FEEDBACK"
              varientNum={numberStats.feedbacksCount}
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
