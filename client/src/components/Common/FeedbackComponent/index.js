import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";
import "./index.css";
import HeaderComponent from "../HeaderComponent";
import axios from "axios";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "@mui/material";
import baseUrl from "../baseUrl";

const FeedbackComponent = ({ sliceNumber }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(feedbackData.length / itemsPerPage);
  const filteredData = feedbackData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const { email } = useParams();
  const { pathname } = useLocation();
  const FeedBackEndPoint = pathname.slice(10, 18);

  // -------------------------- UseEffect for selected customer -----------------------------

  const getAllFeedbacksByEmail = async () => {
    setIsLoading(true);
    try {
      const FeedBackResponse = await axios.get(
        `${baseUrl}/api/feedbacks/${FeedBackEndPoint}/${email}`
      );
      setFeedbackData(FeedBackResponse.data);
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
      .get(`${baseUrl}/api/feedbacks`)
      .then((res) => res.data);
    setFeedbackData(response.slice(sliceNumber));
    setIsLoading(false);
  };

  useEffect(() => {
    if (!email) {
      getAllFeedbacks();
    }
  }, []);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div style={{ height: "100%" }}>
      {!sliceNumber && <HeaderComponent heading="Feedbacks" />}
      <div className="pagination">
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
            {filteredData.length > 0 ? (
              filteredData.map((customerData, index) => (
                <div className="feedback-component" key={index}>
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
                            <SentimentSatisfiedIcon
                              sx={{ color: orange[500] }}
                            />
                          )}
                          {customerData.rating === 2 && (
                            <SentimentSatisfiedAltIcon color="success" />
                          )}
                          &nbsp;
                          <p className="font-faint">
                            {new Date() - customerData.createdAt > 86400000 &&
                              Math.trunc(
                                moment
                                  .duration(new Date() - customerData.createdAt)
                                  .days()
                              ) + " days ago"}
                            {new Date() - customerData.createdAt < 86400000 &&
                              Math.trunc(
                                moment
                                  .duration(new Date() - customerData.createdAt)
                                  .hours()
                              ) + " hours ago"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="feedback-block">
                      {customerData.businessImage && (
                        <img src={customerData.businessImage} alt="" />
                      )}
                      {!customerData.businessImage && (
                        <img
                          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                          alt=""
                        />
                      )}
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
        {!sliceNumber && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            size="large"
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default FeedbackComponent;
