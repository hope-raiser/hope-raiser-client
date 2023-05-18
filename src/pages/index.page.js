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

const Home = ({ query }) => {
	const [campaigns, setCampaign] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const router = useRouter();
	const { category_id } = router.query;

	useEffect(() => {
		Promise.all([getAllCampaign({ category_id, page })]).then((values) => {
			setCampaign(...values);
			setLoading(false);
		});
	}, []);

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
		<Layout>
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
