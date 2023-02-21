import "./index.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {

  // const [input, setInput] = useState({
  //   uname: "",
  //   pass: "",
  // });

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
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
// -------------------------------------- To Set User login status in local storage 
  useEffect(() => {
    localStorage.setItem('dataKey', JSON.stringify(isSubmitted));
  }, [isSubmitted]);

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error" style={{ color: "red" }}>
        {errorMessages.message}
      </div>
    );

  const renderForm = (
    <>
      <FormControl>
        <FormGroup>
          <TextField
            id="email"
            label="Email Address"
            size="small"
            // onChange={addData}
            variant="outlined"
            name="uname"
            required
            // value={input.uname}
          />
          {renderErrorMessage("uname")}
        </FormGroup>
        <FormGroup>
          <TextField
            id="passsword"
            label=" Password"
            size="small"
            variant="outlined"
            // onChange={addData}
            type="password"
            name="pass"
            required
            // value={input.pass}
          />

          {renderErrorMessage("pass")}
        </FormGroup>
        <FormGroup>
          <button className="login_submit">Submit</button>
        </FormGroup>
      </FormControl>
      <p className="bottom-text">
        <a href="/">Forgot password?</a>
      </p>
    </>
  );
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
        onSubmit={handleSubmit}
      >
        <div className="form-content">
          <p>Sign In </p>
          {isSubmitted ? navigate("/") : renderForm}
        </div>
      </Box>
    </>
  );
};
export default Login;
