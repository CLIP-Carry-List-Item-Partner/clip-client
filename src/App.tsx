import { useState } from "react";
import "./App.css";
import { Stack, Button, Image, Text } from "@chakra-ui/react";
import Home from "./pages/home";
import CurrentList from "./pages/list/currentList.tsx";
import Navbar from "./pages/navbar/navbar.tsx";
import Login from "./pages/onboarding/login.tsx";
import BeforeLoginList from "./pages/onboarding/beforeLoginList.tsx";
import EditList from "./pages/list/editList.tsx";
import List from "./pages/list/list.tsx";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const noNavbar = ["/login", "/currentList", "/beforeLoginList", "/editList"]; // path yang tidak memerlukan Navbar
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
        {!noNavbar.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currentList" element={<CurrentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beforeLoginList" element={<BeforeLoginList />} />
          <Route path="/editList" element={<EditList />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Stack>
    </>
  );
}

export default App;
