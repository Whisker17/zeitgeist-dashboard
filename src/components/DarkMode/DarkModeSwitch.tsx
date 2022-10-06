import { useColorMode, IconButton } from "@chakra-ui/core";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function DarkModeSwitch(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle Dark Switch"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  );
}
