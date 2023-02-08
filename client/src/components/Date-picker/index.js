import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import moment from "moment";
import "./index.css";

const DateAndTime = () => {
  const [value, setValue] = React.useState([null, null]);
  // ----------------------------------------------------------------
  var getDaysBetweenDates = function (startDate, endDate) {
    var now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("MM/DD/YYYY"));
      now.add(1, "days");
    }
    return dates;
  };

  var startDate = moment("2021-01-02");
  var endDate = moment("2021-01-0");

  var dateList = getDaysBetweenDates(startDate, endDate);
  console.log(dateList);
  // ----------------------------------------------------------------
  console.log("data", value);
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
