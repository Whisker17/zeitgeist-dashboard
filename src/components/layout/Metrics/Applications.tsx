import {
  Box,
  HStack,
  Link,
  VStack,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";
import { formatCompactNumber } from "../../../services/number.service";
import TagsPaper from "../../metrics/app-tags-papers";

import CountPaper from "../../metrics/count-papers";
import APPPaper from "../../metrics/market-papers";
import Title from "../Title";

const Applications: FC = () => {
  const [TVL, setTVL] = useState<number | undefined>(undefined);
  const [MarketsCount, setMarketsCount] = useState<number | undefined>(
    undefined
  );
  const [ActiveMarketsCount, setActiveMarketsCount] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    MetricsApi.fetchTotalLiquidity().then(setTVL);
    MetricsApi.fetchMarketCount().then(setMarketsCount);
    MetricsApi.fetchActiveMarketsCount().then(setActiveMarketsCount);
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
        <CountPaper count={ActiveMarketsCount} label={`Active Markets Count`} />
        <CountPaper count={MarketsCount} label={`Total Markets Count`} />
      </SimpleGrid>
      {/* Chart */}
      <Flex mb={8} direction="column">
        <Box w={1100} mt={8}>
          <APPPaper name="trades" />
        </Box>
        <Box w={1100} mt={8}>
          <APPPaper name="uniqueAccounts" />
        </Box>
        <Box w={1100} mt={8}>
          <APPPaper name="newAccounts" />
        </Box>
        <Box w={1100} mt={8}>
          <TagsPaper name="App" >
        </Box>
      </Flex>
    </VStack>
  );
};

export default Applications;
