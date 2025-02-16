import { Stack, Text, Image, useToast } from "@chakra-ui/react";
import home from "@/assets/home.svg";
import list from "@/assets/list.svg";
import item from "@/assets/item.svg";
import profile from "@/assets/profile.svg";
import { Link, Outlet, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      toast({
        title: "Please login to continue",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      nav("/auth/login");
      return;
    }
  }, [auth, nav, toast]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const links = [
    {
      route: "/clip",
      label: "Home",
      icon: home,
    },
    {
      route: "/clip/list",
      label: "List",
      icon: list,
    },
    {
      route: "/clip/item",
      label: "Item",
      icon: item,
    },
    // {
    //   route: "/auth/user/profile",
    //   label: "Profile",
    //   icon: profile,
    // },
  ];

  // Check if the current route matches /clip/list/:id
  const isDetailPage = /^\/clip\/list\/\d+$/.test(location.pathname);

  return (
    <Stack
      align={"center"}
      justify={"center"}
      fontFamily={"PlusJakartaSans"}
      bgColor={"black"}
    >
      {/* Contents */}
      <Outlet />

      {/* Render Navbar only if not on /clip/list/:id */}
      {!isDetailPage && (
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
            {links.map((link, index) => (
              <Link
                to={link.route}
                key={index}
                onClick={() => setActiveLink(link.route)}
              >
                {/* Set opacity based on active link */}
                <Stack gap={0} opacity={activeLink === link.route ? 1 : 0.5}>
                  <Image
                    src={link.icon}
                    alt={link.label.toLowerCase()}
                    boxSize={"1.5rem"}
                  />
                  <Text fontSize={"0.5rem"}>{link.label}</Text>
                </Stack>
              </Link>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;
