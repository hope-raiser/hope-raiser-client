import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { getAllCampaign } from "@/modules/fetch/campaigns";
import { useRouter } from "next/router";
import { Heading, Button, Flex, CircularProgress } from "@chakra-ui/react";

function Campaign() {
	const [campaigns, setCampaign] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		Promise.all([getAllCampaign()]).then((values) => {
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

	return (
		<>
			<Layout>
				<Heading>INI HALAMAN CAMPAIGN</Heading>
			</Layout>
		</>
	);
}

export default Campaign;
