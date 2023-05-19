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
          maxHeight="lg"
          maxWidth="lg"
        >
          <CardHeader>
            {bookmark.campaign.banner.map((bann, index) => {
              return <Image key={index} src={bann.image} />;
            })}
          </CardHeader>
          <CardBody>
            <Stack my="6" spacing="3">
              <Heading size="lg">{bookmark.campaign.title}</Heading>
              <Text>{bookmark.campaign.description}</Text>
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
                {bookmark.campaign.currentDonation}
              </Text>
            </Stack>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
}

export default BookmarkCard;
