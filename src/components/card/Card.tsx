import type { BoxProps } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/layout";
import { Spinner, useStyleConfig } from "@chakra-ui/react";
import type { FC } from "react";

interface Props extends BoxProps {
  isLoading?: boolean;
  big?: boolean;
}
const Card: FC<Props> = ({ isLoading, big, children, ...props }) => {
  const styles = useStyleConfig("Card");
  return (
    <Box
      __css={styles}
      {...props}
      h={big ? 170 : "full"}
      w={big ? 350 : "full"}
    >
      {isLoading ? (
        <Flex h="300px" w="full" justify="center" align="center">
          <Spinner h="48px" w="48px" />
        </Flex>
      ) : (
        children
      )}
    </Box>
  );
};

export default Card;
