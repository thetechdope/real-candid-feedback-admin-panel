import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./index.css";
import { Alert, FormControl, FormGroup, Grid, Input } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";
import axios from "axios";
import { GetSetLoginUser } from "../../../App";
const ProfileUpdate = () => {
  const [currentLoginUser, setAdmin] = useContext(GetSetLoginUser);
  const [adminDetails, setAdminDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    profileImage: "",
    _id: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    if (currentLoginUser) {
      setAdminDetails({ ...currentLoginUser });
    }
    if (isSave) {
      setTimeout(() => {
        setIsSave(false);
      }, 1000);
    }
  }, [isSave]);
  const change = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSave = async () => {
    const updateAdminProfile = await axios.patch(
      "http://localhost:3001/api/admin/update-admin",
      {
        ...adminDetails,
        avatar: profilePic ? profilePic : adminDetails.profileImage,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (updateAdminProfile.status === 200) {
      setProfilePic(null);
      setAdmin(updateAdminProfile.data.data);
      setIsEdit(false);
      setIsSave(true);
    }
  };

  return (
    <>
      <HeaderComponent heading="Profile" />
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
        <div className="form-content profile_form">
          {isSave && (
            <Alert sx={{ width: "50%", marginTop: 0 }} severity="success">
              Profile Is updated
            </Alert>
          )}
          <FormControl className="update_profile">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div>
                  <label>FirstName : </label>
                  {isEdit ? (
                    <input
                      type="input"
                      name="firstName"
                      value={adminDetails.firstName}
                      onChange={change}
                      className="update_profile"
                    />
                  ) : (
                    <span>{adminDetails.firstName}</span>
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="form-field">
                  <label>LastName : </label>
                  {isEdit ? (
                    <input
                      type="input"
                      name="lastName"
                      value={adminDetails.lastName}
                      onChange={change}
                      className="update_profile"
                    />
                  ) : (
                    <span>{adminDetails.lastName}</span>
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label>Email : </label>
                  <span>{adminDetails.email}</span>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label>Phone Number : </label>
                  {isEdit ? (
                    <input
                      type="input"
                      name="phoneNumber"
                      value={adminDetails.phoneNumber}
                      onChange={change}
                      className="update_profile"
                    />
                  ) : (
                    <span>{adminDetails.phoneNumber}</span>
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <label>Profile Pic:</label>
                  <img
                    className="profile-pic"
                    src={adminDetails.profileImage}
                    alt="profile-pic"
                  />
                  {isEdit && (
                    <Input
                      variant="contained"
                      type="file"
                      component="label"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    >
                      Upload File
                    </Input>
                  )}
                  <div className="btn-grp">
                    {isEdit ? (
                      <>
                        <Button
                          onClick={onSave}
                          variant="contained"
                          style={{ background: "#68BF90" }}
                          className="submit"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setIsEdit(!isEdit)}
                          variant="contained"
                          style={{ background: "#7e50ee" }}
                          className="submit"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEdit(!isEdit)}
                        variant="contained"
                        style={{ background: "#7e50ee" }}
                        className="submit"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </FormGroup>
              </Grid>
            </Grid>
          </FormControl>
        </div>
      </Box>
    </>
  );
};

export default ProfileUpdate;
