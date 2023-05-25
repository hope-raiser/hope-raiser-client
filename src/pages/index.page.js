import Layout from "@/components/Layout";
import CampaignCard from "../components/CampaignCard.jsx";
import { useEffect, useState } from "react";
import { getAllCampaign } from "@/modules/fetch/campaigns";
import { CircularProgress, Text, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useAuthStore from "@/modules/authStore";
import { CopyIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getLoginUser } from "@/modules/fetch/users.js";
import HeroSection from "@/components/HeroSection.jsx";

const Home = ({ query }) => {
  const [campaigns, setCampaign] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { category_id } = router.query;
  const userData = useAuthStore((state) => state.user);

  const fetchCampaigns = async (category_id) => {
    const data = await getAllCampaign({ category_id, page });
    setCampaign(data);

    setLoading(false);
  };

  const fetchUser = async () => {
    const userData = await getLoginUser();
    setCurrentUser(userData);
  };

  useEffect(() => {
    // Retrieve user data from local storage during initialization
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // parsing agar keterima sebagai local storage
      useAuthStore.setState({ user: parsedUser }); // setting user data ke local storage
    }
    fetchUser();
    fetchCampaigns(category_id);
  }, []);

  useEffect(() => {
    // Store user data in local storage whenever it changes
    localStorage.setItem("user", JSON.stringify(userData));
  }, [userData]);

  if (isLoading) {
    return (
      <>
        <Flex height="full" width="full" align="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      </>
    );
  }

  async function changePage(inputPage) {
    const data = await getAllCampaign({ page: inputPage, category_id: category_id });
    setCampaign(data);
    setLoading(false);
  }

  function processPaginations() {
    let pagination = [];
    for (let i = 0; i < campaigns.totalPages; i++) {
      pagination.push(
        <Text
          px={3}
          py={1}
          borderRadius="md"
          cursor="pointer"
          _hover={{ bg: "teal.500", color: "white" }}
          bg={campaigns.currentPage === i + 1 ? "teal.500" : "gray.200"}
          color={campaigns.currentPage === i + 1 ? "white" : "gray.700"}
          key={i}
          onClick={() => changePage(i + 1)}
        >
          {i + 1}
        </Text>
      );
    }
    return pagination;
  }

  const prevPage = () => {
    const prev = campaigns.currentPage === 1 ? "" : campaigns.currentPage - 1;

    changePage(prev);
  };

  const nextPage = () => {
    const next = campaigns.currentPage === campaigns.totalPages ? campaigns.currentPage + 0 : campaigns.currentPage + 1;

    changePage(next);
  };

  function handleClick() {
    router.push({
      pathname: "/",
      hash: "#campaign"
    });

    fetchCampaigns(!category_id);
  }

  return (
    <>
      <Layout user={userData}>
        <HeroSection />
        {/* SECTION CAMPAIGN CARD */}
        <section className=" py-24 px-4 md:px-12  border-b border-slate-200">
          <div className="container  mx-auto" id="campaign">
            <h1 className="text-xl lg:text-3xl 2xl:text-4xl font-semibold text-center mb-8">Explore Campaigns</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {campaigns.data.map((campaign, idx) => (
                <CampaignCard
                  campaign={campaign}
                  bookmark={campaign.bookmark}
                  fetchCampaigns={fetchCampaigns}
                  user={currentUser}
                  key={idx}
                />
              ))}
            </div>
            <div className="w-full flex gap-2 mt-12  items-center justify-center">
              <ChevronLeftIcon
                onClick={prevPage}
                boxSize={6}
                cursor={"pointer"}
                _hover={{ color: "white", bg: "blackAlpha.700", rounded: "full" }}
              />
              {processPaginations()}
              <ChevronRightIcon
                onClick={nextPage}
                boxSize={6}
                cursor={"pointer"}
                _hover={{ color: "white", bg: "blackAlpha.700", rounded: "full" }}
              />
            </div>
            {router.asPath.includes(category_id) && (
              <button onClick={handleClick} className="font-semibold rounded-md px-2 py-2 bg-Teal text-slate-100">
                View All Campaign
              </button>
            )}
          </div>
        </section>

        {/* SECTION ABOUT US */}
        <section className="py-24 px-8 md:px-28 ">
          <div className="container mx-auto  max-w-[1400px]">
            <div className="flex flex-wrap border-b-2 items-center border-slate-200 justify-around">
              <h1 className="text-xl lg:text-5xl max-w-sm font-bold pb-8">WHY HopeRaiser?</h1>
              <div className="aspect-video max-h-16 md:max-h-32">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="WhyHopeRaiser?"
                  pb={4}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pt-20 pb-44">
              <div className="flex items-start">
                <Image src="https://placehold.co/60" fallback="https://placehold.co/60" alt="LOGO" className="text-slate-300" />
                <div className="flex flex-col px-4 items-start">
                  <h2 className="text-lg font-semibold ">Become a Volunteer</h2>
                  <p className="text-sm mt-2">There are many variations of but the majority have simply free text suffered.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Image src="https://placehold.co/60" fallback="https://placehold.co/60" alt="LOGO" className="text-slate-300" />
                <div className="flex flex-col px-4">
                  <h2 className="text-lg font-semibold ">Quick Fundraising</h2>
                  <p className="text-sm mt-2">There are many variations of but the majority have simply free text suffered.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Image src="https://placehold.co/60" fallback="https://placehold.co/60" alt="LOGO" className="text-slate-300" />
                <div className="flex flex-col px-4  ">
                  <h2 className="text-lg font-semibold ">Start Donating</h2>
                  <p className="text-sm mt-2">There are many variations of but the majority have simply free text suffered.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

Home.getInitialProps = ({ query }) => {
  return query;
};

export default Home;
