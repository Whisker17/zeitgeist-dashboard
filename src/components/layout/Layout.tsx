import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import type { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./SideBar/Sidebar";
import MetricsPage from "./Statistics/Overviews/Overviews";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Flex
        zIndex={1}
        position="relative"
        width={{ sm: "100%", md: "80%" }}
        px={{ sm: 4, md: 0 }}
        direction="column"
        margin="0 auto"
        h="100%"
        w="full"
        transition="0.5s ease-out"
      >
        <Box
          width="full"
          position="fixed"
          left={0}
          right={0}
          paddingLeft={{ sm: 0, md: "10%" }}
          px={{ sm: 4, md: 0 }}
          transition="background-color .2s ease-in"
          bgColor="black"
          zIndex={2000}
        >
          <Box
            w="full"
            paddingLeft={{ sm: 0, md: "10%" }}
            paddingRight={{ sm: 0, md: "10%" }}
          >
            <Header />
          </Box>
        </Box>
        <Flex
          flex="1 1 auto"
          as="main"
          align="flex-start"
          justify="between-space"
          mt={24}
          width="100"
          marginTop={"55px"}
        >
          {/* SideBar */}
          <Flex align="flex-start" justify="between-space" mt={24} width="100">
            <Sidebar />
          </Flex>

          <Flex marginLeft={"70px"} w="full">
            <MetricsPage />
          </Flex>
        </Flex>

        {/* Footer */}
        <Box
          w="full"
          paddingLeft={{ sm: 0, md: "0%" }}
          paddingRight={{ sm: 0, md: "30%" }}
        >
          <Footer />
        </Box>
      </Flex>
    </>
  );
}

export default Layout;
