import BookmarkCard from "@/components/BookmarkCard";
import Layout from "@/components/Layout";
import { getAllBookmark } from "@/modules/fetch/bookmarks";
import { CircularProgress, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Bookmark({ id }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const fetchBookmarks = async () => {
        const data = await getAllBookmark(id);
        setBookmarks(data);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchBookmarks();
    }, []);

    if (isLoading) {
        return (
            <>
                <CircularProgress isIndeterminate color="green.300" />
            </>
        );
    }

    return (
        
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
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    return {
        props: {
            id
        }
    };
}

export default Bookmark;