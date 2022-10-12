import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      {/* <Layout>
        <Component {...pageProps} />
      </Layout> */}

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
