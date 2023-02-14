import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import TableContainerComponent from "../Common/TableContainerComponent";
import axios from "axios";
import HeaderComponent from "../Common/HeaderComponent";
import { DeleteAndPowerIcon } from "../Common/DeleteAndActive";

function CustomersComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchedCustomers, setSearchedCustomers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getCustomersData = async () => {
      const response = await axios.get(`http://localhost:5000/api/customers/`);
      setCustomers(
        response.data.map((customer) => ({ ...customer, id: customer._id }))
      );
      setIsLoading(false);
    };
    getCustomersData();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      const customersSearched = customers.filter((customer) => {
        if (
          customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      setSearchedCustomers(customersSearched);
    }
  }, [searchTerm]);

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
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
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
          <HeaderComponent heading="Manage Customers" />
          <div className="customer-component">
            <TableContainerComponent
              rows={searchTerm !== "" ? searchedCustomers : customers}
              columns={customersColumns}
              handleSearch={handleSearch}
              placeholderText={`Search (First Name, Last Name, Email)`}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CustomersComponent;
