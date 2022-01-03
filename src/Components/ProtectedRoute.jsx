import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ children }) {
	const { currentUser, authLoading } = useAuth();
	let location = useLocation();
	console.log("pr", location);
	return !authLoading && currentUser ? children : <Navigate state={{ from: location.pathname }} to="/login" />;
}

export default ProtectedRoute;
