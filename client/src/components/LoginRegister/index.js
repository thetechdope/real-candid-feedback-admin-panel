import "./index.css";
import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, FormGroup } from "@mui/material";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function addData(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  console.log(input);
  const handleSubmit = async (e) => {
    const { email, password } = input;
    e.preventDefault();
    // console.log(user);
    axios
      .post(`http://localhost:5000/api/customers/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <FormControl>
            <FormGroup>
              <TextField
                id="email"
                label="Email Address"
                size="small"
                onChange={addData}
                variant="outlined"
                name="email"
                value={input.email}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                id="passsword"
                label=" Password"
                size="small"
                variant="outlined"
                onChange={addData}
                type="password"
                name="password"
                value={input.password}
              />
            </FormGroup>
            <FormGroup>
              <button className="login_submit">Submit</button>
            </FormGroup>
          </FormControl>
          <p className="bottom-text">
            <a href="/">Forgot password?</a>
          </p>
        </div>
      </Box>
    </>
  );
};
export default Login;
