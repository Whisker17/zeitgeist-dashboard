import { Box, HStack, Link, SimpleGrid, Text } from "@chakra-ui/layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";

import CountPaper from "../../../metrics/count-papers";

const npmRepoToFollow = { name: "starknet", label: "starknet.js" };

const MetricsPage: FC = () => {
  return (
    <Box w="100vh">
      {/* Title */}
      <Box mb={"4"}>
        <Text
          marginLeft={"10px"}
          marginTop={"50px"}
          fontSize="40"
          fontWeight="bold"
        >
          Zeitgeist Overviews
        </Text>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={400} mb={8}>
        <CountPaper count={2} label={`"Total Value Locked (USD)"`} />
        <CountPaper count={2} label={`"Change"`} />
        <CountPaper count={2} label={`"APR"`} />
      </SimpleGrid>
    </Box>
  );
};

export default MetricsPage;
