import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.css";
import HeaderComponent from "../HeaderComponent";
import axios from "axios";
import Burger from "../../../images/Burger.png";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

const FeedbackComponent = () => {
  const userType = useLocation().pathname.slice(10, 18);
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();

  // let date = new Date()
  // console.log( date - feedbackData[0].createdAt )
  // let diff = date - feedbackData[0].createdAt
  // const hours = Math.floor((diff / 1000 / 60 / 60) % 24);

  // console.log("hours", hours)

  // -------------------------- UseEffect for selected customer -----------------------------

  const getAllFeedbacksByEmail = async () => {
    setIsLoading(true);
    try {
      const FeedBackResponse = await axios
        .get(`http://34.212.54.70:3000/api/feedbacks/${userType}/${email}`)
        .then((res) => res.data);
      setFeedbackData(FeedBackResponse);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (email) {
      getAllFeedbacksByEmail();
    }
  }, [email]);

  // ----------------- initial useEffect for all feedbacks ------------------------------

  const getAllFeedbacks = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`http://34.212.54.70:3000/api/feedbacks`)
      .then((res) => res.data);
    setFeedbackData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!email) {
      getAllFeedbacks();
    }
  }, []);

  return (
    <div>
      <HeaderComponent heading="Feedbacks" />
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {!isLoading && (
        <>
          {feedbackData.length > 0 ? (
            feedbackData.map((customerData) => (
              <div className="feedback-component">
                <div className="feedback-container">
                  <div className="feedback-head">
                    <div className="feedback-head-prim">
                      <div className="users-one">
                        <p>
                          <span className="name font-dark">
                            {customerData.customerName}
                          </span>
                        </p>
                        <p>
                          <span className="name font-company">
                            {customerData.businessName}
                          </span>
                        </p>
                      </div>
                      <div className="rating">
                        {customerData.rating === 0 && (
                          <SentimentVeryDissatisfiedIcon
                            sx={{ color: red[500] }}
                          />
                        )}
                        {customerData.rating === 1 && (
                          <SentimentSatisfiedIcon sx={{ color: orange[500] }} />
                        )}
                        {customerData.rating === 2 && (
                          <SentimentSatisfiedAltIcon color="success" />
                        )}
                        <p className="font-faint">
                          {(new Date() - customerData.createdAt) > 86400000 &&
                            Math.trunc(
                              moment
                                .duration(new Date() - customerData.createdAt)
                                .days()
                            ) + "Days ago"}

                          {(new Date() - customerData.createdAt) < 86400000 &&
                            Math.trunc(
                              moment
                                .duration(new Date() - customerData.createdAt)
                                .hours()
                            ) + "Hours ago"}   
                        </p>
                        {console.log((new Date() - customerData.createdAt) )}
                      </div>
                    </div>
                  </div>
                  <div className="feedback-block">
                    <img src={Burger} alt="" />
                    <p>{customerData.feedback}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>Sorry No feedback present by this customer / Business</h1>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackComponent;
