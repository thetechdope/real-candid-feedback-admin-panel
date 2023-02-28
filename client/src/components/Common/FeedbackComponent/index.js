import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import moment from "moment";
import "./index.css";
import HeaderComponent from "../HeaderComponent";
import axios from "axios";
import { Pagination } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CircularProgress from "@mui/material/CircularProgress";
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

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  // -------------------------- UseEffect for selected customer -----------------------------

  const getAllFeedbacksByEmail = async () => {
    setIsLoading(true);
    try {
      const FeedBackResponse = await axios.get(
        `${baseUrl}/feedbacks/${FeedBackEndPoint}/${email}`
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
      .get(`${baseUrl}/feedbacks`)
      .then((res) => res.data);
    setFeedbackData(response.slice(sliceNumber));
    setIsLoading(false);
  };
  useEffect(() => {
    if (!email) {
      getAllFeedbacks();
    }
  }, []);

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
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          alt=""
                        />
                      )}
                      <p style={{ width: "90%", wordWrap: "break-word" }}>{customerData.feedback}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="feedback-heading">Sorry No feedback present by this customer / Business</h1>
            )}
          </>
        )}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FeedbackComponent;