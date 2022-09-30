import { Flex, SimpleGrid } from "@chakra-ui/react";

import Header from "../components/Header";

export default function Dashboard(): JSX.Element {
  return (
    <Flex direction="column" h="100vh">
      <Header />
    </Flex>
  );
}
