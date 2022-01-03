import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { getAuthToken } from "../services/storageService";
import Navbar from "./Navbar";

function Layout({ children }) {
	const { loginUser } = useAuth();
	useEffect(() => {
		const token = getAuthToken();
		if (token) {
			loginUser(token);
		}
	}, []);
	return <Navbar>{children}</Navbar>;
}

export default Layout;
