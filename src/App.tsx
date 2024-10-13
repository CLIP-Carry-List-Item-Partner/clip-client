import { useState } from "react";
import "./App.css";
import { Stack, Button, Image, Text } from "@chakra-ui/react";
import Home from "./pages/home";
import CurrentList from "./pages/currentList/currentList.tsx";
import Navbar from "./pages/navbar/navbar.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Stack
        minH={"100vh"}
        minW={"100vw"}
        alignItems={"center"}
        backgroundColor={"black"}
        position={"relative"}
        fontFamily={"Pjs"}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currentList" element={<CurrentList />} />
        </Routes>
      </Stack>
    </>
  );
}

export default App;
