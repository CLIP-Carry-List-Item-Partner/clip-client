import { useState } from "react";
import "./App.css";
import { Stack, Button, Image, Text } from "@chakra-ui/react";
import Home from "./pages/home";
import CurrentList from "./pages/currentList/currentList.tsx";
import Navbar from "./pages/navbar/navbar.tsx";

function App() {
  return (
    <>
      <Stack
        minH={"100vw"}
        minW={"100vw"}
        alignItems={"center"}
        backgroundColor={"black"}
        position={"relative"}
      >
        <Home />
        <CurrentList />
        <Navbar />
      </Stack>
    </>
  );
}

export default App;
