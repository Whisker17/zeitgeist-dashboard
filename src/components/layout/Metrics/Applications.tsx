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

import CountPaper from "../../metrics/count-papers";
import APPPaper from "../../metrics/market-papers";
import Title from "../Title";
import TagsPaper from "../../metrics/app-tags-papers";

const Applications: FC = () => {
  const [TVL, setTVL] = useState<number | undefined>(undefined);
  const [MarketsCount, setMarketsCount] = useState<number | undefined>(
    undefined
  );
  const [ActiveMarketsCount, setActiveMarketsCount] = useState<
    number | undefined
  >(undefined);

  const [activeView, setActiveView] = useState(1);

  useEffect(() => {
    MetricsApi.fetchTotalLiquidity().then(setTVL);
    MetricsApi.fetchMarketCount().then(setMarketsCount);
    MetricsApi.fetchActiveMarketsCount().then(setActiveMarketsCount);
  });

  const ActiveView = () => {
    switch (activeView) {
      case 1:
        return (
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
          </Flex>
        );
      case 2:
        return (
          <Box w={1100} mt={8}>
            <TagsPaper name="App" active={true} />
          </Box>
        );
      default:
        return (
          <Box w={1100} mt={8}>
            <TagsPaper name="App" active={false} />
          </Box>
        );
    }
  };

  return (
    <VStack w="full" align="flex-start">
      {/* Title */}
      <Box mb={"4"}>
        <Title highlighted="Applications Stats"></Title>
      </Box>
      {/* Stats */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={200} mb={8}>
        <Box onClick={() => setActiveView(1)}>
          <CountPaper count={TVL} label={`Total Markets Value (USD)`} />
        </Box>
        <Box onClick={() => setActiveView(2)}>
          <CountPaper
            count={ActiveMarketsCount}
            label={`Active Markets Count`}
          />
        </Box>
        <Box onClick={() => setActiveView(3)}>
          <CountPaper count={MarketsCount} label={`Total Markets Count`} />
        </Box>
      </SimpleGrid>

      {/* Chart */}
      {ActiveView()}
    </VStack>
  );
};

export default Applications;
