import { Box, Flex, HStack, Link } from "@chakra-ui/layout";
import { Button, Hide } from "@chakra-ui/react";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Logo from "./Logo";
import Drawer from "./Drawer";

export default function Header(): JSX.Element {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const githubLink = "https://github.com/Whisker17/zeitgeist-dashboard";
  const telegramLink = "https://t.me/zeitgeist_official";
  const twitterLink = "https://twitter.com/ZeitgeistPM";
  const discordLink = "https://discord.com/invite/xv8HuA4s8v";

  return (
    <Flex
      w="full"
      py={4}
      direction="row"
      justify="space-between"
      align="center"
      px={[4, 0]}
    >
      <Logo />
      <Hide below="md">
        <Flex direction="row">
          <HStack spacing={4} mr={2}>
            <Link isExternal href={twitterLink}>
              <FontAwesomeIcon fontSize="24px" icon={brands("twitter")} />
            </Link>
            <Link isExternal href={telegramLink}>
              <FontAwesomeIcon fontSize="24px" icon={brands("telegram")} />
            </Link>
            <Link isExternal href={githubLink}>
              <FontAwesomeIcon fontSize="24px" icon={brands("github")} />
            </Link>
            <Link isExternal href={discordLink}>
              <FontAwesomeIcon fontSize="24px" icon={brands("discord")} />
            </Link>
          </HStack>
        </Flex>
      </Hide>
      <Hide above="md">
        <Flex justify="flex-end">
          <Button onClick={() => setDrawerOpen(true)}>
            <FontAwesomeIcon fontSize="24px" icon={solid("bars")} />
          </Button>
          <Drawer
            links={[
              {
                href: twitterLink,
                icon: brands("twitter"),
                label: "Twitter",
                isExternal: true,
              },
              {
                href: telegramLink,
                icon: brands("telegram"),
                label: "Telegram",
                isExternal: true,
              },
              {
                href: githubLink,
                icon: brands("github"),
                label: "Github",
                isExternal: true,
              },
              {
                href: discordLink,
                icon: brands("discord"),
                label: "Discord",
                isExternal: true,
              },
            ]}
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        </Flex>
      </Hide>
    </Flex>
  );
}
