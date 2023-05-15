import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCampaignDetail } from "@/modules/fetch/campaigns";
import { deleteCampaignById } from "@/modules/fetch/campaigns";
import { useRouter } from "next/router";
import DonationCard from "@/components/donationCard";

export default function CampaignDetails({ id }) {
  const [campaign, setCampaign] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isOpen, onOpen, onClose] = useDisclosure()
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
      <Flex my="6">
        <Box w="300px">
          <Text>{campaign.title}</Text>
          <Button onClick={handleDeleteCampaign} colorScheme="red">
            Delete
          </Button>
          <Button onClick={onOpen} colorScheme="green">Donation</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Add Donation to this Project</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                  <DonationCard campaignId={id} onClose={onClose} />
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
              <DonationCard/>
          </Modal>
        </Box>
      </Flex>
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
