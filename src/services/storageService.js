import jwtDecode from "jwt-decode";
// import httpService from "./httpService";
const key = "_authToken";
export const setAuthToken = (jwt) => {
	return localStorage.setItem(key, jwt);
};
export const deleteAuthToken = () => {
	return localStorage.removeItem(key);
};

export const getAuthToken = () => {
	return localStorage.getItem(key);
};

export const decodeCurrentUser = (token) => {
	try {
		const data = jwtDecode(token);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
