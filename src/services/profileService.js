import httpService from "./apiService";
const profileEndpoint = "/profile";

const getProfileByUsername = (username) => {
	return httpService.get(`${profileEndpoint}/${username}`);
};
const getAllProfiles = () => {
	return httpService.get("/profiles");
};
const followProfile = (profileId) => {
	return httpService.post(`/profile/follow/${profileId}`);
};
const unfollowProfile = (profileId) => {
	return httpService.post(`/profile/unfollow/${profileId}`);
};
export default {
	getProfileByUsername,
	getAllProfiles,
	followProfile,
	unfollowProfile,
};
