import type { NextPage } from "next";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import MetricsPage from "./metrics";

const Home: NextPage = () => {
  return (
    <Flex
      w="full"
      direction="column"
      justify="flex-start"
      align="flex-start"
      transform="translateZ(0)"
    >
      <MetricsPage />
    </Flex>
  );
};

export default Home;
