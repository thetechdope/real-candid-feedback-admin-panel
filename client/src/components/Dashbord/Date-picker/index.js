<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 16d285587f1c30cf9a311962be523dbefb5f5c5c
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const onChange = (date) => {
  if (date) {
    console.log("Date: ", date);
  } else {
    console.log("Clear");
  }
};
const onRangeChange = (dates, dateStrings) => {
  if (dates) {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  } else {
    console.log("Clear");
  }
};
const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];
const DateAndTime = () => (
  <Space direction="vertical" size={12}>
    {/* <DatePicker
      presets={[
        {
          label: "Yesterday",
          value: dayjs().add(-1, "d"),
        },
        {
          label: "Last Week",
          value: dayjs().add(-7, "d"),
        },
        {
          label: "Last Month",
          value: dayjs().add(-1, "month"),
        },
      ]}
      onChange={onChange}
    /> */}
    <RangePicker presets={rangePresets} onChange={onRangeChange} />
  </Space>
);
export default DateAndTime;
<<<<<<< HEAD
=======
=======
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const onChange = (date) => {
  if (date) {
    console.log("Date: ", date);
  } else {
    console.log("Clear");
  }
};
const onRangeChange = (dates, dateStrings) => {
  if (dates) {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  } else {
    console.log("Clear");
  }
};
const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];
const DateAndTime = () => (
  <Space direction="vertical" size={12}>
    {/* <DatePicker
      presets={[
        {
          label: "Yesterday",
          value: dayjs().add(-1, "d"),
        },
        {
          label: "Last Week",
          value: dayjs().add(-7, "d"),
        },
        {
          label: "Last Month",
          value: dayjs().add(-1, "month"),
        },
      ]}
      onChange={onChange}
    /> */}
    <RangePicker presets={rangePresets} onChange={onRangeChange} />
  </Space>
);
export default DateAndTime;
>>>>>>> 6221b3f0dc92abb6bb88a5cc35f39a4d3ba56102
>>>>>>> 16d285587f1c30cf9a311962be523dbefb5f5c5c
