import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";

import CountPaper from "../../metrics/count-papers";
import NpmDownloadsPaper from "../../metrics/npm-papers";
import Title from "../Title";

const Devs: FC = () => {
  const [TVL, setTVL] = useState<number | undefined>(undefined);

  useEffect(() => {
    MetricsApi.fetchTVL().then(setTVL);
  });

  return (
    <VStack w="full" align="flex-start">
      {/* Title */}
      <Box mb={"4"}>
        <Title highlighted="Devs Stats"></Title>
      </Box>
      {/* Stats */}
      <Text as="h2" mb={4} fontSize="2xl" fontWeight="bold" w="full">
        {"Tools & Libraries"}
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={200} mb={8}>
        <CountPaper count={TVL} label={`Total Value Locked (USD)`} />
        <CountPaper count={2} label={`Change`} />
        <CountPaper count={2} label={`APR`} />
      </SimpleGrid>
      {/* Chart */}
      <Text as="h2" mb={4} fontSize="2xl" fontWeight="bold" w="full">
        {"SDK Downloads"}
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 4, lg: 2 }} spacing={100} mb={8}>
        <Box w={500}>
          <NpmDownloadsPaper name="@zeitgeistpm/sdk" label="zeitgeistpm/sdk" />
        </Box>
        <Box w={500}>
          <NpmDownloadsPaper
            name="@zeitgeistpm/avatara-zeitgeist-sdk"
            label="zeitgeistpm/avatara-sdk"
          />
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default Devs;
