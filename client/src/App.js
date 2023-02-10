import "./App.css";

import { Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard.js";
import Business from "./components/pages/Business.js";
// import Customers from "./components/pages/Customers";
import Sidebar from "./components/Sidebar";
import Login from "./components/LoginRegister";
import ChangePassword from "./components/changePassword";
import ProfileUpdate from "./components/ProfileUpdate";
import FeedbackComponent from "./components/FeedbackComponent";
import Customers from "./components/pages/Customers";
// client\src\components\pages\Custmors.js

function App() {
	return (
		<>
			<Sidebar>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/business" element={<Business />} />
					<Route path="/customers" element={<Customers />} />
					<Route path="/login" element={<Login />} />
					<Route path="/changepassword" element={<ChangePassword />} />
					<Route path="/profile" element={<ProfileUpdate />} />
					<Route path="/feedback/:id" element={<FeedbackComponent />} />
				</Routes>
			</Sidebar>
		</>
	);
}

export default App;