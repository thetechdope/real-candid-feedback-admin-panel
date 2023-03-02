import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FeedbackComponent from "../Common/FeedbackComponent";
const DropDown = ({ allEmail }) => {
  const [email, setEmail] = React.useState("");
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Business Email</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={email}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {allEmail.map((email, index) => (
            <MenuItem key={index} value={email}>
              {email}
            </MenuItem>
          ))}
        </Select>
        <FeedbackComponent businessEmail={email} />
      </FormControl>
    </div>
  );
};

export default DropDown;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
