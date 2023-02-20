import React, { useState } from "react";
import { FormControlLabel, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "../ModalComponent";
import "./index.css";

// ----------------- common file for the Icons -------------------------

export const DeleteAndPowerIcon = ({ index }) => {
  const [open, setOpen] = useState();
  const handleEditClick = () => {
    setOpen("Active");
  };

  const handleDeleteClick = () => {
    setOpen("delete");
  };
  const onHandleClose = () => {
    setOpen(false);
  };

  return (
    <FormControlLabel
      control={
        <>
          <IconButton color="secondary">
            <PowerSettingsNewIcon onClick={handleEditClick} />
          </IconButton>
          <IconButton sx={{ color: pink[500] }}>
            <DeleteIcon onClick={handleDeleteClick} />
          </IconButton>
          <div>
            {open === "Active" && (
              <ModalComponent open="true" close={onHandleClose} msg="active" />
            )}
          </div>
          <div>
            {open === "delete" && (
              <ModalComponent open="true" close={onHandleClose} msg="delete" />
            )}
          </div>
        </>
      }
    />
  );
};
