import "./index.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { FormControl, FormGroup } from "@mui/material";

const Login = () => {
  const [signin, setSignin] = useState("signin");
  console.log(signin);
  return (
    <>
      {signin == "signin" ? (
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
                />
              </FormGroup>
              <FormGroup>
                <Button variant="contained">Submit</Button>
              </FormGroup>
            </FormControl>
            <p className="bottom-text">
              <a href="#">Forgot password?</a>
            </p>
            <p className="bottom-text">
              Don't have an account?
              <a
                onClick={() => {
                  setSignin("signup");
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </Box>
      ) : (
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
            <p>Sign Up </p>
            <FormControl>
              <FormGroup>
                <label>FirstName</label>
                <TextField id="firstName" size="small" variant="outlined" />
              </FormGroup>
              <FormGroup>
                <label>LastName</label>
                <TextField id="lastName" size="small" variant="outlined" />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <TextField id="Email" size="small" variant="outlined" />
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <TextField
                  id="Password"
                  size="small"
                  type="password"
                  variant="outlined"
                />
              </FormGroup>
              <FormGroup>
                <label>Phone Number</label>
                <TextField id="phoneNumber" size="small" variant="outlined" />
              </FormGroup>
              <FormGroup>
                <Button variant="contained">Submit</Button>
              </FormGroup>
            </FormControl>
          </div>
        </Box>
      )}
    </>
  );
};
export default Login;
