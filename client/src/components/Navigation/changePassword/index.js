import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";

const ChangePassword = () => {
  //   const [input, setInput] = useState({
  //     currentPassword: "",
  //     newPassword: "",
  //     conformPassword: "",
  //   });

  //   function addData(e) {
  //     setInput({ ...input, [e.target.name]: e.target.value });
  //   }
  //   console.log(input);
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const user = {
  //       input,
  //     };

  //     axios
  //       .patch(`http://localhost:5000/api/customers/reset-password/`, { user })
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
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
          <FormControl>
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
                // onChange={addData}
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
                // onChange={addData}
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
                name="conformPassword"
                // onChange={addData}
                // value={input.conformPassword}
                type="password"
              />
            </FormGroup>

            <div className="btn-grp">
              <Button
                variant="contained"
                className="submit"
                style={{ background: "#7e50ee" }}
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
