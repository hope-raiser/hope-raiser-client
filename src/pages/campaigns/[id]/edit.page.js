import { Button, useToast, CircularProgress, Container, FormControl, FormLabel, Input, VStack, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { editCampaign, getCampaignDetail } from "@/modules/fetch/campaigns";
import Layout from "@/components/Layout";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

function UpdateCampaign() {
  const toast = useToast();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [campaign, setCampaign] = useState("");
  const [isLoading, setLoading] = useState(true);
  const { id } = router.query;

  useEffect(() => {
    Promise.all([getCampaignDetail(id)]).then((values) => {
      setCampaign(...values);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    // formData.append("UserId", campaign.data.userId);

    const response = await editCampaign(id, formData);

    console.log(response, "RESPONSE");
  }

  return (
    <Layout>
      <Container>
        <form onSubmit={handleSubmit}>
          <VStack spacing="4" p="4">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" defaultValue={campaign.data.title} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" defaultValue={campaign.data.description} />
            </FormControl>
            <FormControl>
              <FormLabel>Target Donation</FormLabel>
              <Input name="goal" type="number" defaultValue={campaign.data.goal} />
            </FormControl>
            {/* <FormControl>
              <FormLabel>End Date</FormLabel>
              <SingleDatepicker name="endDate" date={date} onDateChange={setDate} />
            </FormControl> */}
            <ButtonGroup>
              <Button type="submit">Update Campaign</Button>
              <Button onClick={() => router.push("/")}>Cancel</Button>
            </ButtonGroup>
          </VStack>
        </form>
      </Container>
    </Layout>
  );
}

UpdateCampaign.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

export default UpdateCampaign;
