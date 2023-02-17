import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
<<<<<<< HEAD
import "./index.css";
import moment from "moment";
=======
import moment from "moment";
import "./index.css";
>>>>>>> 8d6114ca2de767df1beb0691b8f265e9a41e702f
import HeaderComponent from "../HeaderComponent";
import axios from "axios";
import Burger from "../../../images/Burger.png";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CircularProgress from "@mui/material/CircularProgress";

const FeedbackComponent = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();
  const { pathname } = useLocation();
  const FeedBackEndPoint = pathname.slice(10, 18);
<<<<<<< HEAD

=======
  moment().format();
>>>>>>> 8d6114ca2de767df1beb0691b8f265e9a41e702f
  // -------------------------- UseEffect for selected customer -----------------------------

  const getAllFeedbacksByEmail = async () => {
    setIsLoading(true);
    try {
      const FeedBackResponse = await axios.get(
        `http://34.212.54.70:3000/api/feedbacks/${FeedBackEndPoint}/${email}`
      );
      setFeedbackData(FeedBackResponse.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
<<<<<<< HEAD
=======

>>>>>>> 8d6114ca2de767df1beb0691b8f265e9a41e702f
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
                          {new Date() - customerData.createdAt > 86400000 &&
                            Math.trunc(
                              moment
                                .duration(new Date() - customerData.createdAt)
                                .days()
<<<<<<< HEAD
                            ) + "Days ago"}
=======
                            ) + " Days ago"}
>>>>>>> 8d6114ca2de767df1beb0691b8f265e9a41e702f

                          {new Date() - customerData.createdAt < 86400000 &&
                            Math.trunc(
                              moment
                                .duration(new Date() - customerData.createdAt)
                                .hours()
<<<<<<< HEAD
                            ) + "Hours ago"}
=======
                            ) + " Hours ago"}
>>>>>>> 8d6114ca2de767df1beb0691b8f265e9a41e702f
                        </p>
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
