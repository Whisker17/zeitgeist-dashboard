import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";

import CountPaper from "../../metrics/count-papers";
import Title from "../Title";

const Applications: FC = () => {
  const [TVL, setTVL] = useState<number | undefined>(undefined);
  const [MarketsCount, setTMarketsCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    MetricsApi.fetchTVL().then(setTVL);
  });

  useEffect(() => {
    MetricsApi.fetchMarketCount().then(setTMarketsCount);
  });

  return (
    <VStack w="full" align="flex-start">
      {/* Title */}
      <Box mb={"4"}>
        <Title highlighted="Applications Stats"></Title>
      </Box>
      {/* Stats */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={200} mb={8}>
        <CountPaper count={TVL} label={`Total Markets Value (USD)`} />
        <CountPaper count={2} label={`Change`} />
        <CountPaper count={MarketsCount} label={`Total Markets Count`} />
      </SimpleGrid>
      {/* Chart */}
    </VStack>
  );
};

export default Applications;
