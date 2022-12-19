import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import {
  Skeleton,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";

import CountPaper from "../../metrics/count-papers";
import UsersPaper from "../../metrics/users-paper";
import Title from "../Title";
import { UsersWithDiffs } from "../../../models/users";
import StatPaper from "../../metrics/stat-papers";

const Users: FC = () => {
  const [addressCount, setAddressCount] = useState<UsersWithDiffs | undefined>(
    undefined
  );

  useEffect(() => {
    setAddressCount(MetricsApi.fetchAddressCount());
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
          {addressCount ? (
            <StatPaper
              count={addressCount.users[addressCount.users.length - 1].users}
              label={`Total Addresses`}
              diff={addressCount?.diffs.diffsForTotal.day}
            />
          ) : (
            <Skeleton w="full" maxW="200px" h={8} />
          )}
        </Box>
        {/* <Box w={400}>
          <CountPaper count={addressCount} label={`Active Addresses`} />
        </Box> */}
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
