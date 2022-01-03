import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

axios.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("_authToken");
		if (accessToken) {
			config.headers["x-auth-token"] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

const httpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default httpService;
