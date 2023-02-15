import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup } from "@mui/material";

import HeaderComponent from "../Common/HeaderComponent";

const ChangePassword = () => {
  return (
    <>
      <HeaderComponent heading="Change Password" />
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
            <FormGroup>
              <label>
                Current Password<span className="required"> *</span>
              </label>
              <TextField
                id="password"
                size="small"
                variant="outlined"
                type="password"
              />
            </FormGroup>
            <FormGroup>
              <label>
                New Password<span className="required"> *</span>
              </label>
              <TextField
                id="password"
                size="small"
                variant="outlined"
                type="password"
                required
              />
            </FormGroup>
            <FormGroup>
              <label>
                Confirm Password<span className="required"> *</span>
              </label>
              <TextField
                id="Password"
                size="small"
                variant="outlined"
                type="password"
              />
            </FormGroup>

            <div className="btn-grp">
              <Button variant="contained" className="submit">
                Submit
              </Button>
              <Button variant="contained" className="cancel">
                Cancel
              </Button>
            </div>
          </FormControl>
        </div>
      </Box>
    </>
  );
};
export default ChangePassword;
