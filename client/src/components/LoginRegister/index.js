import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // User Login info
  const database = [
    {
      username: "admin",
      password: "admin123",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        localStorage.setItem("loggedIn", true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error" style={{ color: "red" }}>
        {errorMessages.message}
      </div>
    );

  function addData(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
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
                  onChange={addData}
                  variant="outlined"
                  name="uname"
                  value={input.uname}
                />
                {renderErrorMessage("uname")}
              </FormGroup>
              <FormGroup>
                <TextField
                  id="passsword"
                  label=" Password"
                  size="small"
                  variant="outlined"
                  onChange={addData}
                  type="password"
                  name="pass"
                  value={input.pass}
                />
                {renderErrorMessage("pass")}
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
