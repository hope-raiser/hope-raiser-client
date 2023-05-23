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
import { editCampaign, getCampaignDetail } from "@/modules/fetch/campaigns";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EditCampaign(props) {
  const { id, setCampaign, setOpenModal } = props;

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
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      title,
      description,
      goal: +goal,
      endDate
    };

    const res = await editCampaign(id, payload);

    if (res) {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Campaign Successfully.",
        showConfirmButton: false,
        timer: 1500
      });
    }

    setOpenModal(false);
    fetchCampaign();
  }

  const handleClose = (e) => {
    if (e.target.id === "modalBackground") setOpenModal(false);
  };

  return (
    <Center
      id="modalBackground"
      h="100vh"
      w="100vw"
      position={"fixed"}
      inset={0}
      bg={"blackAlpha.800"}
      zIndex={10}
      backdropFilter="auto"
      backdropBlur="4px"
      onClick={handleClose}
    >
      <Box rounded={"xl"} boxShadow={"lg"} p={8} w={"md"} bg={"#fefefe"} data-aos="zoom-in-up">
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              as="textarea"
              pt="1"
              name="description"
              h={20}
              defaultValue={description}
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
              onClick={() => {
                setOpenModal(false);
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
