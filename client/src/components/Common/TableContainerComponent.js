import React, { useState } from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { DeleteAndPowerIcon } from "./DeleteAndActive";

function TableContainerComponent({
  rows,
  placeholderText,
  handleSearch,
  userType,
  getUpdatedData,
}) {
  const renderCell = (params) => {
    return (
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ cursor: "pointer" }}
      >
        {params.row.businessImage ? (
          <img
            style={{ width: 40, height: 40, borderRadius: "50%" }}
            src={params.row.businessImage}
            alt=""
          />
        ) : (
          <img
            style={{ width: 40, height: 40, borderRadius: "50%" }}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
        )}
      </div>
    );
  };

  const isDataPresent = (params) => {
    return <>{params ? <div>{params}</div> : <div>--</div>}</>;
  };

  const navigate = useNavigate();
  const [customerEmail, setCustomerEmail] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");

  const customerColumns = [
    {
      field: "Profile Pic",
      headerName: "Profile Pic",
      width: 100,
      renderCell: (params) => {
        return renderCell(params);
      },
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 130,
      renderCell: (params) => {
        return isDataPresent(params.row.firstName);
      },
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 130,
      renderCell: (params) => {
        return isDataPresent(params.row.lastName);
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 240,
      renderCell: (params) => {
        return isDataPresent(params.row.email);
      },
    },
    {
      field: "phoneNumber",
      headerName: "Phone No",
      width: 180,
      renderCell: (params) => {
        return isDataPresent(params.row.phoneNumber);
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive ? (
              <>Active</>
            ) : (
              <div style={{ color: "red" }}>InActive</div>
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <DeleteAndPowerIcon
              isActive={params.row.isActive}
              getUpdatedData={getUpdatedData}
              userType="customers"
              mail={customerEmail}
            />
          </div>
        );
      },
    },
  ];

  const businessesColumns = [
    {
      field: "Profile Pic",
      headerName: "Profile Pic",
      width: 80,
      renderCell: (params) => {
        return renderCell(params);
      },
    },
    {
      field: "businessName",
      headerName: "Business Name",
      width: 120,
      renderCell: (params) => {
        return isDataPresent(params.row.businessName);
      },
    },
    {
      field: "businessAddress",
      headerName: "Business Address",
      width: 150,
      renderCell: (params) => {
        return isDataPresent(params.row.businessAddress);
      },
    },
    {
      field: "businessWebsiteUrl",
      headerName: "Website Url",
      width: 170,
      renderCell: (params) => {
        return isDataPresent(params.row.businessWebsiteUrl);
      },
    },
    {
      field: "businessEmail",
      headerName: "Email",
      width: 190,
      renderCell: (params) => {
        return isDataPresent(params.row.businessEmail);
      },
    },
    {
      field: "businessPhoneNumber",
      headerName: "Phone No",
      width: 140,
      renderCell: (params) => {
        return isDataPresent(params.row.businessPhoneNumber);
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            {params.row.isActive ? (
              <>Active</>
            ) : (
              <div style={{ color: "red" }}>InActive</div>
            )}
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <DeleteAndPowerIcon
              isActive={params.row.isActive}
              getUpdatedData={getUpdatedData}
              userType="businesses"
              mail={businessEmail}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: "1rem" }}>
      {placeholderText && (
        <Input
          style={{ width: "20rem", marginLeft: "40px", marginBottom: "10px" }}
          placeholder={placeholderText}
          onChange={handleSearch}
        />
      )}
      <Box
        sx={{
          height: 400,
          backgroundColor: "white",
          margin: 5,
          marginTop: 0,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={
            userType === "customer" ? customerColumns : businessesColumns
          }
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={(e) => {
            if (e.field !== "actions") {
              if (e.row.email) {
                return navigate(`/feedback/customer/${e.row.email}`);
              } 
              // else {
              //   return navigate(`/feedback/business/${e.row.businessEmail}`);
              // }
            }
            if (e.field === "actions") {
              if (userType === "customer") {
                setCustomerEmail(e.row.email);
              }
              if (userType === "businesses") {
                setBusinessEmail(e.row.businessEmail);
              }
            }
          }}
        />
      </Box>
    </div>
  );
}

export default TableContainerComponent;
