import React from "react";
import {
  Flex,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Icon,
} from "@chakra-ui/react";

import NavHoverBox from "./NavHoverBox";
import { IconType } from "react-icons/lib";

interface iNavItem {
  icon: IconType;
  title: string;
  description?: string;
  active?: boolean;
  navSize: string;
}

export default function NavItem({
  icon,
  title,
  description,
  active,
  navSize,
}: iNavItem) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active == true ? "#27aaf5cc" : "#gray.500"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#27aaf5cc" }}
          w={navSize == "large" ? "100%" : "75px"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#27aaf5cc" : "gray.500"}
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
}
