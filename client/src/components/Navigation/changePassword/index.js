import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";
const ChangePassword = () => {
  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  function addData(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const setAdminPassword = async (e) => {
    let comment = JSON.parse(localStorage.getItem("loggedIn"));
    const { currentPassword, newPassword, confirmPassword } = input;
    if (newPassword === currentPassword) {
      return setErrorMessage("New Password should be different");
    }
    if (newPassword !== confirmPassword) {
      return setErrorMessage("password does not matched");
    }
    if (newPassword !== currentPassword && newPassword === confirmPassword) {
      let response = await axios.patch(
        `http://localhost:3001/api/admin/change-password `,
        {
          email: comment.email,
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );
      console.log("response", response);
      return setErrorMessage("password changed successfully");
    }
  };
  const handleSubmit = () => {
    setAdminPassword();
  };
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
        // onSubmit={handleSubmit}
      >
        <div className="form-content">
          <FormControl className="edit_profile">
            <FormGroup>
              <label>
                Current Password<span className="required"> *</span>
              </label>
              <TextField
                id="password"
                size="small"
                variant="outlined"
                type="password"
                name="currentPassword"
                onChange={addData}
                value={input.currentPassword}
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
                name="newPassword"
                onChange={addData}
                value={input.newPassword}
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
                name="confirmPassword"
                onChange={addData}
                value={input.confirmPassword}
                type="password"
              />
            </FormGroup>
            <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
            <div className="btn-grp">
              <Button
                variant="contained"
                className="submit"
                style={{ background: "#7E50EE" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                className="cancel"
                style={{ background: "#68BF90" }}
              >
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