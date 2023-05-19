import {
  createNewBookmark,
  deleteBookmarkById,
} from "@/modules/fetch/bookmarks";
import { CopyIcon, AddIcon} from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
            element.userId === user.id && element.campaignId === campaign.id
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
          <IconButton onClick={handleAddBookmark} icon={<AddIcon />} />
        </Container>
      </>
    );
  };

  return (
    <>
      <Card
        variant="elevated"
        minHeight="sm"
        minWidth="sm"
        maxHeight="lg"
        maxWidth="lg"
      >
        <Link href={`/campaigns/${campaign.id}`}>
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
        </Link>
        <CardFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            <Text color="blue.600" fontSize="md" align="start">
              Current Donation ={campaign.currentDonation}
            </Text>
          </VStack>
          <IconBookmark />
        </CardFooter>
      </Card>
    </>
  );
}

export default CampaignCard;
