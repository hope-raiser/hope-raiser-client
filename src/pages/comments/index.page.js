import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { getAllCategory } from '@/modules/fetch/categories'
import { useRouter } from 'next/router'
import { getAllComment } from '@/modules/fetch/comments'

function Comment() {
    const [comments, setComments] = useState("");
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        Promise.all([getAllComment()]).then((values) => {
            setComments(...values)
            setLoading(false)
        })
    }, []);

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
                                    <Text fontSize='md'>{comment.user.name}<br></br>{comment.createdAt}<br></br>{comment.content}</Text>
                                </Stack>
                            )
                        })}
                    </Heading>
                </VStack>
            </Layout>
        </>
    )
}

export default Comment;