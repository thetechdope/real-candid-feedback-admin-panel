import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TableContainerComponent from "../Common/TableContainerComponent";
import axios from "axios";
import HeaderComponent from "../Common/HeaderComponent";
// import { DeleteAndPowerIcon } from "../Common/DeleteAndActive";
import baseUrl from "../Common/baseUrl";

function CustomersComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [searchedCustomers, setSearchedCustomers] = useState([]);
  const [callApi, setCallApi] = useState(false);

  useEffect(() => {
    const getCustomersData = async () => {
      const response = await axios.get(`${baseUrl}/api/customers`);
      if (response.status === 200) {
        setIsLoading(false);
        setCustomers(
          response.data.map((customer) => ({ ...customer, id: customer._id }))
        );
      }
    };
    getCustomersData();
  }, [callApi]);

  // console.log("customers");
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

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <HeaderComponent heading="Manage Customers" />
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
              getUpdatedData={() => setCallApi(!callApi)}
              userType="customer"
              rows={searchTerm !== "" ? searchedCustomers : customers}
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
