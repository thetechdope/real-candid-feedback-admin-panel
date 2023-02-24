import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChartComponent = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [notHappy, setNotHappy] = useState("");
  const [neutral, setNeutral] = useState("");
  const [happy, setHappy] = useState("");

  // console.log(notHappy);
  // console.log(neutral);
  console.log(happy);
  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const getAllFeedbacks = async () => {
    const response = await axios.get(`http://34.212.54.70:3000/api/feedbacks`);
    // .then((res) => res.data);
    setFeedbackData(response.data);
    console.log(response.data.rating);
  };

  // const feedbackData = [
  //   { rating: "Not Happy", count: 10 },
  //   { rating: "Neutral", count: 20 },
  //   { rating: "Happy", count: 30 },
  // ];

  // const FeedbackStatus = {
  //   labels: feedbackData.map((data) => data.rating),
  //   datasets: [
  //     {
  //       data: feedbackData.map((data) => data.count),
  //       backgroundColor: ["green", "orange", "red"],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  return (
    <div style={{ width: "95%" }}>
      {/* {feedbackData.filter((item) => {
        if (item.rating == 0) {
          setNotHappy(item);
        } else if (item.rating == 1) {
          setNeutral(item);
        } else if (item.rating == 2) {
          setHappy(item);
        }
      })} */}
      {/* <Bar data={FeedbackStatus} /> */}
    </div>
  );
};

export default BarChartComponent;
