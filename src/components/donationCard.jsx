import { createNewDonation } from "@/modules/fetch/donations";
import { Button, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { getCampaignDetail } from "@/modules/fetch/campaigns";
import Swal from "sweetalert2";

function DonationCard({ id, setCampaign, setShowDonate }) {
  const router = useRouter();
  const toast = useToast();
  const [amount, setAmount] = useState("");

  // function Submit Donation
  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are You Sure?",
      text: "Want to Donate This Campaign",
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Yes"
    });

    if (result.isConfirmed) {
      await createNewDonation({ amount, campaignId: id });
      await Swal.fire("Donation Success", "Thanks for your support.", "success");

      const refetchCampaign = await getCampaignDetail(id);
      setCampaign(refetchCampaign);
    }
    setShowDonate(false);
  };
  return (
    <form onSubmit={handleDonationSubmit}>
      <VStack>
        <FormControl pb={2}>
          <FormLabel>Amount</FormLabel>
          <Input name="amount" type="number" color={"gray.700"} onChange={(e) => setAmount(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Donate
        </Button>
      </VStack>
    </form>
  );
}

export default DonationCard;
