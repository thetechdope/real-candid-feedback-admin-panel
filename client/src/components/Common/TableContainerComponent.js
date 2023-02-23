import React from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function TableContainerComponent({
  rows,
  columns,
  placeholderText,
  handleSearch,
}) {
  const navigate = useNavigate();

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
          height: 570,
          backgroundColor: "white",
          margin: 5,
          marginTop: 0,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={(e) => {
            if (e.field !== "actions") {
              if (e.row.email) {
                return navigate(`/feedback/customer/${e.row.email}`);
              } else {
                return navigate(`/feedback/business/${e.row.businessEmail}`);
              }
            }
          }}
        />
      </Box>
    </div>
  );
}

export default TableContainerComponent;
