import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Logout(props) {
	const { logout } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		logout();
		navigate("/login");
	}, []);
	return null;
}

export default Logout;
