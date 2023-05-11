const { Flex, Text } = require("@chakra-ui/react");

function Layout({ children }) {
  return (
    <>
      <Flex
        padding={4}
        sx={{ position: "sticky", top: 0 }}
        backgroundColor="teal.200"
        color="teal.700"
      >
        <Text as="b" fontSize="xl">
          Hope Raiser
        </Text>
      </Flex>
      {children}
    </>
  );
}

export default Layout;
