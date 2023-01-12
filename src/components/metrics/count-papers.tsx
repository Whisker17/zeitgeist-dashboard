import { Flex, Text } from "@chakra-ui/layout";
import { Skeleton, Spinner } from "@chakra-ui/react";
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
  <Card
    textAlign="center"
    _hover={{
      scale: 1.5,
      bg: "blue.500",
    }}
    big={big}
  >
    <Flex h="full" direction="column" justify="center" align="center">
      <Flex>
        {count ? (
          <Text fontSize={big ? "3xl" : "2xl"} fontWeight="bold">
            {formatCompactNumber(count)}
          </Text>
        ) : (
          <Spinner h="30px" w="30px" />
        )}
      </Flex>

      <Text mt={2} fontSize="md" color="whiteAlpha.600" fontWeight="bold">
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
