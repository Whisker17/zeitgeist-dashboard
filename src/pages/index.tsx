import type { NextPage } from "next";
import { Flex, SimpleGrid } from "@chakra-ui/react";

import MetricsPage from "../components/layout/Metrics/Overviews";

const Home: NextPage = () => {
  return (
    <Flex direction="column" h="100vh">
      <MetricsPage />
    </Flex>
  );
};

export default Home;
