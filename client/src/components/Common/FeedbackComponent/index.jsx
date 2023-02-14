import React, { useState, useEffect } from "react";
import Burger from "../../../images/Burger.png";
import "./index.css";
import axios from "axios";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import HeaderComponent from "../HeaderComponent";

const FeedbacksComponent = () => {
  const [customerData, setCustomerData] = useState([]);

  const getCustomerData = async () => {
    const response = await axios
      .get(`http://localhost:5000/api/feedbacks`)
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setCustomerData(data);
      });
    // console.log("response", customerData);
  };
  console.log("customerData", customerData);
  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <>
      <HeaderComponent heading="Feedback" />
      {customerData.length &&
        customerData.map((customerData) => (
          <div className="feedback-component">
            <div className="feedback-container">
              <div className="feedback-head">
                <div className="feedback-head-prim">
                  <div className="users-one">
                    <p>
                      Customer Name:{" "}
                      <span className="font-light">
                        {customerData.customerName}
                      </span>
                    </p>
                    <p>
                      Company Name :{" "}
                      <span className="font-light">
                        {customerData.businessName}
                      </span>
                    </p>
                  </div>
                  <div className="rating">
                    {customerData.rating === 0 && (
                      <SentimentVeryDissatisfiedIcon sx={{ color: red[500] }} />
                    )}
                    {customerData.rating === 1 && (
                      <SentimentSatisfiedIcon sx={{ color: orange[500] }} />
                    )}
                    {customerData.rating === 2 && (
                      <SentimentSatisfiedAltIcon color="success" />
                    )}
                    <p className="font-faint">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="feedback-block">
                <img src={Burger} alt="" />
                <p>{customerData.feedback}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FeedbacksComponent;

// ----------------------------------------------------
// import { useLocation } from "react-router-dom";

// const searchParams = useLocation();

// searchParams.pathname.slice(1) // this will give you a email address from params
