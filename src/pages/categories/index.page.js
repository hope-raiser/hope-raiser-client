import Head from 'next/head'
import Image from 'next/image'
import { Inter, League_Gothic } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import CampaignCard from '@/components/CampaignCard'
import { useEffect, useState } from 'react'
import { getAllCampaign } from '@/modules/fetch/campaigns'
import { Button, SimpleGrid, VStack } from '@chakra-ui/react'
import { getAllCategory } from '@/modules/fetch/categories'
import { useRouter } from 'next/router'

function Category() {
  const [categories, setCategories] = useState("");
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    Promise.all([getAllCategory()]).then((values) => {
      setCategories(...values)
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
    <>
    <Layout>
        <VStack>
            {categories.map((category, idx) =>{
                return(
                    <Button size= "lg" key={idx} onClick={() => {
                        router.push({
                            pathname: "/",
                            query: {category_id: category.id}
                        })
                    }}>{category.name}</Button>
                )
            })}
        </VStack>
    </Layout>
    </>
  )
}

export default Category;