import { Flex, HStack, Link, Text } from "@chakra-ui/layout";

function Footer() {
  return (
    <Flex
      w="full"
      py={4}
      direction="row"
      justify="space-between"
      align="center"
      px={[4, 0]}
      pb={[12, 8]}
    >
      <HStack>
        <Text color="whiteAlpha.600">{"Made with"}</Text>
        <Text>❤️</Text>
        <Text color="whiteAlpha.600">{"by"}</Text>
        <Link
          _hover={{ textDecoration: "none" }}
          isExternal
          href="https://twitter.com/ZeitgeistPM"
        >
          {"Zeitgeist Community"}
        </Link>
      </HStack>
    </Flex>
  );
}

export default Footer;