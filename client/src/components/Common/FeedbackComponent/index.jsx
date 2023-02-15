import React, { useState, useEffect } from "react";
import Burger from "../../../images/Burger.png";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.css";
import axios from "axios";
import { orange, red } from "@mui/material/colors";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import HeaderComponent from "../HeaderComponent";

// const FeedbacksComponent = () => {
//   const [customerData, setCustomerData] = useState([]);

//   const getCustomerData = async () => {
//     const response = await axios
//       .get(`http://localhost:5000/api/feedbacks`)
//       .then((res) => res.data)
//       .then((data) => {
//         // console.log(data);
//         setCustomerData(data);
//       });
//     // console.log("response", customerData);
//   };
//   console.log("customerData", customerData);
//   useEffect(() => {
//     getCustomerData();
//   }, []);

//   return (
//     <>
//       <HeaderComponent heading="Feedback" />
//       <div style={{ height: "100vh" }}>
//         {customerData.length &&
//           customerData.map((customerData) => (
//             <div className="feedback-component">
//               <div className="feedback-container">
//                 <div className="feedback-head">
//                   <div className="feedback-head-prim">
//                     <div className="users-one">
//                       <p>
//                         Customer Name:
//                         <span className="font-light">
//                           {customerData.customerName}
//                         </span>
//                       </p>
//                       <p>
//                         Company Name :{" "}
//                         <span className="font-light">
//                           {customerData.businessName}
//                         </span>
//                       </p>
//                     </div>
//                     <div className="rating">
//                       {customerData.rating === 0 && (
//                         <SentimentVeryDissatisfiedIcon
//                           sx={{ color: red[500] }}
//                         />
//                       )}
//                       {customerData.rating === 1 && (
//                         <SentimentSatisfiedIcon sx={{ color: orange[500] }} />
//                       )}
//                       {customerData.rating === 2 && (
//                         <SentimentSatisfiedAltIcon color="success" />
//                       )}
//                       <p className="font-faint">1 day ago</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="feedback-block">
//                   <img src={Burger} alt="" />
//                   <p>{customerData.feedback}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

const FeedbackComponent = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();
  // -------------------------- UseEffect for selected customer -----------------------------
  const getAllFeedbacksByEmail = async () => {
    setIsLoading(true);
    const customerResponse = await axios
      .get("http://localhost:5000/api/feedbacks/" + email)
      .then((res) => res.data);
    const businessResponse = await axios
      .get("http://localhost:5000/api/feedbacks/getByBusinesses/" + email)
      .then((res) => res.data);
    customerResponse.length > 0
      ? setFeedbackData(customerResponse)
      : setFeedbackData(businessResponse);
    setIsLoading(false);
  };
  useEffect(() => {
    if (email) {
      getAllFeedbacksByEmail();
    }
  }, [email]);
  // ----------------- initial useEffect for all feedbacks ------------------------------
  const getAllFeedbacks = async () => {
    setIsLoading(true);
    const response = await axios
      .get(`http://localhost:5000/api/feedbacks`)
      .then((res) => res.data);
    setFeedbackData(response);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!email) {
      getAllFeedbacks();
    }
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
        <>
          <HeaderComponent heading="Feedback" />{" "}
          {feedbackData.length > 0 ? (
            feedbackData.map((customerData) => (
              <div className="feedback-component">
                <div className="feedback-container">
                  <div className="feedback-head">
                    <div className="feedback-head-prim">
                      <div className="users-one">
                        <p>
                          Customer Name:
                          <span className="font-light">
                            {customerData.customerEmail}
                          </span>
                        </p>
                        <p>
                          Company Name :
                          <span className="font-light">
                            {customerData.businessEmail}
                          </span>
                        </p>
                      </div>
                      <div className="rating">
                        {customerData.rating === 0 && (
                          <SentimentVeryDissatisfiedIcon
                            sx={{ color: red[500] }}
                          />
                        )}
                        {customerData.rating === 1 && (
                          <SentimentSatisfiedIcon sx={{ color: orange[500] }} />
                        )}
                        {customerData.rating === 2 && (
                          <SentimentSatisfiedAltIcon color="success" />
                        )}
                        <p className="font-faint">1 day ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="feedback-block">
                    <img src={Burger} alt="" /> <p>{customerData.feedback}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>Sorry No feedback present by this customer / Business</h1>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackComponent;

// ----------------------------------------------------
// import { useLocation } from "react-router-dom";

// const searchParams = useLocation();

// searchParams.pathname.slice(1) // this will give you a email address from params
