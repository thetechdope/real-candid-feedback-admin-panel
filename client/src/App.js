import "./App.css";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard.js";
import Business from "./components/pages/Business.js";
import Customers from "./components/pages/Custmors";
import Sidebar from "./components/Sidebar";
import Login from "./components/LoginRegister";

function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/business" element={<Business />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default App;
