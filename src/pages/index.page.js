import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import CampaignCard from "../components/CampaignCard.jsx";
import { useEffect, useState } from "react";
import { getAllCampaign } from "@/modules/fetch/campaigns";
import { SimpleGrid, CircularProgress, Box, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar.jsx";

const Home = ({ query }) => {
	const [campaigns, setCampaign] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [page, setPage] = useState(1)
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
				<CircularProgress isIndeterminate color="green.300" />
			</>
		);
	}

	async function changePage(inputPage) {
		const data = await getAllCampaign({page: inputPage});
		setCampaign(data);
		setLoading(false);
	}

	function proccessPaginations(){
		let pagination = []
		for(let i = 0; i < campaigns.totalPages; i++){
			pagination.push(<Text key={i} onClick={() => changePage(i+1) }>{i+1}</Text>)
		}
		return pagination
	}

	return (
		<Layout>
			<SimpleGrid mt="3" columns={3} spacing={6} justifyContent="center">
				{campaigns.data.map((campaign, idx) => (
					<CampaignCard  campaign={campaign} key={idx} />
				))}
				<Box>
					<HStack >{(proccessPaginations())}</HStack>
				</Box>
			</SimpleGrid>
		</Layout>
	);
};

Home.getInitialProps = ({ query }) => {
	return query;
};

export default Home;
