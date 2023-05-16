import { Box, Button, CircularProgress, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCampaignDetail } from "@/modules/fetch/campaigns";
import { deleteCampaignById } from "@/modules/fetch/campaigns";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

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
        <Flex my="6">
          <Box w="300px">
            <Text>{campaign.title}</Text>
            <Button onClick={handleDeleteCampaign} colorScheme="red">
              Delete
            </Button>
            <Button variant="solid" ml="5" colorScheme="orange" onClick={() => router.replace(`./${campaign.id}/edit`)}>
              Update
            </Button>
          </Box>
        </Flex>
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
