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
  <Stat textAlign="center" justifyContent={"center"}>
    <Card h="full">
      {count && diff ? (
        <Flex justifyContent={"center"}>
          <Text
            fontSize={big ? "3xl" : "2xl"}
            fontWeight="bold"
            marginRight={4}
            align={"center"}
          >
            {formatCompactNumber(count)}
          </Text>

          {Number(diff) >= 0 ? (
            <Flex align={"center"}>
              <StatArrow type="increase"></StatArrow>
              <StatNumber fontSize={"l"}>{diff}</StatNumber>
            </Flex>
          ) : (
            <></>
          )}
          {Number(diff) < 0 ? (
            <Flex align="center">
              <StatArrow type="decrease"></StatArrow>
              <StatNumber fontSize={"l"}>{-diff}</StatNumber>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
      ) : (
        <Skeleton w="full" maxW="200px" h={8} />
      )}

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
