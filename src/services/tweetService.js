import httpService from "./apiService";
const tweetEndpoint = "/tweet";
const addNewTweet = (tweetText) => {
	return httpService.post(tweetEndpoint, { tweet: tweetText });
};

const getTweets = () => {
	return httpService.get("/tweets");
};
const getTweetsForUserProfilePage = (userId) => {
	return httpService.get(`/tweets/${userId}`);
};

export default {
	addNewTweet,
	getTweets,
	getTweetsForUserProfilePage,
};
