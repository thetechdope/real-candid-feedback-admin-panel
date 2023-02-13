import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup, Grid, Input, Item } from "@mui/material";

import HeaderComponent from "../headerComponent";

const ProfileUpdate = () => {
  return (
    <>
      <HeaderComponent heading="Profile" />
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
              <Grid item xs={6}>
                <FormGroup>
                  <label>FirstName</label>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <label>LastName</label>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <label>Email</label>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <label>Phone Number</label>
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <label>Profile Pic</label>
                  <Input variant="contained" type="file" component="label">
                    Upload File
                    {/* <input type="file" hidden /> */}
                  </Input>
                  <div className="btn-grp">
                    <Button variant="contained" className="submit">
                      Submit
                    </Button>
                    <Button variant="contained" className="cancel">
                      Cancel
                    </Button>
                  </div>
                </FormGroup>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </Box>
    </>
  );
};

export default ProfileUpdate;
