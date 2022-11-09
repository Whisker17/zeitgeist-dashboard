import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";

import CountPaper from "../../metrics/count-papers";

const MetricsPage: FC = () => {
  return (
    <VStack w="full" align="flex-start">
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
      {/* Stats */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={400} mb={8}>
        <CountPaper count={2} label={`Total Value Locked (USD)`} />
        <CountPaper count={2} label={`Change`} />
        <CountPaper count={2} label={`APR`} />
      </SimpleGrid>
      {/* Chart */}
    </VStack>
  );
};

export default MetricsPage;
