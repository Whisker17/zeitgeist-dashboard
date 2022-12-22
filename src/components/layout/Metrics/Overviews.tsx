import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";

import CountPaper from "../../metrics/count-papers";
import StatPaper from "../../metrics/stat-papers";
import TransactionsPaper from "../../metrics/transactions-papers";
import Title from "../Title";

const Overviews: FC = () => {
  const [TVL, setTVL] = useState<number | undefined>(undefined);

  useEffect(() => {
    MetricsApi.fetchTotalLiquidity().then(setTVL);
  });

  return (
    <VStack w="full" align="flex-start">
      {/* Title */}
      <Box mb={"4"}>
        <Title highlighted="Zeitgeist Overviews"></Title>
      </Box>
      {/* Stats */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={200} mb={8}>
        <CountPaper
          count={"Soon"}
          label={`Total Value Locked (USD)`}
          big={true}
        />
        <StatPaper count={"20101"} label={`Change`} diff={0} />
        <CountPaper count={"Soon"} label={`APR`} />
      </SimpleGrid>
      {/* Chart */}
      <SimpleGrid columns={{ sm: 1, md: 4, lg: 2 }} spacing={100} mb={8}>
        <Box w={1100} mt={8}>
          <TransactionsPaper label="Txs" />
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default Overviews;
