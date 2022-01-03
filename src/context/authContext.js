import React, { createContext, useContext, useEffect, useState } from "react";
import {
	decodeCurrentUser,
	setAuthToken as setAuthTokenInLocalStorage,
	deleteAuthToken,
	getAuthToken,
} from "../services/storageService";

const Authcontext = createContext({
	currentUser: null,
	logout() {},
	isAuthenticated: false,
	setCurrentUser(user) {},
	authLoading: false,
	authToken: null,
	loginUser(token) {},
	setUserFromLocalStorage() {},
	currentUserProfile: null,
	saveCurrentUserProfile() {},
});
Authcontext.displayName = "AuthContext";

function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [authLoading, setAuthLoading] = useState(false);
	const [authToken, setauthToken] = useState();
	const [currentUserProfile, setcurrentUserProfile] = useState();
	const loginUser = (token) => {
		setAuthLoading(true);
		setAuthTokenInLocalStorage(token);
		setCurrentUser(decodeCurrentUser(token));
		setauthToken(token);
		setAuthLoading(false);
	};
	const logout = () => {
		setAuthLoading(true);
		setCurrentUser(null);
		setauthToken(null);
		deleteAuthToken();
		setcurrentUserProfile(null);
		setAuthLoading(false);
	};
	const setUserFromLocalStorage = () => {
		setAuthLoading(true);
		const token = getAuthToken();
		setAuthTokenInLocalStorage(token);
		setCurrentUser(decodeCurrentUser(token));
		setauthToken(token);
		setAuthLoading(false);
	};
	const saveCurrentUserProfile = (profileData) => {
		setcurrentUserProfile(profileData);
	};
	// useEffect(() => {
	// 	setUserFromLocalStorage();
	// }, []);
	return (
		<Authcontext.Provider
			value={{
				isAuthenticated: !!currentUser,
				currentUser,
				setCurrentUser,
				authLoading,
				loginUser,
				authToken,
				logout,
				setUserFromLocalStorage,
				saveCurrentUserProfile,
				currentUserProfile,
			}}>
			{children}
		</Authcontext.Provider>
	);
}

export default AuthContextProvider;

export const useAuth = () => useContext(Authcontext);
