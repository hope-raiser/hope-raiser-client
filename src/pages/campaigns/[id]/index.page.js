import {
    Box,
    Button,
    CircularProgress,
    Flex,
    Heading,
    HStack,
    Image,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import Link from "next/link";
  import { useRouter } from "next/router";
import { getCampaignDetail } from "@/modules/fetch/campaigns";
  
  export default function CampaignDetails() {
    const [campaigns, setCampaign] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const {id} = router.query
  
    useEffect(() => {
      console.log(id)
      Promise.all([getCampaignDetail(id)]).then((values) => {
        setCampaign(...values)
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
     <div>
          <Flex my="6">
            <Box w="300px">
             {campaigns.data.map((campaign, idx) => (
              <Image key={idx} src={`${campaign.banner.image}`} />
              ))}
            </Box>
          </Flex>
     </div>
    );
  }