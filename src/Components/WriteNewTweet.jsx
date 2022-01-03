import { Box, Textarea, Text, Button, Flex, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function WriteNewTweet({ handelSubmit, loading, tweet, setTweet }) {
	const [error, seterror] = useState("");
	useEffect(() => {
		if (tweet.length > 140) {
			seterror("You can write upto 140 character for a tweet");
		} else {
			seterror("");
		}
	}, [tweet]);

	return (
		<>
			<Box>
				<Textarea
					isInvalid={error}
					_focus={{ outline: "none" }}
					rounded={"md"}
					placeholder="What’s happening?"
					rows={5}
					size="sm"
					resize={"none"}
					value={tweet}
					onChange={(e) => setTweet(e.target.value)}
				/>
				{error && <Text color="red.400">{error}</Text>}
				<Flex justifyContent="flex-end">
					<Button
						isLoading={loading}
						colorScheme="twitter"
						my="2"
						disabled={tweet.length === 0 || error}
						onClick={handelSubmit}>
						Tweet
					</Button>
				</Flex>
				<Divider mt="2.5" />
			</Box>
		</>
	);
}

export default WriteNewTweet;
