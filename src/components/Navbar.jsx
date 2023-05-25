import { Button, Flex, FormControl, FormLabel, Stack, Input, Text, Spacer, DarkMode } from "@chakra-ui/react";
import Link from "next/link";
import useAuthStore from "@/modules/authStore";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const Navbar = () => {
  //   const userData = useAuthStore((state) => state.user);
  //   const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");

      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      sx={{ position: "sticky", top: 0 }}
      bg="teal.500"
      color="white"
    >
      <Link href="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold">
            HopeRaiser
          </Text>
        </Flex>
      </Link>
      <Spacer />
      <Stack direction="row" spacing="10">
        <Link href="/categories">
          <Button colorScheme="white" variant="link">
            Categories
          </Button>
        </Link>
        {isLogin && (
          <Link href="/users/bookmark">
            <Button colorScheme="white" variant="link">
              Saved
            </Button>
          </Link>
        )}
         {isLogin && (
         <Link href="/users">
            <Button colorScheme="white" variant="link">
              Profile
            </Button>
          </Link>
          )}
      </Stack>

      <Spacer />
      {isLogin && (
        <Link href="/campaigns/create">
          <Button mr="2" colorScheme="white.500">
            Create Campaign
          </Button>
        </Link>
      )}
      {!isLogin ? (
        <Link href="/login">
          <DarkMode>
            <Button colorScheme="blue"> Login </Button>
          </DarkMode>
        </Link>
      ) : (
        <DarkMode>
          <Button
            colorScheme="red"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
            }}
          >
            Logout
          </Button>
        </DarkMode>
      )}
      {/* <Link href="/profile">
        <Button colorScheme="white" variant="link">
          Profile
        </Button>
      </Link> */}
    </Flex>
  );
};

export default Navbar;
