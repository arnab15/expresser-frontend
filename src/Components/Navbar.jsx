import { Link as ReactLink } from "react-router-dom";
import React, { ReactNode } from "react";
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	Menu,
	MenuButton,
} from "@chakra-ui/react";

import { FiHome, FiTrendingUp, FiUser, FiCompass, FiMenu, FiBell, FiUserMinus } from "react-icons/fi";
import { useAuth } from "../context/authContext";
const protectedRoutes = [
	{ name: "Home", icon: FiHome, url: "/home" },
	{ name: "Profile", icon: FiUser, url: "/profile" },
	{ name: "Logout", icon: FiUserMinus, url: "/logout" },
];
const LinkItems = [
	{ name: "Login", icon: FiTrendingUp, url: "/login" },
	{ name: "Signup", icon: FiCompass, url: "/signup" },
];

export default function Navbar({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
			<SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full">
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	const { currentUser } = useAuth();
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Expresser
				</Text>

				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{currentUser &&
				protectedRoutes.map((link) => (
					<NavItem
						key={link.name}
						icon={link.icon}
						url={link.url === "/profile" ? `${link.url}/${currentUser.username}` : link.url}>
						{link.name}
					</NavItem>
				))}
			{!currentUser &&
				LinkItems.map((link) => (
					<NavItem key={link.name} icon={link.icon} url={link.url}>
						{link.name}
					</NavItem>
				))}
		</Box>
	);
};

const NavItem = ({ icon, children, url, ...rest }) => {
	console.log(children.url);
	return (
		<Link as={ReactLink} to={url} style={{ textDecoration: "none" }}>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "cyan.400",
					color: "white",
				}}
				{...rest}>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	const { currentUser } = useAuth();

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
				Expresser
			</Text>

			<HStack spacing={{ base: "0", md: "6" }}>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
							{currentUser && (
								<HStack>
									<Avatar size={"sm"} src={currentUser ? currentUser.profilePic : ""} />
								</HStack>
							)}
						</MenuButton>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
