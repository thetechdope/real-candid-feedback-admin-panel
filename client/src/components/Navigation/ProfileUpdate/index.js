import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./index.css";
import { Alert, FormControl, FormGroup, Grid, Input } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";
import axios from "axios";
import baseUrl from "../../Common/baseUrl";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPng from "../../../images/admin.jpg"

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
        style={{
          width: "60%",
          background: "#fff",
          margin: "20px auto",
          height: 550,
          borderRadius: "8px",
        }}
      >
        <div className="form-content profile_form">
          <FormControl className="update_profile">
            <Grid container spacing={2}>
              {/* -------------------------------------------------------------------  */}
              <div className="profile-detail-container">
                {isSave && (
                  <Alert
                    sx={{
                      width: "100%",
                      marginTop: 0,
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                    severity="success"
                  >
                    Profile Is updated
                  </Alert>
                )}
                <Grid
                  item
                  xs={12}
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <img
                    className="profile-pic"
                    src={
                      adminDetails.profileImage
                        ? adminDetails.profileImage
                        : AdminPng
                    }
                    alt="profile-pic"
                  />

                  {isEdit && (
                    <>
                      <Button component="label" className="profile-camera-icon">
                        <DeleteIcon
                          className="camera-icon"
                          fontSize="small"
                          // className="delete-icon"
                          onClick={() => {
                            setAdminDetails((prevState) => ({
                              ...prevState,
                              profileImage: "",
                            }));
                          }}
                        />
                      </Button>
                      <div>
                        <Button
                          variant="contained"
                          component="label"
                          style={{
                            padding: "5px 60px",
                            marginRight: "0 !important",
                            // textTransform: "lowercase",
                          }}
                        >
                          Upload
                          <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={(e) => {
                              setProfilePic(e.target.files[0]);
                              setAdminDetails((prevState) => ({
                                ...prevState,
                                profileImage: URL.createObjectURL(
                                  e.target.files[0]
                                ),
                              }));
                            }}
                          />
                        </Button>
                      </div>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div className="detail-field" style={{ textAlign: "center" }}>
                    <label style={{ textAlign: "center" }}>Email </label>
                    <span>{adminDetails.email}</span>
                  </div>
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <Grid item xs={12}>
                    <div className="detail-field">
                      <label>First Name </label>
                      {isEdit ? (
                        <input
                          type="input"
                          name="firstName"
                          value={adminDetails.firstName}
                          onChange={change}
                          className="update_profile input-update-profile"
                        />
                      ) : (
                        <span style={{ width: "100%" }}>
                          {adminDetails.firstName}
                        </span>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="form-field detail-field">
                      <label style={{ width: "100%" }}>Last Name </label>
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
                </Grid>

                <Grid item xs={12}>
                  <div className="detail-field">
                    <label>Phone Number </label>
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
                            onClick={() => {
                              setIsEdit(!isEdit);
                              setAdminDetails({ ...admin });
                            }}
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
