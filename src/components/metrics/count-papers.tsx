import { Flex, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/react";
import type { FC } from "react";

import { formatCompactNumber } from "../../services/number.service";
import Card from "../card/Card";

// interface Props {
//   count: number | undefined;
//   label: string;
// }

// const CountPaper: FC<Props> = ({ count, label }) => (
//   <Box
//     backgroundColor="gray.800"
//     borderRadius="md"
//     p={5}
//     textAlign="center"
//     w="40vh"
//     h="12vh"
//   >
//     <Text mt={0} fontSize="xl" color="whiteAlpha.600" fontWeight="bold">
//       {label}
//     </Text>
//     <Text fontSize="3xl" fontWeight="bold">
//       {count !== undefined && formatCompactNumber(count)}
//     </Text>
//   </Box>
// );

interface Props {
  count: number | string | undefined;
  label: string;
  subtitle?: string;
  big?: boolean;
}

const CountPaper: FC<Props> = ({ count, label, subtitle, big }) => (
  <Card textAlign="center">
    <Flex h="full" direction="column" justify="center" align="center">
      {count ? (
        <Text fontSize={big ? "3xl" : "2xl"} fontWeight="bold">
          {formatCompactNumber(count)}
        </Text>
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
    </Flex>
  </Card>
);

export default CountPaper;
