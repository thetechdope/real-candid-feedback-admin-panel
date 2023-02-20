/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TableContainerComponent from "../Common/TableContainerComponent";
import axios from "axios";
import HeaderComponent from "../Common/HeaderComponent";
import { DeleteAndPowerIcon } from "../Common/DeleteAndActive";
import { CircularProgress } from "@mui/material";

function BusinessesComponent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [businesses, setBusinesses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchedBusinesses, setSearchedBusinesses] = useState([]);

	// For Loading Initial Data
	useEffect(() => {
		setIsLoading(true);
		const getBusinessesData = async () => {
			const response = await axios.get(`http://34.212.54.70:3000/api/businesses/`);
			setBusinesses(response.data.map((customer) => ({ ...customer, id: customer._id })));
			setIsLoading(false);
		};
		getBusinessesData();
	}, []);

	// For Filtering
	useEffect(() => {
		if (searchTerm !== "") {
			const businessesSearched = businesses.filter((business) => {
				if (
					business.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					business.businessEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					business.businessWebsiteUrl?.toLowerCase().includes(searchTerm.toLowerCase())
				) {
					return true;
				}
				return false;
			});

			setSearchedBusinesses(businessesSearched);
		}
	}, [searchTerm]);

	const businessesColumns = [
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
						<DeleteAndPowerIcon index={params.id} />
					</div>
				);
			},
		},
	];

	const handleSearch = (event) => {
		event.preventDefault();
		setSearchTerm(event.target.value);
	};

	return (
		<div>
			<HeaderComponent heading="Manage Businesses" />
			{isLoading && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100vh",
					}}
				>
					<CircularProgress />
				</div>
			)}
			{!isLoading && (
				<>
					<div className="customer-component">
						<TableContainerComponent
							rows={searchTerm !== "" ? searchedBusinesses : businesses}
							columns={businessesColumns}
							placeholderText={`Search (Business Name, Business Email, Business Url)`}
							handleSearch={handleSearch}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default BusinessesComponent;
