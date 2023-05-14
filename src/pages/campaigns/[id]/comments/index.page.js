import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { getAllCategory } from '@/modules/fetch/categories'
import { useRouter } from 'next/router'
import { deleteCommentById, getAllComment } from '@/modules/fetch/comments'

function Comment({ id }) {
    const [comments, setComments] = useState("");
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        const fetchComments = async () => {
            const data = await getAllComment(id);
            setComments(data);
            setLoading(false);
        }
        fetchComments();
    }, []);

    const handleDeleteComments = async () => {
        await deleteCommentById(id);
        router.push("/");
    }

    if (isLoading) {
        return (
            <>
                <CircularProgress isIndeterminate color='green.300' />
            </>
        )
    }

    return (
        <>
            <Layout>
                <VStack>
                    <Heading as='h3' size='lg'>
                        Comments
                        {comments.map((comment, idx) => {
                            return (
                                <Stack direction='row' h='100px' p={4}>
                                    <Divider orientation='vertical' />
                                    <Text fontSize='md' key={idx}>{comment.content}</Text>
                                    <Button onClick={handleDeleteComments} colorScheme="red">
                                        Delete
                                    </Button>
                                </Stack>
                            )
                        })}
                    </Heading>
                </VStack>
            </Layout>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    return {
        props: {
            id,
        },
    };
}

export default Comment;