import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { getAllCampaign } from "@/modules/fetch/campaigns";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

function Campaign() {
  const [campaigns, setCampaign] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Promise.all([getAllCampaign()]).then((values) => {
      setCampaign(...values);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>IS LOADINGGGGG........</h1>
      </>
    );
  }

  return (
    <>
      <Heading>INI HALAMAN CAMPAIGN</Heading>
    </>
  );
}

export default Campaign;
