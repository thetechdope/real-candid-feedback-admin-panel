import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FormControlLabel, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ----------------- common file for the Icons -------------------------

export const DeleteAndPowerIcon = ({ index }) => {
  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  return (
    <FormControlLabel
      control={
        <>
          <IconButton color="secondary" >
            <PowerSettingsNewIcon onClick={handleEditClick} />
          </IconButton>
          <IconButton sx={{ color: pink[500] }} >
            <DeleteIcon onClick={handleDeleteClick} />
          </IconButton>
        </>
      }
    />
  );
};




const DeleteAndActive = ({ msg, open, close }) => {
  //   console.log("msg", msg, open);
  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">
            {msg == "delete"
              ? "Do you want to delete this customer?"
              : "Do you want to inactive this customer?"}
          </Typography>
          <Button onClick={close}>Yes</Button>
          <Button onClick={close}>No</Button>
        </Box>
      </Modal>
    </>
  );
};
export default DeleteAndActive;
