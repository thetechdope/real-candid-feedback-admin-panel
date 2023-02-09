import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import "./index.css";

const DateAndTime = () => {
  const [value, setValue] = React.useState([null, null]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        label="Advanced keyboard"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <div className="date-box">
              <input ref={startProps.inputRef} {...startProps.inputProps} />
              <Box sx={{ mx: 1 }}> - </Box>
              <input ref={endProps.inputRef} {...endProps.inputProps} />
            </div>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateAndTime;
