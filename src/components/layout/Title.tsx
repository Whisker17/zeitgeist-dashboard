import { Box, Text } from "@chakra-ui/layout";

interface TitleProps {
  fontSize?: string | string[];
  maxTitleWidth?: string;
  titleOffset?: string;
  text?: string;
  highlighted: string;
}
function Title({
  fontSize = ["48px", "68px"],
  maxTitleWidth = "110%",
  titleOffset = "10px",
  text,
  highlighted,
}: TitleProps) {
  return (
    <Text
      zIndex={1}
      as="h1"
      align="start"
      lineHeight={1.2}
      fontSize={fontSize}
      fontWeight="bold"
      maxWidth={{ base: "400px", sm: "700px" }}
    >
      <Box position="relative" display="inline">
        <Text as="span" position="relative" zIndex={1}>
          {highlighted}
        </Text>
        <Box
          zIndex={0}
          bgGradient="linear(to-l, primary.300, primary.500)"
          position="absolute"
          display="inline"
          h="40%"
          w="110%"
          maxWidth={maxTitleWidth}
          left={`-${titleOffset}`}
          bottom={0}
        />
      </Box>
      {text && (
        <Text ml={{ base: 0, sm: 4 }} as="span">
          {text}
        </Text>
      )}
    </Text>
  );
}

export default Title;
