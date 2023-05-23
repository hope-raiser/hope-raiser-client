import { createNewDonation } from "@/modules/fetch/donations";
import { Button, FormControl, FormLabel, Input, Text, VStack, useToast, Center, Box, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCampaignDetail } from "@/modules/fetch/campaigns";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

function DonationCard({ id, setCampaign, campaign, setOpenModalDonate }) {
  const router = useRouter();
  const toast = useToast();
  const [amount, setAmount] = useState("");
  // const [campaign, setCampaign] = useState({});
  const dataUser = [];

  // Find DATA USER
  if (typeof window !== "undefined") {
    localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dataUser.push(JSON.parse(storedUser));
    }
  }

  const fetchCampaign = async () => {
    const res = await getCampaignDetail(id);

    setCampaign(res);
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    if (amount >= 1000 && amount) {
      await createNewDonation({ amount, campaignId: id });
      await Swal.fire("Donation Success", "Thanks for your support.", "success");
    } else {
      await Swal.fire("Oops...", "Minimum 1000 Rupiah to Donate this Campaign.", "error");
    }

    const refetchCampaign = await getCampaignDetail(id);
    setCampaign(refetchCampaign);
    setOpenModalDonate(false);
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  // function Submit Donation

  const handleClose = (e) => {
    if (e.target.id === "modalBackground") setOpenModalDonate(false);
  };

  return (
    <Center
      id="modalBackground"
      h="100vh"
      w="100vw"
      position={"fixed"}
      inset={0}
      bg={"blackAlpha.800"}
      zIndex={20}
      backdropFilter="auto"
      backdropBlur="4px"
      onClick={handleClose}
    >
      <Box rounded={"xl"} boxShadow={"lg"} p={8} w={"sm"} bg={"#fefefe"} data-aos="zoom-in">
        <Stack spacing={4}>
          <Stack spacing={0}>
            <Text fontWeight={"medium"} fontSize={"lg"}>
              Username : {dataUser[0].name}
            </Text>
            <Text fontWeight={"medium"} fontSize={"lg"}>
              Campaign : {campaign.title}
            </Text>
          </Stack>

          <FormControl>
            <Input name="amount" type="number" onChange={(e) => setAmount(e.target.value)} placeholder="Input Nominal Amount" />
          </FormControl>

          <Stack spacing={4} direction={["column", "row"]}>
            <Button color={"white"} type="submit" colorScheme="teal" w="full" onClick={handleDonationSubmit}>
              Donate
            </Button>
            <Button
              color={"white"}
              colorScheme="red"
              w="full"
              onClick={() => {
                setOpenModalDonate(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export default DonationCard;
