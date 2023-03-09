import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";
import baseUrl from "../../Common/baseUrl";

const ChangePassword = () => {
  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  function addData(e) {
    setErrorMessage("");
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const setAdminPassword = (e) => {
    let comment = JSON.parse(localStorage.getItem("loggedIn"));
    const { currentPassword, newPassword, confirmPassword } = input;
    if (newPassword === currentPassword) {
      setErrorMessage("New Password should be different");
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Password does not matched");
    }

    if (
      newPassword === "" ||
      currentPassword === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage("Please Enter Password");
    }
    if (newPassword !== currentPassword && newPassword === confirmPassword) {
      axios
        .patch(`${baseUrl}/api/admin/change-password `, {
          email: comment.email,
          currentPassword,
          newPassword,
          confirmPassword,
        })
        .then((res) => {
          setErrorMessage("");
          // setInput({currentPassword: "",
          // newPassword: "",
          // confirmPassword: "",});
          setSuccess("Password Changed Successfully");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        });
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
        style={{ marginTop: "20px" }}
      >
        <div className="form-content" style={{ width: "60%" }}>
          <FormControl className="edit_profile" style={{ width: "60%" }}>
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
                // value={input.currentPassword}
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
                // value={input.newPassword}
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
                // value={input.confirmPassword}
                type="password"
              />
            </FormGroup>
            <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>
            <p style={{ color: "green", fontSize: "14px" }}>{success}</p>
            <div className="btn-grp">
              <Button
                variant="contained"
                className="submit"
                style={{
                  background: "#7e50ee",
                  padding: "5px 50px",
                  marginRight: "20px",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                className="cancel"
                style={{
                  background: "#68BF90",
                  padding: "5px 50px",
                }}
                onClick={() => {
                  // setInput({
                  //   currentPassword: "",
                  //   newPassword: "",
                  //   confirmPassword: "",
                  // });
                  setErrorMessage("");
                }}
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
