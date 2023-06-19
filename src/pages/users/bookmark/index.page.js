import BookmarkCard from "@/components/BookmarkCard";
import Layout from "@/components/Layout";
import { getAllBookmark } from "@/modules/fetch/bookmarks";
import { getLoginUser } from "@/modules/fetch/users";
import { CircularProgress, SimpleGrid, Card, CardHeader, CardBody, CardFooter, SkeletonText, Stack, Text, Center, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function UserDetails({ id }) {
  const [user, setUser] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getLoginUser();
      const bookmarkData = await getAllBookmark();
      setBookmarks(bookmarkData);
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  }

  return (
    <>
      <Layout userMe={user}>
        {bookmarks.length === 0 && (
          <>
            <Center>
              <Card variant="elevated" height={"auto"} width={{ base: "2xs", md: "sm" }} maxWidth={"sm"} mt="8">
                <CardHeader>
                </CardHeader>
                <CardBody>
                  <Stack my="1" spacing="8">
                    <SkeletonText />
                    <SkeletonText />
                  </Stack>
                  <Center>
                    <Text fontWeight={"semibold"} mt={8} fontSize={"xl"} textAlign={"center"}>
                      Don't have any Bookmark
                    </Text>
                  </Center>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </Center>
          </>
        )}
        <Container maxW='auto'>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={10} my={7} mx={{md:5, lg:10}}>
            {bookmarks.map((bookmark, idx) => (
              <BookmarkCard bookmark={bookmark} key={idx} />
            ))}
          </SimpleGrid>
        </Container>
      </Layout>
    </>
  );
}
