import { Flex, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import type { FC } from "react";

import { formatCompactNumber } from "../../services/number.service";
import Card from "../card/Card";

interface Props {
  count: number | string | undefined;
  label: string;
  subtitle?: string;
  big?: boolean;
}

const CountPaper: FC<Props> = ({ count, label, subtitle, big }) => (
  <Card textAlign="center">
    <Flex h="full" direction="column" justify="center" align="center">
      <Flex>
        {count ? (
          <Text fontSize={big ? "3xl" : "2xl"} fontWeight="bold">
            {formatCompactNumber(count)}
          </Text>
        ) : (
          <Skeleton w="full" maxW="200px" h={8} />
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
    </Flex>
  </Card>
);

export default CountPaper;
