import { Box, Flex, HStack, Text, VStack, Link } from "@chakra-ui/layout";
import { cssVar, Skeleton } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import * as d3 from "d3";

import Card from "../card/Card";
import CardContentLoading from "../card/CardContentLoading";
import {
  Transactions,
  TransactionsChart,
  TransactionsWithoutLabel,
} from "../../models/transactions";
import { toTransactionsChart } from "../../services/transaction.service";
import { MetricsApi } from "../../services/metrics-api.service";

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  label: string;
  txLists: TransactionsWithoutLabel;
}

const TransactionsPaper: FC<Props> = ({ label, txLists }) => {
  const theme = useTheme();
  const [values, setValues] = useState<TransactionsChart>();
  const [transactions, setTransactions] = useState<Transactions>();
  const [cumulative, setCumulative] = useState(false);

  useEffect(() => {
    if (txLists !== undefined) {
      setTransactions({ label: label, txs: txLists.txs });
    }
  }, [label, txLists]);

  useEffect(() => {
    if (transactions !== undefined) {
      setValues(toTransactionsChart(transactions, cumulative));
    }
  }, [transactions, cumulative]);

  let height: number;
  let width: number;
  let gradient: CanvasGradient;

  function getGradient(ctx: CanvasFillStrokeStyles, chartArea: any) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gradient.addColorStop(0, theme.colors.primary["500"]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gradient.addColorStop(1, theme.colors.primary["300"]);
    }

    return gradient;
  }

  const renderLittleSkeleton = () => {
    return <Skeleton h={2} w="30px" />;
  };
  return (
    <Card>
      <VStack alignItems="flex-start" spacing={0} mb={4}>
        <Flex w="full" justify="space-between" alignItems="flex-start" mb={1}>
          <HStack as="h3" fontSize="lg" fontWeight="bold">
            <FontAwesomeIcon
              fontSize="24px"
              icon={solid("arrow-right-arrow-left")}
            />
            <Text ml={1}>{label}</Text>
          </HStack>
          <Box fontSize="sm" color="whiteAlpha.600">
            <Link
              isExternal
              href={`https://zeitgeist.subscan.io/`}
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
              {values.txs[values.txs.length - 1].txs}
            </Text>
          ) : (
            renderLittleSkeleton()
          )}
          <Text>{cumulative ? "Txs" : "Txs last 7 days"}</Text>
        </HStack>
      </VStack>
      {values ? (
        <>
          <Line
            options={{
              responsive: true,
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
              labels: values.txs.map((week) =>
                cumulative ? week.end : `${week.start} to ${week.end}`
              ),
              datasets: [
                {
                  fill: true,
                  borderWidth: 2,
                  tension: 0.4,
                  label: "Txs",
                  data: values.txs.map((week) => week.txs),
                  borderColor(context) {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                      // Initial chart load
                      return;
                    }
                    // eslint-disable-next-line consistent-return
                    return getGradient(ctx, chartArea);
                  },
                  // eslint-disable-next-line @typescript-eslint/dot-notation
                  // backgroundColor: `${theme["__cssMap"]["colors.brand.900"].value}80`,
                  backgroundColor: "transparent",
                },
                {
                  fill: true,
                  borderWidth: 2,
                  tension: 0.4,
                  label: "Transfer Amount",
                  data: values.txs.map((week) => week.amount),
                  borderColor(context) {
                    const { chart } = context;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                      // Initial chart load
                      return;
                    }
                    // eslint-disable-next-line consistent-return
                    return getGradient(ctx, chartArea);
                  },
                  // eslint-disable-next-line @typescript-eslint/dot-notation
                  // backgroundColor: `${theme["__cssMap"]["colors.brand.900"].value}80`,
                  backgroundColor: "transparent",
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
        </>
      ) : (
        <CardContentLoading />
      )}
    </Card>
  );
};

export default TransactionsPaper;
