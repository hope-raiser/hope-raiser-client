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
  Center,
  Avatar
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { editCampaign, getCampaignDetail } from "@/modules/fetch/campaigns";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { getLoginUser, updateAvatar, updateUser } from "@/modules/fetch/users";
import Layout from "@/components/Layout";

function UpdateUser({ id }) {
  const router = useRouter();
  const [user, setUser] = useState({});

  const [isLoading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [avatar, setAvatar] = useState("");

  const fetchUser = async () => {
    const data = await getLoginUser(id);
    setUser(data);

    setName(data.name);
    setBiography(data.biography);
    setAvatar(data.avatar);

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchUser();
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

    let formData = new FormData();
    formData.append('avatar', avatar);

    const payload = {
      name,
      biography
    };

    await updateAvatar(id, formData)

    await updateUser(id, payload);
    
    fetchUser();
  }

  return (
    <Layout userMe={user}>
      <Center h="100vh" bg="gray.100">
        <Stack>
          <Stack mx={12}>
            <Heading fontSize={"4xl"} textAlign={"center"} mb={4}>
              Edit Your Profile
            </Heading>
          </Stack>
          <Box rounded={"xl"} boxShadow={"lg"} p={8} bg={"#fefefe"}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name="name" defaultValue={user.name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Biography</FormLabel>
                <Input name="biography" defaultValue={user.biography} onChange={(e) => setBiography(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Box display="flex" alignItems="center" boxShadow={"base"} p={2}>
                  <Box marginRight="4">
                    <Avatar mt={4} size='lg' src={user.avatar} mb={4} />
                  </Box>
                  <Box>
                    <Input name="avatar" type="file" accept="/avatar/*" required onChange={(e) => setAvatar(e.target.files[0])} />
                  </Box>
                </Box>
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
                  onClick={() => router.push(`/users`)}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Center>
    </Layout>
  );
}

UpdateUser.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

export default UpdateUser;
