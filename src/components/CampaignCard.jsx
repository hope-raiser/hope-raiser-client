import {
	createNewBookmark,
	deleteBookmarkById,
} from "@/modules/fetch/bookmarks";
import { CopyIcon, AddIcon } from "@chakra-ui/icons";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	IconButton,
	Image,
	Stack,
	Text,
	Container,
	Spacer,
	VStack,
	StackDivider,
	AspectRatio,
	HStack,
	Box,
	Flex,
} from "@chakra-ui/react";
import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import FormatCurrency from "@/components/FormatCurrency";

function CampaignCard(props) {
	const { campaign, bookmark, user, fetchCampaigns } = props;
	const router = useRouter();

	const IconBookmark = () => {
		const checkStatus = () => {
			let returnStatus = false;
			bookmark.forEach((bookmark) => {
				if (bookmark.userId === user.id) {
					returnStatus = true;
				}
			});

			return returnStatus;
		};

		const [status, setStatus] = useState(checkStatus());

		const handleAddBookmark = async () => {
			const data = {
				campaignId: campaign.id,
			};
			if (!status) {
				await createNewBookmark(data);
				fetchCampaigns();
			} else {
				let currentBookmark = bookmark.find(
					(element) =>
						element.userId === user.id &&
						element.campaignId === campaign.id
				);
				if (currentBookmark) {
					await deleteBookmarkById(currentBookmark.id);
					fetchCampaigns();
				}
			}

			setStatus(!status);
		};

		return (
			<>
				<Container>
					<HStack>
						<IconButton
							onClick={handleAddBookmark}
							icon={<AddIcon />}
						/>
						<Text fontWeight="bold">Save Campaign</Text>
					</HStack>
				</Container>
			</>
		);
	};

	return (
		<>
			<Card variant="elevated" minHeight="sm" minWidth="sm" maxWidth="lg">
				<Link href={`/campaigns/${campaign.id}`}>
					<CardHeader>
						{campaign.banner.map((bann, index) => {
							return (
								<AspectRatio ratio={16 / 9}>
									<Image key={index} src={bann.image} />
								</AspectRatio>
							);
						})}
					</CardHeader>
					<CardBody>
						<Stack my="1" spacing="2">
							<Heading size="lg">{campaign.title}</Heading>
							<Text noOfLines={4}>{campaign.description}</Text>
						</Stack>
					</CardBody>
				</Link>
				<Divider />
				<CardFooter>
					<Box>
						<Flex>
							<VStack spacing={1} align="stretch">
								<Text
									color="blue.600"
									fontSize="md"
									align="start"
								>
									Current Donation
								</Text>
								<Text
									color="blue.600"
									fontSize="2xl"
									fontWeight="bold"
									align="start"
								>
									<FormatCurrency
										amount={campaign.currentDonation}
									/>
								</Text>
							</VStack>
							<IconBookmark />
						</Flex>
					</Box>
				</CardFooter>
			</Card>
		</>
	);
}

export default CampaignCard;
