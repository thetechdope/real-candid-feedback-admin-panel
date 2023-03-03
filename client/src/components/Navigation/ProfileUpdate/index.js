import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./index.css";
import { Alert, FormControl, FormGroup, Grid, Input } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";
import axios from "axios";
import baseUrl from "../../Common/baseUrl";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const ProfileUpdate = ({ admin, setAdmin }) => {
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
    if (admin) {
      setAdminDetails({ ...admin });
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
    localStorage.setItem("loggedIn", JSON.stringify(adminDetails));
    const updateAdminProfile = await axios.patch(
      `${baseUrl}/api/admin/update-admin`,
      {
        ...adminDetails,
        avatar: profilePic ? profilePic : adminDetails.profileImage,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (updateAdminProfile.status === 200) {
      setProfilePic(null);
      setAdmin(updateAdminProfile.data.data);
      localStorage.setItem(
        "loggedIn",
        JSON.stringify(updateAdminProfile.data.data)
      );
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
              {/* -------------------------------------------------------------------  */}
              <div className="profile-detail-container">
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  {/* <label>Profile Pic:</label> */}
                  <img
                    className="profile-pic"
                    src={adminDetails.profileImage}
                    alt="profile-pic"
                  />
                  {isEdit && (
                    <Button component="label">
                      <AddAPhotoIcon className="camera-icon" />
                      <input
                        type="file"
                        hidden
                        onChange={(e) => setProfilePic(e.target.files[0])}
                      />
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div className="detail-field">
                    <label>First Name : </label>
                    {isEdit ? (
                      <input
                        type="input"
                        name="firstName"
                        value={adminDetails.firstName}
                        onChange={change}
                        className="update_profile input-update-profile"
                      />
                    ) : (
                      <span>{adminDetails.firstName}</span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="form-field detail-field">
                    <label>Last Name : </label>
                    {isEdit ? (
                      <input
                        type="input"
                        name="lastName"
                        value={adminDetails.lastName}
                        onChange={change}
                        className="update_profile input-update-profile"
                      />
                    ) : (
                      <span>{adminDetails.lastName}</span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="detail-field">
                    <label>Email : </label>
                    <span>{adminDetails.email}</span>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="detail-field">
                    <label>Phone Number : </label>
                    {isEdit ? (
                      <input
                        type="input"
                        name="phoneNumber"
                        value={adminDetails.phoneNumber}
                        onChange={change}
                        className="update_profile input-update-profile"
                      />
                    ) : (
                      <span>{adminDetails.phoneNumber}</span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <div
                      className="btn-grp"
                      style={{ display: "block", marginTop: 20 }}
                    >
                      {isEdit ? (
                        <>
                          <Button
                            onClick={onSave}
                            variant="contained"
                            style={{
                              background: "#68BF90",
                              marginRight: "10px",
                              padding: "5px 50px",
                            }}
                            className="submit"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setIsEdit(!isEdit)}
                            variant="contained"
                            style={{
                              background: "#7e50ee",
                              padding: "5px 50px",
                            }}
                            className="submit"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setIsEdit(!isEdit)}
                          variant="contained"
                          style={{
                            background: "#7e50ee",
                            marginRight: "0",
                            padding: "5px 50px",
                          }}
                          className="submit"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </FormGroup>
                </Grid>
              </div>
            </Grid>
          </FormControl>
        </div>
      </Box>
    </>
  );
};

export default ProfileUpdate;