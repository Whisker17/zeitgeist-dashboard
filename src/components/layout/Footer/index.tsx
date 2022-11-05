import { Flex, HStack, Link, Text } from "@chakra-ui/layout";
import { ReactNode } from "react";
import {
  Button,
  VisuallyHidden,
  useColorModeValue,
  Box,
  Container,
  Stack,
} from "@chakra-ui/react";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background-color 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

function Footer() {
  const githubLink = "https://github.com/Whisker17/zeitgeist-dashboard";
  const telegramLink = "https://t.me/zeitgeist_official";
  const twitterLink = "https://twitter.com/ZeitgeistPM";
  const discordLink = "https://discord.com/invite/xv8HuA4s8v";

  return (
    <Box
      w={"8xl"}
    >
      <Container
        as={Stack}
        maxW={"8xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <HStack>
          <Text color="whiteAlpha.600">{"Made with"}</Text>
          <Text>❤️</Text>
          <Text color="whiteAlpha.600">{"by"}</Text>
          <Link
            _hover={{ textDecoration: "none" }}
            isExternal
            href="https://twitter.com/ZeitgeistPM"
          >
            {"Zeitgeist Community"}
          </Link>
        </HStack>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={twitterLink}>
            <FontAwesomeIcon fontSize="24px" icon={brands("twitter")} />
          </SocialButton>
          <SocialButton label={"Telegram"} href={telegramLink}>
            <FontAwesomeIcon fontSize="24px" icon={brands("telegram")} />
          </SocialButton>
          <SocialButton label={"Discord"} href={discordLink}>
            <FontAwesomeIcon fontSize="24px" icon={brands("discord")} />
          </SocialButton>
          <SocialButton label={"Github"} href={githubLink}>
            <FontAwesomeIcon fontSize="24px" icon={brands("github")} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
