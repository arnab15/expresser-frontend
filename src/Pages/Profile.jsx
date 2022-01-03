import {
	Heading,
	Avatar,
	Box,
	Center,
	Image,
	Flex,
	Text,
	Stack,
	Button,
	useColorModeValue,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "../Components/Tweet";
import { useAuth } from "../context/authContext";
import profileService from "../services/profileService";
import tweetService from "../services/tweetService";

export default function Profile() {
	const { username } = useParams();
	const [profileData, setProfileData] = useState();
	const [userTweets, setUsertweets] = useState([]);
	const { currentUser, currentUserProfile, saveCurrentUserProfile } = useAuth();
	const getUserProfile = async (username, savein) => {
		try {
			const { data } = await profileService.getProfileByUsername(username);
			if (savein === "profile") {
				setProfileData(data);
			} else {
				saveCurrentUserProfile(data);
			}
		} catch (error) {
			console.log("error");
		}
	};
	console.log("username", username);
	const getTweetsForUser = async (userId) => {
		try {
			const { data } = await tweetService.getTweetsForUserProfilePage(userId);
			setUsertweets(data);
		} catch (error) {
			console.log("error occured");
		}
	};
	const handelFollowButtonClick = async (id) => {
		console.log({ id });
		try {
			const { data } = await profileService.followProfile(id);
			await getUserProfile(currentUser.username, "jkjkj");
			await getUserProfile(username, "profile");
		} catch (error) {
			console.log("error in handelFollowButtonClick ");
		}
	};
	const handelUnFollowButtonClick = async (id) => {
		console.log({ id });
		try {
			const { data } = await profileService.unfollowProfile(id);
			await getUserProfile(currentUser.username, "jkjkj");
			await getUserProfile(username, "profile");
		} catch (error) {
			console.log("error in handelFollowButtonClick ");
		}
	};
	useEffect(() => {
		if (username) {
			getUserProfile(username, "profile");
		}
	}, []);
	useEffect(() => {
		if (profileData) {
			getTweetsForUser(profileData._id);
		}
	}, [profileData]);
	console.log(profileData);
	useEffect(() => {
		if (username && currentUser && !currentUserProfile) {
			getUserProfile(currentUser.username, "mvkjdjv");
		}
	}, [currentUserProfile]);
	return (
		<Center py={6}>
			<Box
				maxW={"720px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"md"}
				rounded={"md"}
				overflow={"hidden"}>
				<Image h={"120px"} w={"full"} src={"https://source.unsplash.com/random/600x300"} objectFit={"cover"} />
				<Flex justify={"center"} mt={-12}>
					<Avatar
						size={"xl"}
						src={
							profileData && profileData.profilePic
								? profileData.profilePic
								: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
						}
						alt={"Author"}
						css={{
							border: "2px solid white",
						}}
					/>
				</Flex>

				<Box p={6}>
					<Stack spacing={0} align={"center"} mb={5}>
						<Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
							{profileData && profileData.name}
						</Heading>
					</Stack>

					<Stack direction={"row"} justify={"center"} spacing={6}>
						<Stack spacing={0} align={"center"}>
							<Text fontWeight={600}>
								{profileData && profileData.following && (profileData.following.length || 0)}
							</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Followings
							</Text>
						</Stack>
						<Stack spacing={0} align={"center"}>
							<Text fontWeight={600}>{profileData && (profileData.followers.length || 0)}</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Followers
							</Text>
						</Stack>
					</Stack>
					{!(profileData && currentUser._id === profileData._id) && (
						<>
							{profileData && currentUserProfile?.following.includes(profileData._id) ? (
								<Button
									w={"full"}
									mt={8}
									bg="gray.900"
									color={"white"}
									rounded={"md"}
									disabled={profileData && currentUser._id === profileData._id}
									onClick={() => handelUnFollowButtonClick(profileData._id)}
									_hover={{
										transform: "translateY(-2px)",
										boxShadow: "lg",
									}}>
									Unfollow
								</Button>
							) : (
								<Button
									w={"full"}
									mt={8}
									bg="gray.900"
									color={"white"}
									rounded={"md"}
									disabled={profileData && currentUser._id === profileData._id}
									onClick={() => handelFollowButtonClick(profileData._id)}
									_hover={{
										transform: "translateY(-2px)",
										boxShadow: "lg",
									}}>
									Follow
								</Button>
							)}
						</>
					)}
				</Box>
				<Box>
					<Tabs>
						<TabList>
							<Tab ml="6" _focus={{ outlineColor: "none" }}>
								Tweets
							</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								{userTweets.map((tweet) => (
									<Tweet
										key={tweet._id}
										name={tweet.writtenBy.name}
										username={tweet.writtenBy.username}
										profilePic={tweet.writtenBy.profilePic}
										tweet={tweet.tweet}
									/>
								))}
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Box>
		</Center>
	);
}
