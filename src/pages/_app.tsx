import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../styles/customTheme";
import "../styles/globals.css";

import Layout from "../components/layout/Layout";

function ZeitgeistInfos({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default ZeitgeistInfos;
