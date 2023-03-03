import React, { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../Common/baseUrl";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function DropdownComponent() {
  const [businesses, setBusinesses] = useState([]);
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    // Fetch the list of businesses from the API
    axios.get(`${baseUrl}/api/businesses`).then((response) => {
      setBusinesses(response.data);

    });
  }, []);



  useEffect(() => {
    if (businessEmail) {
      axios
        .get(`${baseUrl}/api/feedbacks/business/${businessEmail}`)
        .then((response) => {
          console.log(
            "Fetch the data for the selected business ",
            response.data
          );
          setBusinessData(response.data);
        });
    }
  }, [businessEmail]);

  const handleBusinessChange = (businessEmail) => {
    // setBusinessEmail(e.target.value);
    console.log("obchange",businessEmail)  
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="business-label">Select a business</InputLabel>
        <Select
        size="large"
          labelId="business-label"
          value={businessEmail}
          onChange={handleBusinessChange}
        >
          {businesses.map((business) => (
            <MenuItem key={business.id} value={business.id}>
              {business.businessEmail}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {businessData && (
        <div>
          <h2>{businessData.name}</h2>
          <p>{businessData.description}</p>
          {/* Render other data fields as needed */}
        </div>
      )}
    </div>
  );
}

export default DropdownComponent;
