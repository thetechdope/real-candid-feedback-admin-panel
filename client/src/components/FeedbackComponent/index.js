import React from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup, Grid } from "@mui/material";
import HeaderComponent from "../Common/HeaderComponent";

const FeedbackComponent = () => {
  const { email } = useParams();
  return (
    <>
      <HeaderComponent heading="Feedback" />
      <Link to="/profile">
        <Button variant="contained" className="back">
          Back
        </Button>
      </Link>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            margin: 1,
            width: "25ch",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="form-content">
          <FormControl>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormGroup>
                  <label>Profile Pic</label>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <FormGroup>
                  <label>Business Name</label>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <FormGroup>
                  <label>Email</label>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <FormGroup>
                  <label>Phone Number</label>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <FormGroup>
                  <label>Address</label>
                </FormGroup>
              </Grid>
              <Grid item xs={4}>
                <FormGroup>
                  <label>Business Web URL</label>
                </FormGroup>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            margin: 1,
            width: "25ch",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="form-content feedback-text">
          <h3>Feedback</h3>
          <p className="feedback"> </p>
        </div>
      </Box>
    </>
  );
};

export default FeedbackComponent;
