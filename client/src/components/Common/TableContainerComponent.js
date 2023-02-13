import React, { useState } from "react";
import Input from "@mui/joy/Input";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function TableContainerComponent({
  rows,
  columns,
  placeholderText,
  handleSearch,
}) {
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
          height: 370,
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
        />
      </Box>
    </div>
  );
}

export default TableContainerComponent;
