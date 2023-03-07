import React, { useEffect, useState } from "react";
import moment from "moment";
import "./index.css";
import HeaderComponent from "../HeaderComponent";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CircularProgress from "@mui/material/CircularProgress";
import { Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";

const FeedbackComponent = ({
  allFeedbacksData,
  noHeading,
  isLoading,
  sliceNumber,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { pathname } = useLocation();
  const FeedBackEndPoint = pathname.slice(1, 18);
  useEffect(() => {
    const itemsPerPage = 6;
    setTotalPages(
      Math.ceil(
        FeedBackEndPoint
          ? allFeedbacks.length
          : allFeedbacksData.length / itemsPerPage
      )
    );
    const filtered = FeedBackEndPoint
      ? allFeedbacks.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : allFeedbacksData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
    setFilteredData(filtered);
  }, [allFeedbacksData, currentPage, allFeedbacks]);

  const getAllFeedbacks = () => {
    axios.get(`${baseUrl}/api/feedbacks`).then((res) => {
      setAllFeedbacks(res.data.reverse());
    });
  };

  useEffect(() => {
    if (FeedBackEndPoint) {
      getAllFeedbacks();
    }
  }, [FeedBackEndPoint]);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div style={{ height: "100%" }}>
      {!noHeading && <HeaderComponent heading="Feedbacks" />}
      {allFeedbacks
        ? allFeedbacks.length > 0
        : allFeedbacksData.length && (
            <h3 className="head-dashbord">Recently Added Feedbacks</h3>
          )}

      <div className="pagination">
        {/* <DropDown/> */}
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
          <Grid container spacing={2}>
            {filteredData.length > 0 ? (
              filteredData.map((customerData, index) => (
                <Grid item xs={6}>
                  <div className="feedback-component" key={index}>
                    <div className="feedback-container">
                      <div className="feedback-head">
                        <div className="feedback-head-prim">
                          <div className="feedback-block">
                            <div className="business-name">
                              {customerData.businessImage && (
                                <img src={customerData.businessImage} alt="" />
                              )}
                              {!customerData.businessImage && (
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                  alt="profile icon"
                                />
                              )}
                              <p
                                style={{
                                  fontSize: "12px",
                                  marginLeft: "0px",
                                  textTransform: "uppercase",
                                  fontWeight: "600",
                                  color: "rgb(126,80,238)",
                                }}
                              >
                                {customerData.businessName}
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
                            </div>
                          </div>
                          <hr className="hr-line" />
                          <div className="users-one">
                            <p className="username">
                              <span className="name font-dark">
                                {customerData.customerEmail === "Anonymous" ? (
                                  <span className="font-light">Anonymous</span>
                                ) : (
                                  customerData.customerName
                                )}
                              </span>
                            </p>
                            <p
                              style={{
                                width: "90%",
                                wordWrap: "break-word",
                                fontWeight: "normal",
                                fontStyle: "italic",
                                minHeight: "60px",
                              }}
                            >
                              {customerData.feedback}
                            </p>
                          </div>
                          <div className="first-block">
                            <p className="font-faint" style={{ padding: "0" }}>
                              {new Date() - customerData.createdAt > 86400000 &&
                                Math.trunc(
                                  moment
                                    .duration(
                                      new Date() - customerData.createdAt
                                    )
                                    .days()
                                ) + " days ago"}
                              {new Date() - customerData.createdAt < 86400000 &&
                                Math.trunc(
                                  moment
                                    .duration(
                                      new Date() - customerData.createdAt
                                    )
                                    .hours()
                                ) + " hours ago"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <h1 className="no-feedback-heading">
                Sorry No feedback present by this customer / Business
              </h1>
            )}
          </Grid>
        )}
        {/* {sliceNumber && allFeedbacksData.length > 6 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            size="large"
            color="primary"
          />
        )} */}
        {allFeedbacksData.length && (
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
