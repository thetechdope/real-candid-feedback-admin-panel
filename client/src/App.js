import "./App.css";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashbord/Dashboard.js";
import Sidebar from "./components/Navigation/sidebar/Sidebar.js";
import Login from "./components/LoginRegister";
import ChangePassword from "./components/Navigation/changePassword";
import ProfileUpdate from "./components/Navigation/ProfileUpdate";
import FeedbackComponent from "./components/Common/FeedbackComponent";
import CustomersComponent from "./components/Customers/CustomersComponent";
import BusinessesComponent from "./components/Businesses/BusinessesComponent";

export const GetSetLoginUser = createContext();
function App() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("loggedIn"));
  const [currentLoginUser, setCurrentLoginUser] = useState(auth);
  useEffect(() => {
    !currentLoginUser && navigate("/login");
  }, [currentLoginUser]);

  const setAdmin = (user) => {
    setCurrentLoginUser(user);
    localStorage.setItem("loggedIn", JSON.stringify(user));
  };
  return (
    <>
      {auth ? (
        <GetSetLoginUser.Provider value={[currentLoginUser, setAdmin]}>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/profile" element={<ProfileUpdate />} />
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
        </GetSetLoginUser.Provider>
      ) : (
        <GetSetLoginUser.Provider value={[currentLoginUser, setAdmin]}>
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </GetSetLoginUser.Provider>
      )}
    </>
  );
}

export default App;
