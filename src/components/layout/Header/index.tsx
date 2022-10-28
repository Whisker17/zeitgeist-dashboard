import { Flex, HStack, Link } from "@chakra-ui/layout";
import { Button, Hide } from "@chakra-ui/react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Logo from "./Logo";
import Drawer from "./Drawer";

export default function Header(): JSX.Element {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const marketsLink = "";
  const metricsLink = "";
  const ecosystemLink = "";

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
          <HStack spacing={16} mr={2}>
            <Link href={marketsLink} fontWeight="bolder">
              Markets
            </Link>
            <Link href={metricsLink} fontWeight="bolder">
              Metrics
            </Link>
            <Link href={ecosystemLink} fontWeight="bolder">
              Ecosystem
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
                href: marketsLink,
                label: "Markets",
              },
              {
                href: metricsLink,
                label: "Metrics",
              },
              {
                href: ecosystemLink,
                label: "Ecosystem",
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
