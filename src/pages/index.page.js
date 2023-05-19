import Layout from "@/components/Layout";
import CampaignCard from "../components/CampaignCard.jsx";
import { useEffect, useState } from "react";
import { getAllCampaign } from "@/modules/fetch/campaigns";
import {
	SimpleGrid,
	CircularProgress,
	Box,
	HStack,
	Text,
	Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useAuthStore from "@/modules/authStore";

const Home = ({ query }) => {
	const [campaigns, setCampaign] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const router = useRouter();
	const { category_id } = router.query;
	const userData = useAuthStore((state) => state.user);

	useEffect(() => {
		// Retrieve user data from local storage during initialization
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
		  const parsedUser = JSON.parse(storedUser); // parsing agar keterima sebagai local storage
		  useAuthStore.setState({ user: parsedUser }); // setting user data ke local storage
		}

		Promise.all([getAllCampaign({ category_id, page })]).then((values) => {
			setCampaign(...values);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		// Store user data in local storage whenever it changes
		localStorage.setItem("user", JSON.stringify(userData));
	  }, [userData]);
	

	if (isLoading) {
		return (
			<>
				<Flex height="full" width="full" align="center">
					<CircularProgress isIndeterminate color="green.300" />
				</Flex>
			</>
		);
	}

	async function changePage(inputPage) {
		const data = await getAllCampaign({ page: inputPage });
		setCampaign(data);
		setLoading(false);
	}

	function processPaginations() {
		let pagination = [];
		for (let i = 0; i < campaigns.totalPages; i++) {
			pagination.push(
				<Text key={i} onClick={() => changePage(i + 1)}>
					{i + 1}
				</Text>
			);
		}
		return pagination;
	}

	return (
		<Layout user={userData}>
			<SimpleGrid
				mt="3"
				p="5"
				columns={3}
				spacing={6}
				justifyContent="center"
			>
				{campaigns.data.map((campaign, idx) => (
					<CampaignCard campaign={campaign} key={idx} />
				))}
				<Box>
					<HStack>{processPaginations()}</HStack>
				</Box>
			</SimpleGrid>
		</Layout>
	);
};

Home.getInitialProps = ({ query }) => {
	return query;
};

export default Home;
