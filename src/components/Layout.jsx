const { Flex, Text, Link } = require("@chakra-ui/react");

function Layout({ children }) {
  return (
    <>
      <Flex padding={4} sx={{ position: "sticky", top: 0 }} backgroundColor="teal.200" color="teal.700">
        <Text as="b" fontSize="xl">
          <Link href="/">Hope Raiser</Link>
        </Text>
      </Flex>
      {children}
    </>
  );
}

export default Layout;
