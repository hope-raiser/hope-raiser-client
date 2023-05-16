import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Text,
	VStack,
	Spacer,
	DarkMode,
} from "@chakra-ui/react";
import Link from "next/link";

import { useEffect, useState } from "react";

const Navbar = () => {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		const token = window.localStorage.getItem("token");

		if (token) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, [window.localStorage.getItem("token")]);

	return (
		<Flex
			w="full"
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding="1rem"
			sx={{ position: "sticky", top: 0 }}
			bg="teal.500"
			color="white"
		>
			<Link href="/">
				<Flex align="center" mr={5} cursor="pointer">
					<Text fontSize="xl" fontWeight="bold">
						HopeRaiser
					</Text>
				</Flex>
			</Link>
			<Spacer />
			{!isLogin ? (
				<Link href="/login">
					<DarkMode>
						<Button colorScheme="blue"> Login </Button>
					</DarkMode>
				</Link>
			) : (
				<DarkMode>
					<Button
						colorScheme="blue"
						onClick={() => {
							window.localStorage.removeItem("token");
							setIsLogin(false);
						}}
					>
						Logout
					</Button>
				</DarkMode>
			)}
		</Flex>
	);
};

export default Navbar;
