import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashbord/Dashboard.js";
import Sidebar from "./components/Navigation/sidebar/Sidebar.js";
import Login from "./components/LoginRegister";
import ChangePassword from "./components/Navigation/changePassword";
import ProfileUpdate from "./components/Navigation/ProfileUpdate";
import FeedbackComponent from "./components/Common/FeedbackComponent";
import CustomersComponent from "./components/Customers/CustomersComponent";
import BusinessesComponent from "./components/Businesses/BusinessesComponent";
function App() {
  const auth = localStorage.getItem("loggedIn");
  // console.log("adminDetails", auth);
  const [adminDetails, setAdminDetails] = useState(JSON.parse(auth));
  const navigate = useNavigate();
  useEffect(() => {
    !auth && navigate("/login");
  }, [auth]);
  return (
    <>
      {auth ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route
              path="/profile"
              element={
                <ProfileUpdate
                  admin={adminDetails}
                  setAdmin={setAdminDetails}
                />
              }
            />
            <Route
              path="/feedback/customer/:email"
              element={<FeedbackComponent />}
            />
            <Route
              path="/feedback/business/:email"
              element={<FeedbackComponent />}
            />
            <Route path="/customers" element={<CustomersComponent />} />
            <Route path="/businesses" element={<BusinessesComponent />} />
            <Route path="/allfeedback" element={<FeedbackComponent />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}
export default App;
