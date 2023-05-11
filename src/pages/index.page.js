import Head from 'next/head'
import Image from 'next/image'
import { Inter, League_Gothic } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import CampaignCard from '@/components/CampaignCard'
import { useEffect, useState } from 'react'
import { getAllCampaign } from '@/modules/fetch/campaigns'
import { SimpleGrid } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Home = ({query}) => {
  const [campaigns, setCampaign] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const {category_id} = router.query


  useEffect(() => {
    Promise.all([getAllCampaign(category_id)]).then((values) => {
      setCampaign(...values)
      setLoading(false)
    })

  }, []);

  if (isLoading) {
    return (
      <>
        <h1>IS LOADINGGGGG........</h1>
      </>
    )
  }

  return (
    <Layout>
      <SimpleGrid columns={3} spacing={6} justifyContent="center">
        {campaigns.data.map((campaign, idx) => (
          <CampaignCard key={idx} {...campaign} />
        ))}
      </SimpleGrid>
    </Layout>

  )
}

Home.getInitialProps = ({query}) => {
  return query
}

export default Home;