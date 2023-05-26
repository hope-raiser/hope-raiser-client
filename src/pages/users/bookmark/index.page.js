import BookmarkCard from "@/components/BookmarkCard";
import Layout from "@/components/Layout";
import { getAllBookmark } from "@/modules/fetch/bookmarks";
import { getLoginUser } from "@/modules/fetch/users";
import { CircularProgress, SimpleGrid } from "@chakra-ui/react";
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
            <Layout>
                <SimpleGrid
                    mt="3"
                    p="5"
                    columns={3}
                    spacing={6}
                    justifyContent="center"
                >
                    {bookmarks.map((bookmark, idx) => (
                        <BookmarkCard bookmark={bookmark} key={idx} />
                    ))}
                </SimpleGrid>
            </Layout>
        </>
    )
}