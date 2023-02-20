import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

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
const ModalComponent = ({ msg, open, close }) => {
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
              ? "Are you sure? Do you want to delete?"
              : "Do you want to inactive?"}
          </Typography>
          <Button onClick={close}>Yes</Button>
          <Button onClick={close}>No</Button>
        </Box>
      </Modal>
    </>
  );
};
export default ModalComponent;
