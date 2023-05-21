import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Box,
  Stack,
  Heading,
  InputGroup,
  InputRightElement,
  Center
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { editCampaign, getCampaignDetail } from "@/modules/fetch/campaigns";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

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

    await editCampaign(id, payload);

    fetchCampaign();
  }

  return (
    <Center h="100vh" bg="gray.100">
      <Stack>
        <Stack mx={12}>
          <Heading fontSize={"4xl"} textAlign={"center"} mb={4}>
            Edit Your Campaign
          </Heading>
        </Stack>
        <Box rounded={"xl"} boxShadow={"lg"} p={8} bg={"#fefefe"}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" defaultValue={campaign.title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                as="textarea"
                pt="1"
                name="description"
                h={20}
                defaultValue={campaign.description}
                onChange={(e) => setDescription(e.target.value)}
                resize={"none"}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Target Donation (Rp)</FormLabel>
              <Input type="integer" name="goal" defaultValue={goal} onChange={(e) => setGoal(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <InputGroup>
                <SingleDatepicker name="endDate" date={endDate} onDateChange={setEndDate} />
                <InputRightElement pointerEvents="none">
                  <CalendarIcon color="gray.300" />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={4} direction={["column", "row"]}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
                type="submit"
                w="full"
                onClick={handleSubmit}
              >
                Update
              </Button>
              <Button
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.500"
                }}
                w="full"
                onClick={() => router.push(`/campaigns/${campaign.id}`)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
}

UpdateCampaign.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

export default UpdateCampaign;
