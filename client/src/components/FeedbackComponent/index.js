import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup, Grid } from "@mui/material";
import HeaderComponent from "../headerComponent";
import axios from "axios";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";

const FeedbackComponent = () => {
  const { email } = useParams();
  const [customerData, setCustomerData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/feedbacks/${email}`)
      .then((response) => {
        setCustomerData({...response.data[0]});
      });
  }, []);

  console.log(customerData);

  return (
    <>
	<h1>{customerData.feedback}</h1>
      <HeaderComponent heading="Feedback" />
		{Object.keys(customerData).length > 0  ? <div className="feedback-component">
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
                {/* <img src={bkLogo} alt="" /> */}
				<p>Logo</p>
                <p>{customerData.feedback}</p>
              </div>
            </div>
          </div> : <p>No Feedback Found</p>
		  }
    </>
  );
};

export default FeedbackComponent;
