import { Box, Flex, HStack, Text, VStack, Link } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { MarketsTags } from "../../models/app";
import { borderColors, colors } from "../../models/utils";

import { MetricsApi } from "../../services/metrics-api.service";
import Card from "../card/Card";
import CardContentLoading from "../card/CardContentLoading";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  name: string;
  active: boolean;
}

const TagsPaper: FC<Props> = ({ name, active }) => {
  const theme = useTheme();
  const [MarketsTags, setMarketsTags] = useState<MarketsTags>();
  const [filterEmpty, setFilterEmpty] = useState(false);

  useEffect(() => {
    MetricsApi.fetchTags(active).then((result) => setMarketsTags(result));
  }, [active]);

  return (
    <Card height={300}>
      <VStack alignItems="flex-start" spacing={0} mb={4}>
        <Flex w="full" justify="space-between" alignItems="flex-start" mb={1}>
          <HStack as="h3" fontSize="lg" fontWeight="bold">
            <FontAwesomeIcon fontSize="24px" icon={brands("npm")} />
            <Text ml={1}>{name}</Text>
          </HStack>
          <Box fontSize="sm" color="whiteAlpha.600">
            <Link
              isExternal
              href={`https://app.zeitgeist.pm/`}
              _hover={{ textDecoration: "none", color: "whiteAlpha.500" }}
            >
              <HStack alignItems="center">
                <Text>{"view more"}</Text>
                <FontAwesomeIcon icon={solid("up-right-from-square")} />
              </HStack>
            </Link>
          </Box>
        </Flex>
      </VStack>
      {MarketsTags ? (
        <Flex height={180} direction="column">
          <Pie
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 0,
                },
              },
              hover: {
                mode: "nearest",
                intersect: true,
              },
              plugins: {
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
                filler: {
                  propagate: true,
                },
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels: MarketsTags.metrics.map((markets) => markets.tag),
              datasets: [
                {
                  label: "# of counts",
                  data: MarketsTags.metrics.map((markets) => markets.count),
                  backgroundColor: colors,
                  borderColor: borderColors,
                  borderWidth: 1,
                },
              ],
            }}
          />
          <HStack
            fontSize="sm"
            mt={3}
            justifyContent="center"
            onClick={() => setFilterEmpty(!filterEmpty)}
            opacity={0.5}
            transition=".4s all ease"
            _hover={{
              opacity: 1,
            }}
          >
            <Text as="button" size="sm">
              {filterEmpty ? "Filter Empty Tags" : "With Empty Tags"}
            </Text>
            <FontAwesomeIcon
              fontSize="14px"
              icon={solid("arrow-right-arrow-left")}
            />
          </HStack>
        </Flex>
      ) : (
        <CardContentLoading />
      )}
    </Card>
  );
};

export default TagsPaper;
