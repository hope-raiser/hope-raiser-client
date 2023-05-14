import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getAllDonation } from '@/modules/fetch/donations'

function Donation({ id }) {
    const [donations, setDonations] = useState("");
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
                    <Heading as='h3' size='lg'>
                        Donations
                        {donations.map((donation, idx) => {
                            return (
                                <Stack key={idx} direction='row' h='100px' p={4}>
                                    <Divider orientation='vertical' />
                                    <Text fontSize='md' >{donation.user.name}<br></br>{donation.amount}</Text>
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

export default Donation;