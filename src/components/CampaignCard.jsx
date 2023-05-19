import { createNewBookmark } from "@/modules/fetch/bookmarks";
import { CopyIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";


function CampaignCard(props) {
  const { campaign } = props;
  const router = useRouter();

  const IconBookmark = () => {

    const handleAddBookmark = async () => {
      const data = {
        campaignId: campaign.id,
      };
      await createNewBookmark(data);

      fetchCampaigns();
    };

    return (
      <>
        <Container>
          <IconButton onClick={() => handleAddBookmark} icon={<CopyIcon />} />
        </Container>
      </>
    );
  };

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
      <IconBookmark />
    </>
  );
}

export default CampaignCard;
