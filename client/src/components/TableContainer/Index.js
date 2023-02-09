/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";

const businessData = [
	{
		id: 1,
		lastName: "Rahul",
		firstName: "Rauniyar",
		email: "rahulrauniyar@otssolutions.com",
		status: "active",
		actions: <DeleteIcon />,
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
const customerData = [
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
	const [data, setData] = React.useState([]);
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
			editable: true,
		},
		{
			field: "lastName",
			headerName: "Last name",
			width: 140,
			editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			width: 180,
			editable: true,
		},
		{
			field: "Phone",
			headerName: "Phone No",
			width: 140,
			editable: true,
		},
		{
			field: "status",
			headerName: "Status",
			width: 120,
			editable: true,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 140,
			editable: true,
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
				experimentalFeatures={{ newEditingApi: true }}
				actions={[
					{
						icon: <DeleteIcon />,
						tooltip: "Delete User",
					},
				]}
			/>
		</Box>
	);
}
