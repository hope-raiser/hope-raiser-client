import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, HStack, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getAllDonation } from '@/modules/fetch/donations'

function Donation({ id }) {
    const [donations, setDonations] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDonations = async () => {
            const data = await getAllDonation(id);
            setDonations(data);
            setLoading(false);
        }
        fetchDonations();
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
                    <Heading as="h3" size="lg" mt="3" >
                        Donations
                        {donations.data.map((donation, idx) => {
                            return (
                                <Box key={idx} boxShadow='md' rounded='md' bg='white' w="400px" h='80px' border='1px' borderColor='gray.200' m="3">
                                    <HStack>
                                        <Box h='80px' w='80px' border='1px' borderColor='gray.200'>
                                        </Box>
                                        <VStack align="flex-start">
                                            <Text mb="4" fontSize="sm"  >{donation.user.name} </Text>
                                            <Text fontSize="lg" as='b'>Rp{donation.amount}</Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            );
                        })}
                    </Heading>
                    {/* <Heading as='h3' size='lg'>
                        Donations
                        {donations.data.map((donation, idx) => {
                            return (
                                <Stack key={idx} direction='row' h='100px' p={4}>
                                    <Divider orientation='vertical' />
                                    <Text fontSize='md' >{donation.user.name}<br></br>{donation.amount}</Text>
                                </Stack>
                            )
                        })}
                    </Heading> */}
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

export default Donation;