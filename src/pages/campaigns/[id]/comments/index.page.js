import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormLabel,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Input,
  Container,
  IconButton,
  Image,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons'
import { getAllCategory } from "@/modules/fetch/categories";
import { useRouter } from "next/router";
import { createNewComment, deleteCommentById, getAllComment } from "@/modules/fetch/comments";

function Comment({ id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const fetchComments = async () => {
    const data = await getAllComment(id);
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchComments();
  }, []);

  const handleDeleteComments = async (commentId) => {
    await deleteCommentById(commentId);
    fetchComments();
  };

  if (isLoading) {
    return (
      <>
        <CircularProgress isIndeterminate color="green.300" />
      </>
    );
  }

  const FormComment = () => {
    const [content, setContent] = useState("");

    const handleAddComment = async () => {
      const data = {
        content,
        campaignId: +id
      };
      await createNewComment(data);

      fetchComments();
    };

    return (
      <>
        <Container>
          <FormLabel>Content</FormLabel>
          <Input mb={2} placeholder="insert comment" onChange={(e) => setContent(e.target.value)} />
          <Button onClick={handleAddComment}>add comment</Button>
        </Container>
      </>
    );
  };

  return (
    <>
      <Layout>
        <VStack>
          <Heading as="h3" size="lg" mt="3" >
            Comments
            {comments.data.map((comment, idx) => {
              return (
                <Box key={idx} boxShadow='md' rounded='md' bg='white' w="400px" h='80px' border='1px' borderColor='gray.200' m="3">
                  <HStack>
                    <Box h='80px' w='80px' border='1px' borderColor='gray.200'>
                    </Box>
                    <VStack align="flex-start">
                      <Text mb="4" fontSize="sm"  >{comment.user.name} </Text>
                      <Text fontSize="lg" as='b'>{comment.content}</Text>
                    </VStack>
                    <Spacer />
                    <IconButton aria-label='Delete Comment' size='xs' onClick={() => handleDeleteComments(comment.id)} icon={<DeleteIcon />} />
                  </HStack>
                </Box>
              );
            })}
          </Heading>
        </VStack>
        <FormComment />
      </Layout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  return {
    props: {
      id
    }
  };
}

export default Comment;
