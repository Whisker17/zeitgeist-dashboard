import type { DeepPartial, Theme } from "@chakra-ui/react";

const Sidebar: DeepPartial<Theme["components"]["Tabs"]> = {
  baseStyle: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tab: {
      color: "whiteAlpha.600",
      _focus: {
        boxShadow: "none",
      },
    },
  },
};

export default Sidebar;
