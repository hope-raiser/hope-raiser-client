import { Inter, League_Gothic } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { CircularProgress, SimpleGrid, Box, Heading, Text, Center } from "@chakra-ui/react";
import { getAllCategory } from "@/modules/fetch/categories";
import { useRouter } from "next/router";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState("");
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Promise.all([getAllCategory()]).then((values) => {
      setCategories(...values);
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
      <Layout>
        <Heading textAlign="center" pt={{ base: 8, sm: 20 }} fontSize={{ base: "4xl", sm: "6xl" }}>
          Explore Causes
        </Heading>
        <Center>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 4, md: 8 }} py={{ base: 8, md: 20 }} px={4}>
            {data.map((category) => {
              return (
                <>
                  <Box
                    bg={category.color}
                    h={{ sm: 40, md: 64, lg: 80 }}
                    maxW={80}
                    rounded={"md"}
                    display={"flex"}
                    alignItems={"flex-end"}
                    onClick={() => {
                      router.push({
                        pathname: "/",
                        query: { category_id: category.id }
                      });
                    }}
                    cursor={"pointer"}
                  >
                    <Text w="full" fontWeight={{ base: "semibold", sm: "bold" }} py={2} px={4} fontSize={{ base: "2xl", sm: "3xl" }}>
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
