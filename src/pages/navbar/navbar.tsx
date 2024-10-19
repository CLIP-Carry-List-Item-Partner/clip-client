import { Stack, Text, Image } from "@chakra-ui/react";
import home from "../../assets/home.svg";
import list from "../../assets/list.svg";
import item from "../../assets/item.svg";
import profile from "../../assets/profile.svg";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation(); // Get current location
  const [activeLink, setActiveLink] = useState(location.pathname); // Set active link (/)

  // Set active link based on current location
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const links = [
    {
      route: "/",
      label: "Home",
      icon: home,
    },
    {
      route: "/list",
      label: "List",
      icon: list,
    },
    {
      route: "/item",
      label: "Item",
      icon: item,
    },
    {
      route: "/profile",
      label: "Profile",
      icon: profile,
    },
  ];

  return (
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
            <Stack gap={0} opacity={activeLink == link.route ? 1 : 0.5}>
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
  );
};

export default Navbar;
