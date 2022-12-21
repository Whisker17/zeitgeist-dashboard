import { Box, Flex, HStack, Text, VStack, Link } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { APPCounts, APPCountsChart } from "../../models/app";

import { MetricsApi } from "../../services/metrics-api.service";
import { toAPPCountsDailyChart } from "../../services/metrics.service";
import Card from "../card/Card";
import CardContentLoading from "../card/CardContentLoading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  name: string;
}

const APPPaper: FC<Props> = ({ name }) => {
  const theme = useTheme();
  const [values, setValues] = useState<APPCountsChart>();
  const [APPCounts, setAPPCounts] = useState<APPCounts>();
  const [cumulative, setCumulative] = useState(false);

  useEffect(() => {
    MetricsApi.fetchAPPCounts(name).then((result) => setAPPCounts(result));
  }, [name]);

  useEffect(() => {
    if (APPCounts !== undefined) {
      setValues(toAPPCountsDailyChart(APPCounts, cumulative));
    }
  }, [APPCounts, cumulative]);

  const renderLittleSkeleton = () => {
    return <Skeleton h={2} w="30px" />;
  };
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
              href={`https://www.npmjs.com/package/${name}`}
              _hover={{ textDecoration: "none", color: "whiteAlpha.500" }}
            >
              <HStack alignItems="center">
                <Text>{"view more"}</Text>
                <FontAwesomeIcon icon={solid("up-right-from-square")} />
              </HStack>
            </Link>
          </Box>
        </Flex>
        <HStack fontSize="xs" color="whiteAlpha.600">
          {values ? (
            <Text fontWeight="bold">
              {values.message[values.message.length - 1].count}
            </Text>
          ) : (
            renderLittleSkeleton()
          )}
          <Text>{cumulative ? "in total" : "in yesterday"}</Text>
        </HStack>
      </VStack>
      {values ? (
        <Flex height={180} direction="column">
          <Bar
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
              scales: {
                xAxis: {
                  display: false,
                },
                y: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    color: theme.colors.whiteAlpha["600"],
                    font: {
                      size: 12,
                    },
                  },
                },
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
              labels: values.message.map((day) => day.end),
              datasets: [
                {
                  label: name,
                  data: values.message.map((week) => week.count),
                  backgroundColor: theme.colors.primary["500"],
                },
              ],
            }}
          />
          <HStack
            fontSize="sm"
            mt={3}
            justifyContent="center"
            onClick={() => setCumulative(!cumulative)}
            opacity={0.5}
            transition=".4s all ease"
            _hover={{
              opacity: 1,
            }}
          >
            <Text as="button" size="sm">
              {cumulative ? "Cumulative chart" : "Non cumulative chart"}
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

export default APPPaper;
