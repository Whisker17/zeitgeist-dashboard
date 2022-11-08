import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import {
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTransaction,
  AiOutlineDashboard,
  AiOutlineFork,
} from "react-icons/ai";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavItem from "./NavItem";
import { Tag } from "../../../../data/tag";

const icons = {
  home: solid("home"),
  "people-group": solid("people-group"),
  pen: solid("pen"),
  "screwdriver-wrench": solid("screwdriver-wrench"),
  gamepad: solid("gamepad"),
  wallet: solid("wallet"),
};

interface SidebarProps {
  tags: Tag[];
  initialValue: Tag;
  childCount?: number;
  typeText: string;
  small?: boolean;
  icon?: any;
  onChange: (tag: Tag) => void;
}

export default function Sidebar({
  tags,
  initialValue,
  childCount = -1,
  typeText,
  small,
  icon,
  onChange,
}: SidebarProps) {
  const [navSize, changeNavSize] = useState("large");
  const [selectedValue, setSelectedValue] = useState<Tag>(initialValue);

  const onSelected = (newTag: Tag) => {
    setSelectedValue(newTag);
    onChange(newTag);
  };

  const renderMobileMenu = () => {
    return (
      <Flex w="full" align="center" justify="space-between">
        <NavItem
          menus={tags.map((tag) => {
            return {
              href: "",
              children: <Text>{tag.value}</Text>,
              onSelect: () => onSelected(tag),
            };
          })}
          icon={icon || solid("chevron-down")}
          text={selectedValue.label}
          navSize="small"
        />
      </Flex>
    );
  };

  const renderDefaultMenu = () => {
    return (
      <Flex
        direction="column"
        w="300px"
        pr={12}
        position="sticky"
        top={0}
        alignSelf="flex-start"
      >
        <Text fontSize="3xl" mb={8}>
          Category
        </Text>
        {tags.map((tag) => {
          return (
            <Flex
              key={`tag-menu-${tag.value}`}
              mb={2}
              px={1}
              py={1}
              direction="row"
              justify="space-between"
              align="center"
              onClick={() => onSelected(tag)}
              borderRadius="md"
              bg={
                selectedValue.value === tag.value
                  ? "primary.700"
                  : "transparent"
              }
              _hover={{ cursor: "pointer" }}
            >
              <Flex direction="row" justify="flex-start" align="center">
                <Flex minW="24px" justify="center" align="center">
                  {/* see https://fontawesome.com/versions#add-individual-icons-explicitly */}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <FontAwesomeIcon fontSize="18px" icon={icons[tag.icon]} />
                </Flex>
                <Text ml={4} fontWeight="bold" fontSize="16px">
                  {t.tags[tag.value] || tag.label}
                </Text>
              </Flex>
              {selectedValue.value === tag.value && (
                <Text>{getIndicationText()}</Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    );
  };

  return (
    <>
      <Show below="md">{renderMobileMenu()}</Show>
      <Show above="md">{small ? renderMobileMenu() : renderDefaultMenu()}</Show>
    </>
  );

  return (
    <Flex
      pos="sticky"
      left="5"
      h="50vh"
      marginTop="10vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.5)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-evenly"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          aria-label="Bars"
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<AiOutlineMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={AiOutlineHome}
          text="Overviews"
          active
        />
        <NavItem navSize={navSize} icon={AiOutlineUser} text="Users" />
        <NavItem
          navSize={navSize}
          icon={AiOutlineTransaction}
          text="Transactions"
        />
        <NavItem
          navSize={navSize}
          icon={AiOutlineDashboard}
          text="Leaderboard"
        />
        <NavItem navSize={navSize} icon={AiOutlineFork} text="Ecosystems" />
      </Flex>
    </Flex>
  );
}
