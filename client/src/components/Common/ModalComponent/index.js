import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { color } from "@mui/system";

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
const ModalComponent = ({ msg, open, close, getAction,isActive }) => {
  console.log("isactive model",isActive)
  const [modelClose, setModelClose] = useState("");
  const onHandleDelete = () => {
    getAction();
    setModelClose(close);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close || modelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title">
            {msg === "active" && isActive && "Do You Want To Inactivate"}
            {msg === "active" && !isActive && "Do You Want To Activate"}
            {msg === "delete" ? "Are You Sure? Do You Want To Delete":""} 
          </Typography>
          <Button onClick={onHandleDelete}>Yes</Button>
          <Button onClick={close}>No</Button>
        </Box>
      </Modal>
    </>
  );
};
export default ModalComponent;