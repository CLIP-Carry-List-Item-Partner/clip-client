import { Stack, Text, Image, useToast } from "@chakra-ui/react";
import home from "@/assets/home.svg";
import list from "@/assets/list.svg";
import item from "@/assets/item.svg";
import profile from "@/assets/profile.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  // const currentPatch = location.pathname;
  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      toast({
        title: "Please login to continue",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      nav("/auth/login");
      return;
    }

    if (auth.status === "authenticated") {
      toast({
        title: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      nav("/clip");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Stack
        align={"center"}
        justify={"center"}
        fontFamily={"PlusJakartaSans"}
        bgColor={"black"}
      >
        {/* Contents */}
        <Outlet />

        {/* Navbar */}
        <Stack
          minW={"320px"}
          w={"full"}
          maxW={"425px"}
          position={"fixed"}
          bottom={"0.5rem"}
          lineHeight={"1.2rem"}
          p={"1.25rem"}
          zIndex={"1"}
        >
          <Stack
            direction={"row"}
            align={"center"}
            justify={"space-evenly"}
            color={"#f0e13d"}
            textAlign={"center"}
            fontSize={"0.5rem"}
            fontWeight={"400"}
            bgColor={"#0B1215"}
            pt={"1rem"}
            pb={"0.5rem"}
            borderRadius={"2xl"}
          >
            <Link to="/clip">
              <Stack gap={0}>
                <Image src={home} alt="home" boxSize={"1.5rem"} />
                <Text fontSize={"0.5rem"}>Home</Text>
              </Stack>
            </Link>
            <Link to="/clip/list">
              <Stack gap={0}>
                <Image src={list} alt="list" boxSize={"1.5rem"} />
                <Text fontSize={"0.5rem"}>List</Text>
              </Stack>
            </Link>
            <Link to="/clip/item">
              <Stack gap={0}>
                <Image src={item} alt="item" boxSize={"1.5rem"} />
                <Text fontSize={"0.5rem"}>Item</Text>
              </Stack>
            </Link>
            <Link to="/clip/profile">
              <Stack gap={0}>
                <Image src={profile} alt="profile" boxSize={"1.5rem"} />
                <Text fontSize={"0.5rem"}>Profile</Text>
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Navbar;
