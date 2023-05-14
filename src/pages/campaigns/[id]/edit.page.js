import { Button, useToast, CircularProgress, Container, FormControl, FormLabel, Input, VStack, ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { editCampaign, getCampaignDetail } from "@/modules/fetch/campaigns";
import Layout from "@/components/Layout";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import Swal from "sweetalert2";

function UpdateCampaign({ id }) {
  const router = useRouter();
  const [campaign, setCampaign] = useState("");
  const [isLoading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState(new Date());

  const fetchCampaign = async () => {
    const data = await getCampaignDetail(id);

    setCampaign(data);
    setTitle(data.title);
    setDescription(data.description);
    setGoal(data.goal);
    setEndDate(new Date(data.endDate));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchCampaign();
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
    const payload = {
      title,
      description,
      goal: +goal,
      endDate
    };

    const response = await editCampaign(id, payload);
    fetchCampaign();

    if (response) {
      setTimeout(() => {
        router.push("/");
      }, 1600);
    }
  }

  return (
    <Layout>
      <Container>
        <form onSubmit={handleSubmit}>
          <VStack spacing="4" p="4">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" defaultValue={campaign.title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" defaultValue={campaign.description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Target Donation</FormLabel>
              <Input name="goal" type="number" defaultValue={campaign.goal} onChange={(e) => setGoal(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <SingleDatepicker name="endDate" date={endDate} onDateChange={setEndDate} />
            </FormControl>
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
