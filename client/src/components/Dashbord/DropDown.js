import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FeedbackComponent from "../Common/FeedbackComponent";
import BarChartComponent from "./Charts";
import axios from "axios";
import baseUrl from "../Common/baseUrl";

const DropDown = ({ allBusinessName }) => {
  const [email, setEmail] = React.useState("");
  const [allFeedbacksData, setAllFeedbacksData] = useState([]);
  const [filterFeedbacksData, setFilterFeedbacksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmail(value);
  };

  useEffect(() => {
    getAllFeedbacksByEmail();
  }, [email]);

  useEffect(() => {
    getAllFeedbacks();
  }, [allFeedbacksData]);

  const getAllFeedbacksByEmail = () => {
    const filterFeedbacks = allFeedbacksData.filter((curr) => {
      if (curr.businessEmail === email) {
        return true;
      }
      return false;
    });
    setFilterFeedbacksData(filterFeedbacks);
  };

  const getAllFeedbacks = () => {
    axios.get(`${baseUrl}/api/feedbacks`).then((res) => {
      setAllFeedbacksData(res.data.reverse());
      setIsLoading(false);
    });
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
            style={{ fontSize: "14px" }}
          >
            All Business
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
          </Select>
        </FormControl>
      </div>
      <BarChartComponent
        allFeedbacksData={email ? filterFeedbacksData : allFeedbacksData}
      />
      <div>
        <FeedbackComponent
          sliceNumber={-6}
          isLoading={isLoading}
          noHeading="noHeading"
          allFeedbacksData={email ? filterFeedbacksData : allFeedbacksData}
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
