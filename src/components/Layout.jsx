const { Flex, Text, HStack, Button, Spacer, DarkMode } = require("@chakra-ui/react");
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useAuthStore from "@/modules/authStore";
import { useRouter } from "next/router";

function Layout({ children }) {
  // const [isLogin, setIsLogin] = useState(false);
  const userData = useAuthStore((state) => state.user);
  const router = useRouter();
  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");

  //   if (token) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [window.localStorage.getItem("user")]);

  return (
    <>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
}

export default Layout;
