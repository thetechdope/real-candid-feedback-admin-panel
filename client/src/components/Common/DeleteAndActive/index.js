import React, { useState } from "react";
import { FormControlLabel, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "../ModalComponent";
import "./index.css";
import axios from "axios";
import { red, green } from "@mui/material/colors";
import baseUrl from "../baseUrl";

// ----------------- common file for the Icons -------------------------

export const DeleteAndPowerIcon = ({
  mail,
  userType,
  getUpdatedData,
  isActive,
}) => {
  const [open, setOpen] = useState();
  const [action, setAction] = useState("");
  // console.log("isActive", isActive)
  // ----------------------------------------------------
  const handleActiveClick = () => {
    setOpen("Active");
    setAction("activate");
  };
  const handleDeleteClick = () => {
    setOpen("delete");
    setAction("delete");
  };
  const onHandleClose = () => {
    setOpen(false);
  };

  // ------------------------------------------------
  const activateDeleteByEmail = async () => {
    try {
      if (action === "activate") {
        const FeedBackResponse = await axios.patch(
          `${baseUrl}/api/${userType}/activate-deactivate`,
          userType === "customers" ? { email: mail } : { businessEmail: mail }
        );
        console.log("FeedBackResponse", FeedBackResponse);
        if (FeedBackResponse.status) {
          // console.log("setCallApi", setCallApi)
          getUpdatedData();
        }
      }
      if (action === "delete") {
        // console.log(`do you want to ${action} ${userType} of email ${mail}`);
        const FeedBackResponse = await axios.delete(
          `${baseUrl}/api/${userType}/delete/${mail}`
        );
        // console.log("FeedBackResponse for delete", FeedBackResponse);
        if (FeedBackResponse.status) {
          // console.log("setCallApi", setCallApi)
          getUpdatedData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAction = () => {
    // console.log("Action Yes is called", mail, userType);
    activateDeleteByEmail();
  };

  return (
    <FormControlLabel
      control={
        <>
          <IconButton sx={{ color: isActive ? green[500] : red[500] }}>
            <PowerSettingsNewIcon onClick={handleActiveClick} />
          </IconButton>
          <IconButton sx={{ color: pink[500] }}>
            <DeleteIcon onClick={handleDeleteClick} />
          </IconButton>
          <div>
            {open === "Active" && (
              <ModalComponent
                isActive={isActive}
                getAction={getAction}
                open="true"
                close={onHandleClose}
                msg="active"
              />
            )}
          </div>
          <div>
            {open === "delete" && (
              <ModalComponent
                getAction={getAction}
                open="true"
                close={onHandleClose}
                msg="delete"
              />
            )}
          </div>
        </>
      }
    />
  );
};
