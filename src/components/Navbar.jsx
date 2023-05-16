import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
	return (
		<Flex
			w="full"
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding="1rem"
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
		</Flex>
	);
};

export default Navbar;
