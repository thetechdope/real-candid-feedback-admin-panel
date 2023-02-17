/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControlLabel, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import axios from "axios";
import base_url from "../../Base-url";

export default function CustomerTableData({ searchedData }) {
	const searchParams = useLocation();
	const navigate = useNavigate();
	const [data, setData] = React.useState([]);
	const MatEdit = ({ index }) => {
		const handleEditClick = () => {};

		const handleDeleteClick = () => {};

		return (
			<FormControlLabel
				control={
					<>
						<IconButton color="secondary" aria-label="add an alarm">
							<PowerSettingsNewIcon onClick={handleEditClick} />
						</IconButton>
						<IconButton sx={{ color: pink[500] }} aria-label="add an alarm">
							<DeleteIcon onClick={handleDeleteClick} />
						</IconButton>
					</>
				}
			/>
		);
	};

	const businessColumns = [
		{
			field: "Profile Pic",
			headerName: "Profile Pic",
			width: 140,
		},
		{
			field: "businessName",
			headerName: "Business Name",
			width: 140,
		},
		{
			field: "businessAddress",
			headerName: "Business Address",
			width: 140,
		},
		{
			field: "businessWebsiteUrl",
			headerName: "Website Url",
			width: 140,
		},
		{
			field: "businessEmail",
			headerName: "Email",
			width: 200,
		},
		{
			field: "businessPhoneNumber",
			headerName: "Phone No",
			width: 140,
		},
		{
			field: "isActive",
			headerName: "Status",
			width: 120,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 120,
			renderCell: (params) => {
				return (
					<div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
						<MatEdit index={params.id} />
					</div>
				);
			},
		},
	];

	const customersColumns = [
		{
			field: "Profile Pic",
			headerName: "Profile Pic",
			width: 140,
		},
		{
			field: "firstName",
			headerName: "First name",
			width: 140,
		},
		{
			field: "lastName",
			headerName: "Last name",
			width: 140,
		},
		{
			field: "email",
			headerName: "Email",
			width: 200,
		},
		{
			field: "phoneNumber",
			headerName: "Phone No",
			width: 140,
		},
		{
			field: "isActive",
			headerName: "Status",
			width: 120,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 120,
			renderCell: (params) => {
				return (
					<div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
						<MatEdit index={params.id} />
					</div>
				);
			},
		},
	];

	// -------- for searched components --------------------------------------

	useEffect(() => {
		if (searchedData.length > 0) {
			const filteredData = data.filter((curr) => {
				let fullName = curr.firstName + curr.lastName;
				let businessData = curr.businessName;
				console.log(businessColumns);
				if (fullName) {
					if (fullName.toLowerCase().includes(searchedData.toLowerCase())) {
						return true;
					} else {
						return false;
					}
				} else if (businessData) {
					if (businessData.toLowerCase().includes(searchedData.toLowerCase())) {
						return true;
					} else {
						return false;
					}
				}
			});
			setData(filteredData);
		} else {
			if (searchParams.pathname.slice(1) === "business") {
				const getBusiness = async () => {
					const data = await axios.get(`${base_url}/api/businesses/`);
					const newData = data.data.map((a) => ({ ...a, id: a._id }));
					console.log(newData);
					setData(newData);
				};
				getBusiness();
			} else {
				const getCustomersData = async () => {
					const data = await axios.get(`${base_url}/api/customers/`);
					const newData = data.data.map((a) => ({ ...a, id: a._id }));
					setData(newData);
				};
				getCustomersData();
			}
		}
	}, [searchedData]);

	return (
		<Box
			sx={{
				height: 370,
				backgroundColor: "white",
				margin: 5,
				marginTop: 0,
				boxShadow: 3,
				borderRadius: 2,
			}}
		>
			<DataGrid
				rows={data}
				columns={searchParams.pathname.slice(1) === "business" ? businessColumns : customersColumns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				onCellClick={(e) => e.field !== "actions" && navigate(`/feedback/${e.row.email}`)}
			/>
		</Box>
	);
}
