import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { MetricsApi } from "../../../services/metrics-api.service";

import CountPaper from "../../metrics/count-papers";

const Overviews: FC = () => {
  const [TVL, setTVL] = useState<number | undefined>(undefined);

  useEffect(() => {
    MetricsApi.fetchTVL().then(setTVL);
  });

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
        <CountPaper count={TVL} label={`Total Value Locked (USD)`} />
        <CountPaper count={2} label={`Change`} />
        <CountPaper count={2} label={`APR`} />
      </SimpleGrid>
      {/* Chart */}
    </VStack>
  );
};

export default Overviews;
