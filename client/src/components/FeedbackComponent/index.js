import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import "./index.css";
import HeaderComponent from "../Common/HeaderComponent";
import axios from 'axios';
import bkLogo from './logo.png';
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

const FeedbackComponent = () => {
  const [feedbackData,setFeedbackData]=useState([]);
  const { email } = useParams();
  console.log(email);

  // ----------------- initial useEffect for all feedbacks ------------------------------

  const getAllFeedbacks = async()=>{
   const response= await axios
      .get(`http://localhost:3001/api/feedbacks`)
      .then((res) => res.data);
      setFeedbackData(response);
  }

  useEffect(()=>{
   getAllFeedbacks();
  },[]);

  // -------------------------- UseEffect for selected customer -----------------------------

  const getAllFeedbacksByEmail= async()=>{
    const customerResponse= await axios
    .get("http://localhost:3001/api/feedbacks/"+email)
    .then((res) => res.data);

    const businessResponse= await axios
    .get("http://localhost:3001/api/feedbacks/getByBusinesses/"+email)
    .then((res) => res.data);

    customerResponse.length>0 ? setFeedbackData(customerResponse)
    : setFeedbackData(businessResponse);
  }

  useEffect(()=>{
    if(email){
      getAllFeedbacksByEmail();
    } 
   },[email]);
  
  return (
    <>
      <HeaderComponent heading="Feedback" />
      {feedbackData.length>0?
        feedbackData.map((customerData) => (
          <div className="feedback-component">
            <div className="feedback-container">
              <div className="feedback-head">
                <div className="feedback-head-prim">
                  <div className="users-one">
                    <p>
                      Customer Name:{" "}
                      <span className="font-light">
                        {customerData.customerEmail}
                      </span>
                    </p>
                    <p>
                      Company Name :{" "}
                      <span className="font-light">
                        {customerData.businessEmail}
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
                <img src={bkLogo} alt="" />
                <p>{customerData.feedback}</p>
              </div>
            </div>
          </div>
        )):<h1>Sorry No feedback present by this customer / Business</h1>}
    </>
  );
};

export default FeedbackComponent;
