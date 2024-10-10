import { Stack, Text, Image } from "@chakra-ui/react";
import home from "../../assets/home.svg";
import list from "../../assets/list.svg";
import item from "../../assets/item.svg";
import profile from "../../assets/profile.svg";

const Navbar = () => {
  return (
    <Stack
      minW={"320px"}
      w={"full"}
      maxW={"425px"}
      position={"fixed"}
      bottom={"0.5rem"}
      lineHeight={"1.2rem"}
      p={"1.25rem"}
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
        <Stack gap={0}>
          <Image src={home} alt="home" boxSize={"1.5rem"} />
          <Text fontSize={"0.5rem"}>Home</Text>
        </Stack>
        <Stack gap={0}>
          <Image src={list} alt="list" boxSize={"1.5rem"} />
          <Text fontSize={"0.5rem"}>List</Text>
        </Stack>
        <Stack gap={0}>
          <Image src={item} alt="item" boxSize={"1.5rem"} />
          <Text fontSize={"0.5rem"}>Item</Text>
        </Stack>
        <Stack gap={0}>
          <Image src={profile} alt="profile" boxSize={"1.5rem"} />
          <Text fontSize={"0.5rem"}>Profile</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
