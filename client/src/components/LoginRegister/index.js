import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (e) => {
    // Prevent the default submit and page reload
    e.preventDefault();

    // Handle validations
    axios
      .post("http://localhost:3001/api/admin/login", { email, password })
      .then((response) => {
        localStorage.setItem("loggedIn", JSON.stringify(response.data));
        setIsSubmitted(true); // Handle response
      })
      .catch((err) => console.log("error", err));
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error" style={{ color: "red" }}>
        {errorMessages.message}
      </div>
    );

  const renderForm = (
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
        onSubmit={handleSubmit}
        method="post"
      >
        <div className="login">
          <div className="form-content">
            <FormControl>
              <p>Sign In </p>
              <FormGroup>
                <TextField
                  id="email"
                  label="Email Address"
                  size="small"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {renderErrorMessage("email")}
              </FormGroup>
              <FormGroup>
                <TextField
                  label=" Password"
                  size="small"
                  variant="outlined"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {renderErrorMessage("email")}
              </FormGroup>
              <FormGroup>
                <button className="login_submit">Login</button>
              </FormGroup>
            </FormControl>
          </div>
          <div
            className="form-content"
            style={{ background: "#7e50ee", color: "#fff" }}
          >
            <p>Forgot Password</p>
            <p className="login-text">if you don't remember your password</p>
            <button
              className="login_submit"
              style={{
                background: "#fff",
                color: "#7e50ee",
                width: "70%",
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Forgot Password ?
            </button>
          </div>
        </div>
      </Box>
    </>
  );
  return <>{isSubmitted ? navigate("/") : renderForm}</>;
};
export default Login;
