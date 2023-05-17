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
import Navbar from "./Navbar";

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
			<Navbar></Navbar>
			{children}
		</>
	);
}

export default Layout;
