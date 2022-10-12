import type { NextPage } from "next";
import { Flex, SimpleGrid } from "@chakra-ui/react";

import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Flex direction="column" h="100vh">
      <Layout />
    </Flex>
  );
};

export default Home;
