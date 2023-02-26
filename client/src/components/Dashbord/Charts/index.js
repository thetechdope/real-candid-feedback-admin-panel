import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChartComponent = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  // console.log(notHappy);
  // console.log(neutral);
  // console.log(happy);
  useEffect(() => {
    getAllFeedbacks();
  }, []);

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

  return (
    <div style={{ width: "98%", height: "auto" }}>
      <Bar data={FeedbackStatus} />
    </div>
  );
};

export default BarChartComponent;
