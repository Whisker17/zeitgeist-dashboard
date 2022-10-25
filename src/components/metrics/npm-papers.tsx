import { Box, Flex, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
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

import type {
  NpmDownloads,
  NpmDownloadsChart,
} from "../../models/npm-downloads";
import { toNpmDownloadsChart } from "../../services/metrics.service";

interface Props {
  npmDownloads: NpmDownloads | undefined;
}

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

const NpmDownloadsPaper: FC<Props> = ({ npmDownloads }) => {
  const theme = useTheme();
  const [values, setValues] = useState<NpmDownloadsChart>();
  const [cumulative, setCumulative] = useState(true);

  useEffect(() => {
    if (npmDownloads !== undefined) {
      setValues(toNpmDownloadsChart(npmDownloads, cumulative));
    }
  }, [npmDownloads, cumulative]);

  if (!values) return null;

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
      gradient.addColorStop(0, theme.colors.brand["900"]);
      gradient.addColorStop(1, theme.colors.brand["400"]);
    }

    return gradient;
  }

  return (
    <Box borderRadius="md" backgroundColor="gray.800" p={5}>
      <VStack alignItems="flex-start" spacing={0} mb={4}>
        <Flex w="full" justify="space-between" alignItems="flex-start" mb={1}>
          <HStack as="h3" fontSize="lg" fontWeight="bold">
            <FontAwesomeIcon fontSize="24px" icon={brands("npm")} />
            <Text ml={1}>{values.label}</Text>
          </HStack>
          <Box fontSize="sm" color="whiteAlpha.600">
            <Link
              isExternal
              href={`https://www.npmjs.com/package/${values.package}`}
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
          <Text fontWeight="bold">
            {values.downloads[values.downloads.length - 1].downloads}
          </Text>
          <Text>{cumulative ? "downloads" : "downloads last 7 days"}</Text>
        </HStack>
      </VStack>
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
          labels: values.downloads.map((week) =>
            cumulative ? week.end : `${week.start} to ${week.end}`
          ),
          datasets: [
            {
              fill: true,
              borderWidth: 2,
              tension: 0.4,
              label: values.package,
              data: values.downloads.map((week) => week.downloads),
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
              backgroundColor: "transparent",
            },
          ],
        }}
      />
      <HStack
        fontSize="xs"
        color="whiteAlpha.600"
        mt={3}
        justifyContent="center"
      >
        <Button size="xs" onClick={() => setCumulative(!cumulative)}>
          {cumulative ? "Cumulative chart" : "Non cumulative chart"}
        </Button>
      </HStack>
    </Box>
  );
};

export default NpmDownloadsPaper;
