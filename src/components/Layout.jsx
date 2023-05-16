const {
	Flex,
	Text,
	HStack,
	Button,
	Spacer,
	DarkMode,
} = require("@chakra-ui/react");
import Link from "next/link";
import { useEffect, useState } from "react";

function Layout({ children }) {
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
		<>
			<Flex
				padding={4}
				sx={{ position: "sticky", top: 0 }}
				backgroundColor="blue.200"
				color="teal.700"
			>
				<Text as="b" fontSize="xl">
					<Link href="/">Hope Raiser</Link>
				</Text>
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
			{children}
		</>
	);
}

export default Layout;
