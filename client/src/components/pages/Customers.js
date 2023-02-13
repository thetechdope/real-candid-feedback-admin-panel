import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
import HeaderComponent from "../Common/HeaderComponent";
import Table from "../Table/Table";

// const columns = [
// 	{ field: "_id", headerName: "ID", editable: false },
// 	{
// 		field: "firstName",
// 		headerName: "FirstName",
// 		editable: true,
// 	},
// 	{
// 		field: "lastName",
// 		headerName: "LastName",
// 		editable: true,
// 	},
// 	{
// 		field: "email",
// 		headerName: "Email-Id",
// 		editable: true,
// 	},
// 	{
// 		field: "phoneNumber",
// 		headerName: "PhoneNumber",
// 		type: "number",
// 		editable: true,
// 	},
// 	{
// 		field: "status",
// 		headerName: "status",
// 		editable: false,
// 	},
// 	{
// 		field: "actions",
// 		headerName: "Action",
// 		component: <div>ABC</div>,
// 	},
// ];

const Customers = () => {
  // const [customerData, setCustomerData] = useState({});

  // useEffect(() => {
  // 	getCustomerData();
  // }, []);

  // const getCustomerData = async () => {
  // 	const response = await axios.get("http://localhost:3005/customers/");
  // 	console.log(response.data.FindCustomers);
  // 	setCustomerData(response.data.FindCustomers);
  // };
  // console.log(customerData);
  return (
    <>
      <HeaderComponent heading="Customer" />
      <Table />
      {/* <div style={{ height: 600, width: "100%" }}>
				<DataGrid rows={customerData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} getRowId={(row) => row._id} />
			</div> */}
    </>
  );
};

export default Customers;
