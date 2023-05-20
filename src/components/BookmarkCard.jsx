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
  Box,
  VStack,
  StackDivider,
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
        <Card variant="elevated" minHeight="sm" minWidth="sm" maxWidth="lg">
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
              <Heading size="lg">{bookmark.campaign.title}</Heading>
              <Text noOfLines={3}>{bookmark.campaign.description}</Text>
            </Stack>
          </CardBody>
          <CardFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                <Text color="blue.600" fontSize="md" align="start">
                  Current Donation<br></br>
                  <FormatCurrency amount={bookmark.campaign.currentDonation} />
                </Text>
              </VStack>
            </Box>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
}

export default BookmarkCard;
