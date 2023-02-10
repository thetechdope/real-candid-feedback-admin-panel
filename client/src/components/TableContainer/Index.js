/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControlLabel, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export const businessData = [
	{
		id: 1,
		lastName: "Rahul",
		firstName: "Rauniyar",
		email: "rahulrauniyar@otssolutions.com",
		status: "active",
		Phone: +918546001170,
	},
	{ id: 2, lastName: "Lannister", firstName: "Cersei" },
	{ id: 3, lastName: "Lannister", firstName: "Jaime" },
	{ id: 4, lastName: "Stark", firstName: "Arya" },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 21 },
	{ id: 6, lastName: "Melisandre", firstName: "", age: 140 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export const customerData = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 21 },
	{ id: 6, lastName: "Melisandre", firstName: "", age: 140 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function CustomerTableData({ searchedData }) {
	const searchParams = useLocation();
	const navigate = useNavigate();
	const [data, setData] = React.useState([]);
	const MatEdit = ({ index }) => {
		const handleEditClick = (e) => {
			console.log(e.target);
			// some action
		};

		return (
			<FormControlLabel
				control={
					<>
						<IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick}>
							<PowerSettingsNewIcon />
						</IconButton>
						<IconButton sx={{ color: pink[500] }} aria-label="add an alarm" onClick={handleEditClick}>
							<DeleteIcon />
						</IconButton>
					</>
				}
			/>
		);
	};
	const columns = [
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
			width: 180,
		},
		{
			field: "Phone",
			headerName: "Phone No",
			width: 140,
		},
		{
			field: "status",
			headerName: "Status",
			width: 120,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 140,
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
			const filteredData = data.filter((customer) => {
				let fullName = customer.firstName + customer.lastName;
				if (fullName.toLowerCase().includes(searchedData.toLowerCase())) {
					return true;
				} else {
					return false;
				}
			});
			setData(filteredData);
		} else {
			if (searchParams.pathname.slice(1) === "business") {
				setData(businessData);
			} else {
				setData(customerData);
			}
		}
	}, [searchedData]);

	return (
		<Box sx={{ height: 400, backgroundColor: "white", margin: 5, marginTop: 0, boxShadow: 3, borderRadius: 2 }}>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				onRowClick={(e) => navigate(`/feedback/${e.id}`)}


			/>
		</Box>
	);
}
