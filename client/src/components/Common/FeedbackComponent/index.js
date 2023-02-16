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

const FeedbackComponent = () => {
  const userType = useLocation().pathname.slice(10, 18);
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();

  // console.log((userType.pathname).slice(10, 18))
  console.log(userType, feedbackData , isLoading);

  // -------------------------- UseEffect for selected customer -----------------------------

  const getAllCustomerFeedbacksByEmail = async () => {
    setIsLoading(true);
    const customerResponse = await axios
      .get(`http://34.212.54.70:3000/api/feedbacks/customer/${email}`)
      .then((res) => res.data);
    setFeedbackData(customerResponse);
    
    setIsLoading(false);
    console.log("ONE")
  };

  const getAllBusinessFeedbacksByEmail = async () => {
    setIsLoading(true);
    const businessResponse = await axios
      .get("http://34.212.54.70:3000/api/feedbacks/business/" + email)
      .then((res) => res.data);
    setFeedbackData(businessResponse);
    setIsLoading(false);
    console.log("ONE")
  };

  useEffect(() => {
    if (email) {
      if (userType == "customer") {
        getAllCustomerFeedbacksByEmail();
      }
      getAllBusinessFeedbacksByEmail();
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
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {!isLoading && (
        <>
          <HeaderComponent heading="Feedback" />
          {feedbackData.length > 0 ? (
            feedbackData.map((customerData) => (
              <div className="feedback-component">
                <div className="feedback-container">
                  <div className="feedback-head">
                    <div className="feedback-head-prim">
                      <div className="users-one">
                        <p>
                          Customer Name:
                          <span className="font-light">
                            {customerData.customerName}
                          </span>
                        </p>
                        <p>
                          Company Name :
                          <span className="font-light">
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
