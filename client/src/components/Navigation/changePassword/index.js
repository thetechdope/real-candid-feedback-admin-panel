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
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function addData(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  console.log("input", input.email);

  const setAdminPassword = async (e) => {
    const { email, currentPassword, newPassword, confirmPassword } = input;
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
          email,
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );

      console.log("response", response);
      return setErrorMessage("password changed successfully");
    }
    // let response = await axios
    //   .patch(`http://localhost:3000/api/admin/change-password `, {
    //     email,
    //     currentPassword,
    //     newPassword,
    //     confirmPassword,
    //   })

    // console.log("response", response)
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
      >
        <div className="form-content">
          <FormControl>
            <FormGroup>
              <label>
                Email<span className="required"> *</span>
              </label>
              <TextField
                id="email"
                size="small"
                variant="outlined"
                type="email"
                name="email"
                onChange={addData}
                value={input.email}
              />
            </FormGroup>
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
                style={{ background: "#7e50ee" }}
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
