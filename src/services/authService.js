import httpService from "./apiService";

const loginEndpoint = "/login";
const signupEndpoint = "/signup";
const login = ({ email, password }) => {
	return httpService.post(loginEndpoint, { email, password });
};
const signup = ({ name, email, password }) => {
	return httpService.post(signupEndpoint, { name, email, password });
};

export default {
	login,
	signup,
};
