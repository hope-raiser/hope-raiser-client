import BookmarkCard from "@/components/BookmarkCard";
import Layout from "@/components/Layout";
import { getAllBookmark } from "@/modules/fetch/bookmarks";
import { getLoginUser } from "@/modules/fetch/users";
import { CircularProgress, SimpleGrid, Card, CardHeader, CardBody, CardFooter, SkeletonText, Stack, Text, Center } from "@chakra-ui/react";
import SkeletonImage from "antd/es/skeleton/Image";
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
                  <SkeletonImage ratio={16 / 9} w="full" />
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
        <SimpleGrid mt="3" p="5" columns={3} spacing={6} justifyContent="center" className="min-h-screen">
          {bookmarks.map((bookmark, idx) => (
            <BookmarkCard bookmark={bookmark} key={idx} />
          ))}
        </SimpleGrid>
      </Layout>
    </>
  );
}
