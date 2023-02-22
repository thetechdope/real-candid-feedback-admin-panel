import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomerTableData from "../TableContainer/Index";

function Table() {
	const [searchedData, setSearchedData] = useState("");
	return (
		<div>
			<Box sx={{ "& > :not(style)": { m: 1, width: "25ch", marginLeft: 5 } }} noValidate autoComplete="off">
				<TextField label="Search" variant="standard" onChange={(e) => setSearchedData(e.target.value)} />
			</Box>
			<CustomerTableData searchedData={searchedData} />
		</div>
	);
}
export default Table;
