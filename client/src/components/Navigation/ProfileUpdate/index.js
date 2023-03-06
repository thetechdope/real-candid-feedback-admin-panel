import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./index.css";
import { Alert, FormControl, FormGroup, Grid } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";
import axios from "axios";
import baseUrl from "../../Common/baseUrl";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPng from "../../../images/admin.png";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [loading, setLoading] = useState(false);

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
    if (profilePic) {
      setLoading(true);
    } else {
      setLoading(true);
    }
    const updateAdminProfile = await axios.patch(
      `${baseUrl}/api/admin/update-admin`,
      {
        ...adminDetails,
        avatar: profilePic ? profilePic : adminDetails.profileImage,
      },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (updateAdminProfile.status === 200) {
      setAdmin(updateAdminProfile.data.data);
      setProfilePic(null);
      setLoading(false);
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
          <FormControl className="update_profile">
            <Grid container spacing={2}>
              {isSave && (
                <Alert
                  sx={{ width: "50%", marginTop: 0, margin: "0 auto" }}
                  severity="success"
                >
                  Profile Is updated
                </Alert>
              )}
              {/* -------------------------------------------------------------------  */}
              <div className="profile-detail-container">
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
                      <DeleteIcon
                        fontSize="small"
                        className="delete-icon"
                        onClick={() => {
                          setAdminDetails((prevState) => ({
                            ...prevState,
                            profileImage: "",
                          }));
                        }}
                      />
                      <Button component="label" className="profile-camera-icon">
                        <AddAPhotoIcon className="camera-icon" />
                        <input
                          type="file"
                          hidden
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
                    </>
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
                            endIcon={
                              loading && (
                                <CircularProgress size={24} color="inherit" />
                              )
                            }
                            variant="contained"
                            style={{
                              background: "#68BF90",
                              marginRight: "10px",
                              padding: "5px 50px",
                            }}
                            className="submit"
                          >
                            {!loading && <>Save</>}
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
