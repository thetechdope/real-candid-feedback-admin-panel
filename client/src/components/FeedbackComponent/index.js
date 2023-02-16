import React, { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import "./index.css";
import HeaderComponent from "../Common/HeaderComponent";
import axios from 'axios';
import bkLogo from './logo.png';
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CircularProgress from "@mui/material/CircularProgress";

const FeedbackComponent = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useParams();
  const {pathname}= useLocation();
  const FeedBackEndPoint= pathname.slice(11,19);
  console.log(FeedBackEndPoint);

  // -------------------------- UseEffect for selected customer -----------------------------

  const getAllFeedbacksByEmail = async () => {
      try {
        const FeedBackResponse = await axios
        .get(`http://34.212.54.70:3000/api/feedbacks/${FeedBackEndPoint}/${email}`);
       setFeedbackData(FeedBackResponse.data)
        setIsLoading(false);
      } catch (error) {
   
       error && setFeedbackData(feedbackData);
        setIsLoading(false);
      }
    
  }

  useEffect(() => {
    if (email) {
      getAllFeedbacksByEmail();
    }
  }, [email]);

  // ----------------- initial useEffect for all feedbacks ------------------------------

  const getAllFeedbacks = async () => {
    const response = await axios
      .get(`http://34.212.54.70:3000/api/feedbacks`)
    setFeedbackData(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!email) {
      getAllFeedbacks();
    }
  }, []);

  return (
    <div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />{" "}
        </div>
      )}

      {!isLoading && (
        <>
          <HeaderComponent heading="Feedback" />
          {feedbackData.length > 0 ?
            feedbackData.map((feedback) => (
              <div className="feedback-component">
                <div className="feedback-container">
                  <div className="feedback-head">
                    <div className="feedback-head-prim">
                      <div className="users-one">
                        <p>
                          Customer Name:{" "}
                          <span className="font-light">
                            {feedback.customerName}
                          </span>
                        </p>
                        <p>
                          Company Name :{" "}
                          <span className="font-light">
                            {feedback.businessName}
                          </span>
                        </p>
                      </div>
                      <div className="rating">
                        {feedback.rating === 0 && (
                          <SentimentVeryDissatisfiedIcon sx={{ color: red[500] }} />
                        )}
                        {feedback.rating === 1 && (
                          <SentimentSatisfiedIcon sx={{ color: orange[500] }} />
                        )}
                        {feedback.rating === 2 && (
                          <SentimentSatisfiedAltIcon color="success" />
                        )}
                        <p className="font-faint">1 day ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="feedback-block">
                    <img src={bkLogo} alt="" />
                    <p>{feedback.feedback}</p>
                  </div>
                </div>
              </div>
            )) : <h1>Sorry No feedback present by this customer / Business</h1>}
        </>
      )}
    </div>

  );
};

export default FeedbackComponent;
