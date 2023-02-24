import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./index.css";
import { FormControl, FormGroup, Grid, Input } from "@mui/material";
import HeaderComponent from "../../Common/HeaderComponent";

const ProfileUpdate = () => {
	let loginAdmin = JSON.parse(localStorage.getItem("loggedIn"));
	const [adminDetails, setAdminDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: 0,
		profileImage: "",
		_id: "",
	});
	const [isEdit, setIsEdit] = useState(false);
	useEffect(() => {
		if (loginAdmin) {
			setAdminDetails({ ...loginAdmin });
		}
	}, []);
	const change = (e) => {
		const { name, value } = e.target;
		setAdminDetails((prevState) => ({ ...prevState, [name]: value }));
	};
	const onSave = () => {
		console.log(adminDetails);
		localStorage.setItem("loggedIn", JSON.stringify(adminDetails));
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
					<FormControl className="profile_form">
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<div>
									<label>FirstName :</label>
									{isEdit ? (
										<input type="input" name="firstName" value={adminDetails.firstName} onChange={change} />
									) : (
										<span>{adminDetails.firstName}</span>
									)}
								</div>
							</Grid>
							<Grid item xs={6}>
								<div className="form-field">
									<label>LastName : </label>
									{isEdit ? (
										<input type="input" name="lastName" value={adminDetails.lastName} onChange={change} />
									) : (
										<span>{adminDetails.lastName}</span>
									)}
								</div>
							</Grid>
							<Grid item xs={6}>
								<div>
									<label>Email : </label>
									{isEdit ? (
										<input type="input" name="email" value={adminDetails.email} onChange={change} />
									) : (
										<span>{adminDetails.email}</span>
									)}
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
										/>
									) : (
										<span>{adminDetails.phoneNumber}</span>
									)}
								</div>
							</Grid>
							<Grid item xs={6}>
								<FormGroup>
									<label>Profile Pic:</label>
									<img className="profile-pic" src={adminDetails.profileImage} alt="profile-pic" />
									{isEdit && (
										<Input variant="contained" type="file" component="label">
											Upload File
										</Input>
									)}
									<div className="btn-grp">
										{isEdit ? (
											<>
												<Button
													onClick={onSave}
													variant="contained"
													style={{ background: "#7e50ee" }}
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
					{/* )} */}
				</div>
			</Box>
		</>
	);
};

export default ProfileUpdate;
