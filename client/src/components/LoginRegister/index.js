import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormControl, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Logo.png";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    // Prevent the default submit and page reload
    e.preventDefault();
    axios
      .post("http://34.212.54.70:3000/api/admin/login", { email, password })
      .then((response) => {
        setIsSubmitted(true);
        localStorage.setItem("loggedIn", JSON.stringify(response.data));
      })
      .catch((err) => setError(err.response.data.message));
  };

  const renderForm = (
    <div className="main-container">
      <Box
        className="container-for-main"
        component="form"
        sx={{
          "& .MuiTextField-root": {
            margin: 1,
            width: "30ch",
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
            <img alt="Logo" src={Logo} style={{ width: "15rem" }} />
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              Sign In{" "}
            </p>
            <FormControl>
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
              </FormGroup>
              {error && (
                <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
              )}
              <FormGroup>
                <button
                  className="login_submit"
                  style={{
                    width: "94%",
                    margin: "10px auto",
                    padding: "8px 16px",
                  }}
                >
                  Login
                </button>
              </FormGroup>
            </FormControl>
          </div>
        </div>
      </Box>
    </div>
  );
  return <>{isSubmitted ? navigate("/") : renderForm}</>;
};
export default Login;
