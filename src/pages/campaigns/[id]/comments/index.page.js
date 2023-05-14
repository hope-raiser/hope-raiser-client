import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, FormLabel, Heading, SimpleGrid, Stack, Text, VStack, Input, Container } from '@chakra-ui/react'
import { getAllCategory } from '@/modules/fetch/categories'
import { useRouter } from 'next/router'
import { createNewComment, deleteCommentById, getAllComment } from '@/modules/fetch/comments'

function Comment({ id }) {
    const [comments, setComments] = useState("");
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    const fetchComments = async () => {
        const data = await getAllComment(id);
        setComments(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchComments();
    }, []);

    const handleDeleteComments = async (commentId) => {
        await deleteCommentById(commentId);
        fetchComments();
    }

    if (isLoading) {
        return (
            <>
                <CircularProgress isIndeterminate color='green.300' />
            </>
        )
    }

    const FormComment = () => {
        const [content, setContent] = useState("")

        const handleAddComment = async () => {
            const data = {
                content,
                campaignId: +id
            }
            await createNewComment(data)

            fetchComments();
        }

        return (
            <>
                <Container>
                    <FormLabel>Content</FormLabel>
                    <Input mb={2} placeholder='insert comment' onChange={(e) => setContent(e.target.value)} />
                    <Button onClick={handleAddComment}>add comment</Button>
                </Container>
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
                                    <Text fontSize='md' key={idx}>{comment.user.name}<br></br>{comment.content}</Text>
                                    <Button onClick={() => handleDeleteComments(comment.id)} colorScheme="red">
                                        Delete
                                    </Button>
                                </Stack>
                            )
                        })}
                    </Heading>
                </VStack>
                <FormComment />
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