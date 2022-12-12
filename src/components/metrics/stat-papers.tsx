import { Flex, Text } from "@chakra-ui/layout";
import { Skeleton, Stat, StatArrow, StatNumber } from "@chakra-ui/react";
import type { FC } from "react";

import { formatCompactNumber } from "../../services/number.service";
import Card from "../card/Card";

interface Props {
  count: number | string | undefined;
  label: string;
  diff?: number;
  subtitle?: string;
  big?: boolean;
}

const StatPaper: FC<Props> = ({ count, label, diff, subtitle, big }) => (
  <Stat textAlign="center">
    <Card h="full">
      <Flex>
        {count ? (
          <Text
            fontSize={big ? "3xl" : "2xl"}
            fontWeight="bold"
            marginRight={4}
          >
            {formatCompactNumber(count)}
          </Text>
        ) : (
          <Skeleton w="full" maxW="200px" h={8} />
        )}
        {Number(diff) > 0 ? (
          <Flex>
            <StatArrow type="increase"></StatArrow>
            <StatNumber>diff</StatNumber>
          </Flex>
        ) : (
          <></>
        )}
        {Number(diff) < 0 ? (
          <Flex justify="center" align="center">
            <StatArrow type="decrease"></StatArrow>
            <StatNumber>diff</StatNumber>
          </Flex>
        ) : (
          <></>
        )}
      </Flex>

      <Text mt={2} fontSize="md" color="whiteAlpha.600">
        {label}
      </Text>
      {subtitle && (
        <Text mt={2} fontSize="md" color="whiteAlpha.600">
          {subtitle}
        </Text>
      )}
    </Card>
  </Stat>
);

export default StatPaper;
