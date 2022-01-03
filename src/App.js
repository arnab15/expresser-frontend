import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login";
import Signup from "./Pages/SignUp";
import AuthContextProvider, { useAuth } from "./context/authContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Pages/Profile";
import Layout from "./Components/Layout";
import { useEffect } from "react";
import Home from "./Pages/Home";
import Logout from "./Pages/Logout";

function App() {
	return (
		<>
			<AuthContextProvider>
				<Layout>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="/profile/:username"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/logout"
							element={
								<ProtectedRoute>
									<Logout />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/home"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route path="/" element={<Navigate replace to="/home" />} />
					</Routes>
				</Layout>
			</AuthContextProvider>
		</>
	);
}

export default App;
