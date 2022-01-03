import React, { useEffect } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	FormErrorMessage,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useAuth } from "../context/authContext";
function Signup() {
	const { loginUser, currentUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const handelFormSubmit = async (values, actions) => {
		try {
			const { data } = await authService.signup({ ...values });
			loginUser(data.token);
			navigate("/home");
		} catch (error) {
			console.log("error occured in login", error);
		}
	};
	const initialValues = {
		name: "",
		email: "",
		password: "",
	};
	const validationSchema = Yup.object().shape({
		name: Yup.string().trim().min(4).required("Required"),
		email: Yup.string().trim().email().required("Required"),
		password: Yup.string().trim().min(6).required("Required"),
	});
	useEffect(() => {
		if (currentUser) {
			if (location.state && location.state.from) {
				navigate(location.state.from);
			} else {
				navigate("/home");
			}
		}
	}, [currentUser, location]);
	return (
		<Flex minH="100vh" align="flex-start" justify="center" bg={useColorModeValue("gray.50", "gray.800")}>
			<Stack spacing={6} mx="auto" maxW="lg" py={12} px={6} minWidth={["", "md"]}>
				<Stack align="center">
					<Heading fontSize={["2xl", "4xl"]}>Sign in</Heading>
				</Stack>
				<Box rounded="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="md" p={8}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handelFormSubmit}>
						{({ values, errors, touched, isSubmitting, handleSubmit, handleChange, handleBlur }) => (
							<form onSubmit={handleSubmit}>
								<Stack spacing={4}>
									<FormControl id="name" isInvalid={touched.name && errors.name}>
										<FormLabel>Your Name</FormLabel>
										<Input
											name="name"
											value={values.name}
											type="text"
											onChange={handleChange}
											onBlur={handleBlur}
										/>

										{touched.name && errors.name && (
											<FormErrorMessage>{errors.name}</FormErrorMessage>
										)}
									</FormControl>
									<FormControl id="email" isInvalid={touched.email && errors.email}>
										<FormLabel>Email address</FormLabel>
										<Input
											name="email"
											value={values.email}
											type="email"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{console.log(touched)}
										{touched.email && errors.email && (
											<FormErrorMessage>{errors.email}</FormErrorMessage>
										)}
									</FormControl>
									<FormControl id="password" isInvalid={touched.password && errors.password}>
										<FormLabel>Password</FormLabel>
										<Input
											name="password"
											type="password"
											value={values.password}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{touched.password && errors.password && (
											<FormErrorMessage>{errors.password}</FormErrorMessage>
										)}
									</FormControl>
									<Stack spacing={4}>
										<Button
											isLoading={isSubmitting}
											type="submit"
											bg="blue.400"
											color="white"
											_hover={{
												bg: "blue.500",
											}}>
											Sign in
										</Button>
									</Stack>
								</Stack>
							</form>
						)}
					</Formik>

					<Stack direction={{ base: "column" }} align="start" justify="space-between">
						<Flex>
							<Text pr="0.5">have an account?</Text>

							<Link to="/login">
								<Text cursor="pointer" color="blue.400">
									Login
								</Text>
							</Link>
						</Flex>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}

export default Signup;
