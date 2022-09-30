import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSideBarDrawer } from "../../hooks/SideBarDrawerContext";

import Logo from "./Logo";

export default function Header(): JSX.Element {
  const { onOpen } = useSideBarDrawer();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          mr="2"
          variant="unstyled"
          onClick={onOpen}
        />
      )}

      <Logo />
    </Flex>
  );
}
