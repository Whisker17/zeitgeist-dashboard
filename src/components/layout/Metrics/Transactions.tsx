import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";
import { formatCompactNumber } from "../../../services/number.service";

import CountPaper from "../../metrics/count-papers";
import TransactionsPaper from "../../metrics/transactions-papers";
import Title from "../Title";

const Transactions: FC = () => {
  const [TxCount, setTxCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    MetricsApi.fetchTransactionsCount().then(setTxCount);
  });

  return (
    <VStack w="full" align="flex-start">
      {/* Title */}
      <Box mb={"4"}>
        <Title highlighted="Transactions Stats"></Title>
      </Box>
      {/* Stats */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={200} mb={8}>
        <Box w={400}>
          <CountPaper count={TxCount} label={`Total Transactions`} />
        </Box>
        <Box>
          <CountPaper count={2} label={`Change`} />
        </Box>
      </SimpleGrid>
      {/* Chart */}
      <SimpleGrid columns={{ sm: 1, md: 4, lg: 2 }} spacing={100} mb={8}>
        <Box w={1000} mt={8}>
          <TransactionsPaper label="Txs" />
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default Transactions;
