import React, { useEffect, useState } from "react";
import CustomersData from "../data/CustomersData.js";
import BusinessesData from "../data/BusinessesData.js";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./index.css";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import DateAndTime from "../Date-picker/index.js";

const LineChartComponent = () => {
  const [customers, setCustomers] = useState({});
  const [businesses, setBusinesses] = useState({});
  const [chart, setChart] = useState("customer");
  console.log("value chart", chart);
  useEffect(() => {
    // Logic to call Customers API
    setBusinesses({
      labels: BusinessesData.map((data) => data.month),
      datasets: [
        {
          label: "Number Of Business Gained",
          data: BusinessesData.map((data) => data.noOfCustomersGained),
          borderColor: "green",
        },
      ],
    });

    setCustomers({
      labels: CustomersData.map((data) => data.month),
      datasets: [
        {
          label:"Number Of Customers Gained",
          data: CustomersData.map((data) => data.noOfCustomersGained),
        },
      ],
    });
  }, [chart]);

  return (
    <>
      <div className="chart-main-container" >
        
        <div className="chart-main">
          <div className="date-pick">
            <DateAndTime />
          </div>
          <div className="dropdown-content">
            <FormControl sx={{ minWidth: 130 }} size="small">
              <Select
                value={chart}
                onChange={(e) => {
                  setChart(e.target.value);
                }}
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <p className="chart-title">Sales over the Time</p>
        {chart == "customer" ? (
          <div >
            {Object.keys(customers).length > 0 && <Line data={customers} />}
            {Object.values(customers).length === 0 && (
              <h3>No. Customers Data Found</h3>
            )}
          </div>
        ) : (
          <div>
            {Object.keys(businesses).length > 0 && <Line data={businesses} />}
            {Object.values(businesses).length === 0 && (
              <h3>No. Customers Data Found</h3>
            )}
          </div>
        )}
        </div>
     
    </>
  );
};

export default LineChartComponent;
