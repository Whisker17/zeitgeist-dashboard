import { Image } from "@chakra-ui/react";
import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/layout";

interface LogoProps {
  justify?: "flex-start" | "center" | "flex-end";
}
function Logo({ justify = "flex-start" }: LogoProps) {
  return (
    <Link href="/" passHref>
      <Flex direction="row" align="center" justify={justify} cursor="pointer">
        <Box boxSize="36px">
          <Image src="/zeitgeist-logo.jpg" alt="Zeitgeist Logo" />
        </Box>
        <Text ml={3} fontSize="lg" fontWeight="bold">
          Zeitgeist
        </Text>
      </Flex>
    </Link>
  );
}

export default Logo;
