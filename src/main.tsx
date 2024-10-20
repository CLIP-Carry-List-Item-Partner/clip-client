import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "@/providers/AuthProvider";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
import { Routes } from "@generouted/react-router";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

const theme = extendTheme({
  fonts: {
    PlusJakartaSans: `'Plus Jakarta Sans', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {/* <BrowserRouter> */}
        <Routes />
        {/* </BrowserRouter> */}
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
