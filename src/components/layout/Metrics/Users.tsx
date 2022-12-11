import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { Stat } from "@chakra-ui/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";

import CountPaper from "../../metrics/count-papers";
import UsersPaper from "../../metrics/users-paper";
import Title from "../Title";

const Users: FC = () => {
  const [addressCount, setAddressCount] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    MetricsApi.fetchAddressCount().then(setAddressCount);
  });

  return (
    <VStack w="full" align="flex-start">
      {/* Title */}
      <Box mb={"4"}>
        <Title highlighted="Users Stats"></Title>
      </Box>
      {/* Stats */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={200} mb={8}>
        <Box w={400}>
          <CountPaper count={addressCount} label={`Total Addresses`} />
        </Box>
        <Stat>
          <CountPaper count={2} label={`Daily Active Addresses`} />
        </Stat>
      </SimpleGrid>
      {/* Chart */}
      <SimpleGrid columns={{ sm: 1, md: 4, lg: 2 }} spacing={100} mb={8}>
        <Box w={1000} mt={8}>
          <UsersPaper label="Users" />
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default Users;
