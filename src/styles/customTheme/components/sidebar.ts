import type { DeepPartial, Theme } from "@chakra-ui/react";

const Sidebar: DeepPartial<Theme["components"]["Sidebar"]> = {
  baseStyle: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    list: {
      background: "black",
    },
  },
};

export default Sidebar;
