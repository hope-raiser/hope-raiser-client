import HistoryCard from "@/components/HistoryCard";
import Layout from "@/components/Layout";
import { getLoginUser } from "@/modules/fetch/users";
import {
  Box,
  CircularProgress,
  Divider,
  Flex,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Avatar,
  Button,
  Spacer,
  HStack,
  SimpleGrid
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

function UserLogin() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  const fetchUserLogin = async () => {
    const data = await getLoginUser();
    setCurrentUser(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchUserLogin();
  }, []);

  const date = new Date(currentUser.createdAt);
  const formattedDate = date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric"
  });

  if (isLoading) {
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  }

  return (
    <>
    
        <Layout userMe={currentUser} >
          <Flex alignItems="center" justifyContent="center" height="70vh" bg="gray.50">
            <VStack>
              <Box boxShadow="md" rounded="md" bg="white" w="1000px" h="75px" border="1px" borderColor="gray.200" m="3">
                <HStack mx="5" h="100%">
                  <Text>This profile page is only visible to you</Text>
                  <Spacer />
                  <Link href={`/users/edit`}>
                    <Button color="white" bg="teal.500" _hover={{ bg: "teal.600" }} fontSize="sm">
                      Manage your privacy settings
                    </Button>
                  </Link>
                </HStack>
              </Box>
              <Flex direction="column" alignItems="center" p={6}>
                <Avatar size='2xl' src={currentUser.avatar} mb={4} />
                <Text fontSize="4xl" fontWeight="bold" mb={2}>
                  {currentUser.name}
                  <Link href={`/users/changepassword`}>
                    <Button ms={4}>Edit</Button>
                  </Link>
                </Text>
                <Text fontSize="sm" color="gray.500" mb={4}>
                  {currentUser.email} - Joined {formattedDate}
                </Text>
                <Divider mb={4} />
                <VStack alignItems="center" spacing={2} align="start">
                  <Text fontWeight="bold">Biography:</Text>
                  <Text>{currentUser.biography}</Text>
                </VStack>
              </Flex>
            </VStack>
          </Flex>
          <Flex mt="5" justifyContent="center" height="2vh">
            <Text fontSize="2xl" as="b">
              History Project:
            </Text>
          </Flex>
          <SimpleGrid m="3" p="5" columns={3} spacing={6} justifyContent="center">
            {currentUser.campaigns.map((campaigns, index) => {
              return <HistoryCard campaigns={campaigns} key={index} />;
            })}
          </SimpleGrid>
        </Layout>
  
    </>
  );
}

export default UserLogin;
