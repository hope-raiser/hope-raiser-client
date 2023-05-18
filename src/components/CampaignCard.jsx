import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function CampaignCard(props) {
	const { campaign } = props;
	const router = useRouter();

	return (
		<>
			<Link href={`/campaigns/${campaign.id}`}>
				<Card
					variant="elevated"
					minHeight="sm"
					minWidth="sm"
					maxHeight="lg"
					maxWidth="lg"
				>
					<CardHeader>
						{campaign.banner.map((bann, index) => {
							return <Image key={index} src={bann.image} />;
						})}
					</CardHeader>
					<CardBody>
						<Stack my="6" spacing="3">
							<Heading size="lg">{campaign.title}</Heading>
							<Text>{campaign.description}</Text>
						</Stack>
					</CardBody>
					<CardFooter>
						<Stack direction="column">
							<Text color="blue.600" fontSize="md" align="start">
								Current Donation =
							</Text>
							<Text
								color="blue.600"
								fontSize="2xl"
								fontWeight="bold"
								align="start"
							>
								{campaign.currentDonation}
							</Text>
						</Stack>
					</CardFooter>
				</Card>
			</Link>
		</>
	);
}

export default CampaignCard;
