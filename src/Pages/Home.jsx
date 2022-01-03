import { Avatar, Box, Center, Divider, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProfiletoFollow from "../Components/ProfiletoFollow";
import Tweet from "../Components/Tweet";
import WriteNewTweet from "../Components/WriteNewTweet";
import { useAuth } from "../context/authContext";
import profileService from "../services/profileService";
import tweetService from "../services/tweetService";

function Home(props) {
	const { currentUser, saveCurrentUserProfile } = useAuth();
	const [profiles, setProfiles] = useState([]);
	const [tweets, setTweets] = useState([]);
	const [tweetSubmiting, setTweetSubmiting] = useState(false);
	const [newTweet, setNewTweet] = useState("");
	const getAllProfiles = async () => {
		try {
			const { data } = await profileService.getAllProfiles();
			setProfiles(data);
		} catch (error) {
			console.log("err", error);
		}
	};
	const getTweets = async () => {
		try {
			const { data } = await tweetService.getTweets();
			setTweets(data);
		} catch (error) {
			console.log("err", error);
		}
	};
	const handelSubmit = async () => {
		try {
			setTweetSubmiting(true);
			const { data } = await tweetService.addNewTweet(newTweet);
			console.log("data", data);
			setNewTweet("");
			await getTweets();
			setTweetSubmiting(false);
		} catch (error) {
			console.log("error in tweet submission");
			setTweetSubmiting(false);
		}
	};
	const getUserProfile = async (username) => {
		try {
			const { data } = await profileService.getProfileByUsername(username);
			saveCurrentUserProfile(data);
		} catch (error) {
			console.log("error");
		}
	};
	const handelFollowButtonClick = async (id) => {
		console.log({ id });
		try {
			const { data } = await profileService.followProfile(id);
			if (data) {
				await getAllProfiles();
			}
		} catch (error) {
			console.log("error in handelFollowButtonClick ");
		}
	};
	useEffect(() => {
		if (currentUser && currentUser.username) {
			getAllProfiles();
			getTweets();
			getUserProfile(currentUser.username);
		}
	}, [currentUser]);
	return (
		<Flex justifyContent="space-evenly">
			<Box
				maxW={"600px"}
				h="100vh"
				w={"full"}
				borderLeft="1px solid #CCD1E4"
				borderRight="1px solid #CCD1E4"
				p="2.5">
				<WriteNewTweet
					handelSubmit={handelSubmit}
					loading={tweetSubmiting}
					tweet={newTweet}
					setTweet={setNewTweet}
				/>
				{tweets.map((tweet) => (
					<Tweet
						key={tweet._id}
						name={tweet.writtenBy.name}
						username={tweet.writtenBy.username}
						profilePic={tweet.writtenBy.profilePic}
						tweet={tweet.tweet}
					/>
				))}
			</Box>
			{profiles.length > 0 && (
				<Flex direction="column" display={["none", "flex"]}>
					<Text fontWeight="semibold" fontSize="md" p="2.5">
						People You May Know
					</Text>
					<Grid display={["none", "grid"]} templateColumns={["repeat(2, 1fr)"]} columnGap={6} rowGap={4}>
						{profiles.map((profile) => (
							<GridItem key={profile._id}>
								<ProfiletoFollow
									id={profile._id}
									profilePic={profile.profilePic}
									username={profile.username}
									name={profile.name}
									handelFollowButtonClick={handelFollowButtonClick}
								/>
							</GridItem>
						))}
					</Grid>
				</Flex>
			)}
		</Flex>
	);
}

export default Home;
