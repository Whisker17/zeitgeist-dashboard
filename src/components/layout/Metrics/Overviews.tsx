import { Box, HStack, Link, VStack, SimpleGrid, Text } from "@chakra-ui/layout";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { TokenInfos } from "../../../models/overviews";
import { MetricsApi } from "../../../services/metrics-api.service";

import CountPaper from "../../metrics/count-papers";
import StatPaper from "../../metrics/stat-papers";
import Title from "../Title";

const Overviews: FC = () => {
  const [TokenInfos, setTokenInfos] = useState<TokenInfos | undefined>(
    undefined
  );

  useEffect(() => {
    MetricsApi.fetchTokenInfos().then(setTokenInfos);
  });

  return (
    <VStack w="full" align="flex-start">
      {/* Title */}
      <Box mb={"4"}>
        <Title highlighted="Zeitgeist Overviews"></Title>
      </Box>
      {/* Stats */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} mb={1}>
        <CountPaper
          count={"Soon"}
          label={`Total Value Locked (USD)`}
          big={true}
        />
        <StatPaper
          count={TokenInfos?.price}
          label={`Price`}
          diff={TokenInfos?.price_change}
          big={true}
        />
        <CountPaper count={"Soon"} label={`APY`} big={true} />
        {/* Token Stats */}

        <CountPaper
          count={TokenInfos?.total_issuance}
          label={`Total Issuance`}
          big={true}
        />
        <CountPaper
          count={TokenInfos?.available_balance}
          label={`Available Token`}
          big={true}
        />
        <CountPaper count={"Soon"} label={`Inflation`} big={true} />
        <CountPaper
          count={TokenInfos?.vesting_balance}
          label={`Vesting Token`}
          big={true}
        />
        <CountPaper
          count={TokenInfos?.bonded_locked_balance}
          label={`Bonded Token`}
          big={true}
        />
        <CountPaper
          count={TokenInfos?.democracy_locked_balance}
          label={`Democracy Locked Token`}
          big={true}
        />
      </SimpleGrid>
    </VStack>
  );
};

export default Overviews;
