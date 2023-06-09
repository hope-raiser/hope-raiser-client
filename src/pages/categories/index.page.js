import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { CircularProgress, SimpleGrid, Box, Heading, Text, Center, Flex, Container } from "@chakra-ui/react";
import { getAllCategory } from "@/modules/fetch/categories";
import { useRouter } from "next/router";
import useAuthStore from "@/modules/authStore";
import { getLoginUser } from "@/modules/fetch/users";

function Category() {
  const [categories, setCategories] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  let userData = useAuthStore((state) => state.user);
  const router = useRouter();

  const fetchUser = async () => {
    if (window.localStorage.getItem("token")) {
      const data = await getLoginUser();
      setCurrentUser(data);
    }
  };

  useEffect(() => {
    Promise.all([getAllCategory()]).then((values) => {
      setCategories(...values);
      setLoading(false);
    });
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // parsing agar keterima sebagai local storage
      useAuthStore.setState({ user: parsedUser }); // setting user data ke local storage
    }
    fetchUser();
  }, []);




  if (isLoading) {
    return (
      <>
        <Flex height="full" width="full" align="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </>
    );
  }

  function getColor(index) {
    switch (index) {
      case 0:
        return "#395B98";
      case 1:
        return "#F11759";
      case 2:
        return "#00C1CF";
      case 3:
        return "#FFBB55";
      case 4:
        return "#D9D9D9";
      case 5:
        return "#1DAA97";
      case 6:
        return "#E683FF";
      case 7:
        return "#975A16";
      default:
        return "gray.200";
    }
  }

  const data = categories.map((category, index) => ({
    ...category,
    color: getColor(index)
  }));

  return (
    <>
      <Layout userMe={currentUser}>
        <Heading textAlign="center" pt={{ base: 8, sm: 20 }} fontSize={{ base: "3xl", sm: "6xl" }}>
          Explore Causes
        </Heading>
        <Center>
          <SimpleGrid columns={{ base: 2, lg: 3 }} spacing={{ base: 4, xl: 8 }} py={{ base: 8, md: 20 }} px={4}>
            {data.map((category) => {
              return (
                <>
                  <Box
                    bg={category.color}
                    h={{ base: 60, xl: 80 }}
                    w={{ base: "auto", xl: 80 }}
                    rounded={"md"}
                    display={"flex"}
                    alignItems={"flex-end"}
                    onClick={() => {
                      router.push({
                        pathname: "/",
                        query: {
                          category_id: category.id
                        }
                      });
                    }}
                    transition="ease .4s"
                    _hover={{
                      transform: "scale(1.08)",
                      color: "blackAlpha.800"
                    }}
                    cursor={"pointer"}
                  >
                    <Text
                      w="full"
                      fontWeight={{
                        base: "semibold",
                        sm: "bold"
                      }}
                      py={2}
                      px={4}
                      fontSize={{
                        base: "xl",
                        xl: "3xl"
                      }}
                    >
                      {category.name}
                    </Text>
                  </Box>
                </>
              );
            })}
          </SimpleGrid>
        </Center>
      </Layout>
    </>
  );
}

export default Category;
