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

const icons = {
  home: solid("home"),
  "people-group": solid("people-group"),
  pen: solid("pen"),
  "screwdriver-wrench": solid("screwdriver-wrench"),
  gamepad: solid("gamepad"),
  wallet: solid("wallet"),
};

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
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
