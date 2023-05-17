import { Box, Button, CircularProgress, Divider, Flex, Heading, HStack, Image, Spacer, Stack, Text, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCampaignDetail } from "@/modules/fetch/campaigns";
import { deleteCampaignById } from "@/modules/fetch/campaigns";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import DonationCard from "@/components/donationCard";

export default function CampaignDetails({ id }) {
  const [campaign, setCampaign] = useState({});
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaign = async () => {
      const data = await getCampaignDetail(id);
      setCampaign(data);
      setLoading(false);
    };
    fetchCampaign();
  }, []);

  const handleDeleteCampaign = async () => {
    await deleteCampaignById(id);
    router.push("/");
  };

  if (isLoading) {
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  }

  return (
    <div>
      <Layout>
        <Wrap spacing='30px' justify='center' bg="gray.100">
          <Box
            p={4}
            borderRadius="md"
            boxShadow="md"
            display="flex"
            flexDirection="column"
            bg="white"
            boxSize='450px'
          >
            {campaign.banner.map((bann, index) => {
              return <Image key={index}
                boxSize='420px'
                objectFit='cover'
                src={bann.image}
                alt='Dan Abramov'
              />
            })}
            <Text as='b' mt="1" fontSize='lg'>{campaign.title}</Text>
            <Text fontSize='md'>{campaign.description}</Text>
            <Flex mt="2">
              <Text fontSize="xs" >
                <Text as="span">Current Donation </Text>
                <Text mt="2" as="span" color="teal.500"fontWeight="bold">
                Rp{campaign.currentDonation}
                </Text>
              </Text>
              <Spacer />
              <Text fontSize="xs" >
                <Text as="span">Goal </Text>
                <Text mt="2" as="span" color="teal.500"fontWeight="bold">
                  Rp{campaign.goal}
                </Text>
              </Text>
            </Flex>
            <Flex>
              <Button onClick={handleDeleteCampaign} colorScheme="red" mr="2" >
                Delete
              </Button>
              <Button variant="solid" colorScheme="orange" onClick={() => router.replace(`./${campaign.id}/edit`)}>
                Update
              </Button>
            </Flex>
            <DonationCard id={id}/>
          </Box>
        </Wrap>
        <Wrap spacing='30px' bg="gray.100" justify='center' pt="2">
          <Box p={4}
            borderRadius="md"
            boxShadow="md"
            display="flex"
            flexDirection="column"
            bg="white"
            boxSize='450px'>
            <Link href={`/campaigns/${campaign.id}/comments`}>
              <Text as='b'>Comments</Text>
            </Link>
            {campaign.comment.map((com, index) => {
              return <Stack key={index} direction="row" h="100px" p={4}>
                <Divider borderWidth="2px" orientation="vertical" />
                <Text fontSize="md" >
                  {com.user.name}<br></br>{com.content}
                </Text>
              </Stack>
            })}
          </Box>
        </Wrap>
        <Wrap spacing='30px' bg="gray.100" justify='center' pt="2">
          <Box p={4}
            borderRadius="md"
            boxShadow="md"
            display="flex"
            flexDirection="column"
            bg="white"
            boxSize='450px'>
            <Link href={`/campaigns/${campaign.id}/donations`}>
              <Text as='b'>Donations</Text>
            </Link>
            {campaign.donations.map((don, index) => {
              return <Stack key={index} direction="row" h="100px" p={4}>
                <Divider borderWidth="2px" orientation="vertical" />
                <Text fontSize="md" >
                 {don.user.name}<br></br>{don.amount}
                </Text>
              </Stack>
            })}
          </Box>
        </Wrap>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return {
    props: {
      id
    }
  };
}
