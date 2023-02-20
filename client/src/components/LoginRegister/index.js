import "./index.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FormControl, FormGroup } from "@mui/material";

const Login = () => {
  return (
    <>
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
          <p>Sign In </p>
          <FormControl>
            <FormGroup>
              <TextField
                id="email"
                label="Email Address"
                size="small"
                variant="outlined"
              />
            </FormGroup>
            <FormGroup>
              <TextField
                id="passsword"
                label=" Password"
                size="small"
                variant="outlined"
                type="password"
              />
            </FormGroup>
            <FormGroup>
              <button className="login_submit">Submit</button>
            </FormGroup>
          </FormControl>
          <p className="bottom-text">
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </Box>
    </>
  );
};
export default Login;
