import { Flex, HStack, Link, Text } from "@chakra-ui/layout";
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";

import Logo from "./Logo";

interface DrawerProps {
  links: { href: string; label: string }[];
  isOpen: boolean;
  onClose: () => void;
}
function Drawer({ links, isOpen, onClose }: DrawerProps) {
  return (
    <ChakraDrawer
      autoFocus={false}
      placement="top"
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent bg="gray.800">
        <DrawerHeader borderBottomWidth="1px">
          <Flex w="full" direction="row" justify="space-between" align="center">
            <Logo justify="flex-start" />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex direction="column" justify="center" align="flex-start">
            {links.map(({ href, label }) => {
              return (
                <Link
                  w="full"
                  key={`drawer-item-${label}`}
                  py={2}
                  style={{ textDecoration: "none" }}
                  href={href}
                >
                  <HStack justifyContent="space-between">
                    <Text>{label}</Text>
                  </HStack>
                </Link>
              );
            })}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
