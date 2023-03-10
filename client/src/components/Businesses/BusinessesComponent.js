import React, { useState, useEffect } from "react";
import TableContainerComponent from "../Common/TableContainerComponent";
import axios from "axios";
import HeaderComponent from "../Common/HeaderComponent";
import baseUrl from "../Common/baseUrl";
import { CircularProgress } from "@mui/material";

function BusinessesComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedBusinesses, setSearchedBusinesses] = useState([]);
  const [callApi, setCallApi] = useState(false);

  // For Loading Initial Data
  useEffect(() => {
    const getBusinessesData = async () => {
      const response = await axios.get(`${baseUrl}/api/businesses`);
      if (response.status === 200) {
        setIsLoading(false);
        setBusinesses(
          response.data.map((customer) => ({ ...customer, id: customer._id }))
        );
      }
    };
    getBusinessesData();
  }, [callApi]);

  // For Filtering
  useEffect(() => {
    if (searchTerm !== "") {
      const businessesSearched = businesses.filter((business) => {
        if (
          business.businessName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          business.businessEmail
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          business.businessWebsiteUrl
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          
          return true;
        }
        return false;
      });

      setSearchedBusinesses(businessesSearched);
    }
  }, [searchTerm]);

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
              getUpdatedData={() => setCallApi(!callApi)}
              userType="businesses"
              rows={searchTerm !== "" ? searchedBusinesses : businesses}
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
