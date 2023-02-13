import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard.js";
import Sidebar from "./components/Sidebar";
import Login from "./components/LoginRegister";
import ChangePassword from "./components/changePassword";
import ProfileUpdate from "./components/ProfileUpdate";
import FeedbackComponent from "./components/FeedbackComponent";
import CustomersComponent from "./components/Customers/CustomersComponent";
import BusinessesComponent from "./components/Businesses/BusinessesComponent";

function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/profile" element={<ProfileUpdate />} />
          <Route path="/feedback/:email" element={<FeedbackComponent />} />
          <Route path="/customers" element={<CustomersComponent />} />
          <Route path="/businesses" element={<BusinessesComponent />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default App;
