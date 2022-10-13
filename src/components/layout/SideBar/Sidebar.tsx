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

import NavItem from "./NavItem";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
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
          title="Overviews"
          description="This is the description for the dashboard."
          active
        />
        <NavItem navSize={navSize} icon={AiOutlineUser} title="Users" />
        <NavItem
          navSize={navSize}
          icon={AiOutlineTransaction}
          title="Transactions"
        />
        <NavItem
          navSize={navSize}
          icon={AiOutlineDashboard}
          title="Leaderboard"
        />
        <NavItem navSize={navSize} icon={AiOutlineFork} title="Ecosystems" />
      </Flex>
    </Flex>
  );
}
