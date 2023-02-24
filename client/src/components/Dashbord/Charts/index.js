import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
<<<<<<< HEAD
import { Chart as ChartJS } from "chart.js/auto";

const BarChartComponent = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  let unhappy = 0;
  let neutral = 0;
  let happy = 0;
=======
import Chart from "chart.js/auto";

const BarChartComponent = () => {
  const [feedbackData, setFeedbackData] = useState([]);
>>>>>>> 1f7ff5c4313e34ed0f59a3c5b8097d3729f28376

  useEffect(() => {
    getAllFeedbacks();
  }, []);
<<<<<<< HEAD

  const getAllFeedbacks = async () => {
    const response = await axios.get(`http://34.212.54.70:3000/api/feedbacks`);
=======

  const getAllFeedbacks = async () => {
    const response = await axios.get(`http://34.212.54.70:3000/api/feedbacks`);

    let unhappy = 0;
    let neutral = 0;
    let happy = 0;
    response.data.forEach((item) => {
      if (item.rating === 0) {
        unhappy++;
      }
      if (item.rating === 1) {
        neutral++;
      }
      if (item.rating === 2) {
        happy++;
      }
    });

    const feedbackdata = [
      { rating: "Not Happy", count: unhappy },
      { rating: "Neutral", count: neutral },
      { rating: "Happy", count: happy },
    ];

    setFeedbackData(feedbackdata);
  };
  console.log(feedbackData);

  const FeedbackStatus = {
    labels: feedbackData.map((data) => data.rating),
    datasets: [
      {
        data: feedbackData.map((data) => data.count),
        backgroundColor: ["red", "orange", "green"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
>>>>>>> 1f7ff5c4313e34ed0f59a3c5b8097d3729f28376

    response.data.forEach((item) => {
      if (item.rating === 0) {
        unhappy++;
      }
      if (item.rating === 1) {
        neutral++;
      }
      if (item.rating === 2) {
        happy++;
      }
    });
    const feedbackdata = [
      { rating: "Not Happy", count: unhappy },
      { rating: "Neutral", count: neutral },
      { rating: "Happy", count: happy },
    ];
    setFeedbackData(feedbackdata);
  };
  // console.log(feedbackData);
  const FeedbackStatus = {
    labels: feedbackData.map((data) => data.rating),
    datasets: [
      {
        data: feedbackData.map((data) => data.count),
        backgroundColor: ["red", "orange", "green"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return (
<<<<<<< HEAD
    <div style={{ width: "95%" }}>
=======
    <div style={{ width: "98%", height: "auto" }}>
>>>>>>> 1f7ff5c4313e34ed0f59a3c5b8097d3729f28376
      <Bar data={FeedbackStatus} />
    </div>
  );
};
<<<<<<< HEAD
=======

>>>>>>> 1f7ff5c4313e34ed0f59a3c5b8097d3729f28376
export default BarChartComponent;
