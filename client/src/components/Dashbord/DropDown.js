import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FeedbackComponent from "../Common/FeedbackComponent";
import BarChartComponent from "./Charts";

const DropDown = ({ allBusinessName }) => {
  const [email, setEmail] = React.useState("");
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
    console.log(event);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-form">
        <FormControl
          sx={{
            mt: 2,
            mb: 4,
            ml: 4,
            mr: 7,
            width: 200,
            background: "#fff",
            borderRadius: "4px",
            border: "none",
          }}
        >
          <InputLabel
            id="demo-multiple-name-label"
            style={{
              fontSize: "14px",
              margin: "-9px",
            }}
          >
            Businesses
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={email}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
            style={{ height: 35, border: 0 }}
          >
            {allBusinessName.map((val, index) => (
              <MenuItem key={index} value={val.email}>
                {val.name}
              </MenuItem>
            ))}
            {/* {console.log("business", allBusinessName)} */}
          </Select>
          {/* <div  >
        <FeedbackComponent noHeading='noHeading' businessEmail={email} />
        </div> */}
        </FormControl>
      </div>
      <BarChartComponent businessEmail={email} />

      <div>
        <FeedbackComponent
          sliceNumber={-6}
          noHeading="noHeading"
          businessEmail={email}
        />
      </div>
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
