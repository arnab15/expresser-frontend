import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Tweet({ id, username, name, tweet, profilePic }) {
	return (
		<Box my="2" pt="2">
			<Flex my="1.5">
				<Avatar size="sm" mr="3.5" src={profilePic} />
				<Link to={`/profile/${username}`}>
					<Flex direction="column">
						<Text as="h6" fontWeight="semibold" p=".5">
							<span>{name}</span>
							<Text as="span" fontWeight="normal">
								@{username}
							</Text>
						</Text>
						<Text as="p" px="1">
							{tweet}
						</Text>
					</Flex>
				</Link>

				{/* <Flex justifyContent="flex-end">
					<Box h="6" w="6" left="60%">
						<svg
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clipRule="evenodd"
							/>
						</svg>
					</Box>
				</Flex> */}
			</Flex>
			<Divider mb="2" />
		</Box>
	);
}

export default Tweet;
