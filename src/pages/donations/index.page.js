import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { getAllCategory } from '@/modules/fetch/categories'
import { useRouter } from 'next/router'
import { getAllComment } from '@/modules/fetch/comments'
import { getAllDonation } from '@/modules/fetch/donations'

function Donation() {
    const [donations, setDonations] = useState("");
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        Promise.all([getAllDonation()]).then((values) => {
            setDonations(...values)
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
                        Donations
                        {donations.map((donation, idx) => {
                            return (
                                <Stack direction='row' h='100px' p={4}>
                                    <Divider orientation='vertical' />
                                    <Text fontSize='md'>{donation.user.name}<br></br>{donation.createdAt}<br></br>{donation.amount}</Text>
                                </Stack>
                            )
                        })}
                    </Heading>
                </VStack>
            </Layout>
        </>
    )
}

export default Donation;