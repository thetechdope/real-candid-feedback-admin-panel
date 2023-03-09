import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import baseUrl from "../../Common/baseUrl";

const BarChartComponent = ({ businessEmail }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [showGraph, setShowGraph] = useState(true);

  useEffect(() => {
    getAllFeedbacks();
  }, [businessEmail]);

  const getAllFeedbacks = async () => {
    try {
      const response = businessEmail
        ? await axios.get(`${baseUrl}/api/feedbacks/business/${businessEmail}`)
        : await axios.get(`${baseUrl}/api/feedbacks`);
      // console.log("response.length" , response.data.length);
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
      setShowGraph(true);
      setFeedbackData(feedbackdata);
    } catch (error) {
      setShowGraph(false);
    }
  };

  const FeedbackStatus = {
    labels: feedbackData.map((data) => data.rating),
    datasets: [
      {
        label: "Rating",
        data: feedbackData.map((data) => data.count),
        backgroundColor: ["red", "orange", "green"],
        borderColor: "black",
        borderWidth: 0.5,
        barThickness: 50,
      },
    ],
  };

  return (
    <>
      {showGraph && (
        <>
          <h3
            style={{
              fontWeight: "600",
              fontSize: "23px",
            }}
            className="head-dashbord"
          >
            Rating Graph
          </h3>

          <div
            className="graph"
            style={{ width: "80%", height: "auto", margin: "0 auto" }}
          >
            <Bar data={FeedbackStatus} />
          </div>
        </>
      )}
    </>
  );
};
export default BarChartComponent;
