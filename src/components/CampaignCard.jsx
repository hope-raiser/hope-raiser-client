import { createNewBookmark, deleteBookmarkById } from "@/modules/fetch/bookmarks";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
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
  Icon
} from "@chakra-ui/react";
import { Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import FormatCurrency from "@/components/FormatCurrency";
import Carousel from "@/components/Carousel";

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
      if (!user) {
        setTimeout(() => {
          router.push("/login");
        }, 200);
      }

      const data = {
        campaignId: campaign.id
      };
      if (!status && user) {
        await createNewBookmark(data);
        fetchCampaigns();
        setStatus(!status);
      } else {
        let currentBookmark = bookmark.find((element) => element.userId === user.id && element.campaignId === campaign.id);
        if (currentBookmark) {
          await deleteBookmarkById(currentBookmark.id);
          fetchCampaigns();
          setStatus(true);
        }
      }
    };

    return (
      <>
        <Container>
          <IconButton onClick={handleAddBookmark}>
            <Icon as={status ? MinusIcon : AddIcon} />
          </IconButton>
        </Container>
      </>
    );
  };

  return (
    <>
      <Card variant="elevated">
        <Link href={`/campaigns/${campaign.id}`}>
          <CardHeader>
            {campaign.banner.map((bann, index) => {
              return (
                <>
                  <AspectRatio ratio={16 / 9}>
                    <Image fallback="https://placehold.co/800x450" key={index} src={bann.image} />
                  </AspectRatio>
                </>
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
        <CardFooter display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
              <Text color="blue.600" fontSize="md" align="start">
                Current Donation<br></br>
                <FormatCurrency amount={campaign.currentDonation} />
              </Text>
            </VStack>
          </Box>
          <Spacer />
          <Box>
            <IconBookmark />
          </Box>
        </CardFooter>
      </Card>
    </>
  );
}

export default CampaignCard;
