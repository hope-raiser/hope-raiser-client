import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Image,
	Stack,
	Text,
	AspectRatio,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormatCurrency from "@/components/FormatCurrency";

function BookmarkCard(props) {
	const { bookmark } = props;
	const router = useRouter();

	return (
		<>
			<Link href={`/campaigns/${bookmark.campaignId}`}>
				<Card
					variant="elevated"
					minHeight="sm"
					minWidth="sm"
					maxWidth="lg"
				>
					<CardHeader>
						{bookmark.campaign.banner.map((bann, index) => {
							return (
								<AspectRatio ratio={16 / 9}>
									<Image key={index} src={bann.image} />
								</AspectRatio>
							);
						})}
					</CardHeader>
					<CardBody>
						<Stack my="1" spacing="2">
							<Heading size="lg">
								{bookmark.campaign.title}
							</Heading>
							<Text noOfLines={3}>
								{bookmark.campaign.description}
							</Text>
						</Stack>
					</CardBody>
					<CardFooter>
						<Stack direction="column">
							<Text color="blue.600" fontSize="md" align="start">
								Current Donation
							</Text>
							<Text
								color="blue.600"
								fontSize="3xl"
								fontWeight="bold"
								align="start"
							>
								<FormatCurrency
									amount={bookmark.campaign.currentDonation}
								/>
							</Text>
						</Stack>
					</CardFooter>
				</Card>
			</Link>
		</>
	);
}

export default BookmarkCard;
