import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup, Grid } from "@mui/material";
import HeaderComponent from "../FeedbackComponent";
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
   <div>kkkkkk</div>
  );
};

export default FeedbackComponent;
