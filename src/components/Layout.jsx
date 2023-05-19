const { Flex, Text, Link } = require("@chakra-ui/react");
import useAuthStore from "@/modules/authStore";
import { useRouter } from "next/router";

function Layout({ children }) {
  const userData = useAuthStore((state) => state.user);
  const router = useRouter();

  // Access the user's data
  console.log(userData.name);
  console.log(userData.id);
  console.log(userData.email);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <>
      <Flex padding={4} sx={{ position: "sticky", top: 0 }} backgroundColor="teal.200" color="teal.700">
        <Text as="b" fontSize="xl">
          <Link href="/">Hope Raiser</Link>
        </Text>
        <Text ml="auto" cursor="pointer" onClick={handleProfileClick}>
          {userData.name}
        </Text>
        {/* Render the user's name on the right as a clickable link */}
      </Flex>
      {children}
    </>
  );
}

export default Layout;
