import { Image, Text } from '@chakra-ui/react';

export default function Logo(): JSX.Element {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      Zeitgeist Dashboard
    </Text>
  );
}
