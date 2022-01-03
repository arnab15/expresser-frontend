import { Heading, Avatar, Box, Center, Text, Stack, Button, Badge, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function ProfiletoFollow({ profilePic, username, name, id, handelFollowButtonClick }) {
	return (
		<Box
			maxW={"250px"}
			maxH={"300px"}
			w={"full"}
			bg={useColorModeValue("white", "gray.900")}
			boxShadow={"md"}
			rounded={"lg"}
			p={6}
			textAlign={"center"}>
			<Link to={`/profile/${username}`}>
				<>
					<Avatar size={"xl"} src={profilePic} alt={"Avatar Alt"} mb={4} pos={"relative"} />
					<Heading fontSize={"2xl"} fontFamily={"body"}>
						{name}
					</Heading>
					<Text fontWeight={600} color={"gray.500"} mb={4}>
						@{username}
					</Text>
				</>
			</Link>

			<Stack mt={8} direction={"row"} spacing={4}>
				<Button
					flex={1}
					fontSize={"sm"}
					rounded={"full"}
					bg={"blue.400"}
					color={"white"}
					boxShadow={"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"}
					_hover={{
						bg: "blue.500",
					}}
					onClick={() => handelFollowButtonClick(id)}
					_focus={{
						bg: "blue.500",
					}}>
					Follow
				</Button>
			</Stack>
		</Box>
	);
}
