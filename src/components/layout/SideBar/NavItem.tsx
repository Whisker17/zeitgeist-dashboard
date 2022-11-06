import React from "react";
import Box from "@chakra-ui/layout"
import {
  Flex,
  Text,
  Link,
  Menu,
  MenuItem,
  MenuButton,
  Icon,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconType } from "react-icons/lib";

export interface iNavItem {
  children: any;
  href: string;
  icon?: any;
  onSelect?: () => void;
}

interface NavItemsProps {
  menus: iNavItem[];
  text?: string;
  mainGroupTitle?: string;
  icon?: any;
  navSize: string;
}

export default function NavItem({ menus, text, mainGroupTitle, icon, navSize }: NavItemsProps) {
  const renderMenus = (menusToRender: iNavItem[]) => {
    return menusToRender.map((menu, index: number) => {
      const { children, icon: menuItemIcon, href, onSelect } = menu;
      return typeof children === "string" ? (
        <MenuItem
          as={Link}
          isExternal
          href={href}
          key={`link-${href}`}
          fontSize="14px"
          iconSpacing={4}
          icon={
            menuItemIcon && (
              <Box w="20px">
                <FontAwesomeIcon fontSize="16px" icon={menuItemIcon} />
              </Box>
            )
          }
        >
          {children}
        </MenuItem>
      ) : (
        // eslint-disable-next-line react/no-array-index-key
        <MenuItem
          onClick={() => {
            if (onSelect) {
              onSelect();
            }
          }}
          cursor="pointer"
          fontSize="14px"
          // eslint-disable-next-line react/no-array-index-key
          key={`link-${href}-${index}`}
          href={href}
          as={Flex}
        >
          {children}
        </MenuItem>
      );
    });
  };
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
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
              <Text as='b' ml={5} display={navSize == "small" ? "none" : "flex"} color={active ? "#27aaf5cc" : "gray.500"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
