import { Stack, Text, Image, Button } from "@chakra-ui/react";
import dyhb from "@/assets/heboth.png";
import preview from "@/assets/preview.svg";
import logo from "@/assets/logo.svg";
import { FaUserEdit } from "react-icons/fa";
import { BiHistory } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const buttons = [
  { icon: <FaUserEdit size={"1.5rem"} />, text: "Edit Profile" },
  { icon: <BiHistory size={"1.5rem"} />, text: "History" },
  { icon: <IoMdSettings size={"1.5rem"} />, text: "Settings" },
];

const Profile = () => {
  return (
    <Stack
      w={"full"}
      minW={"320px"}
      maxW={"425px"}
      minH={"100vh"}
      lineHeight={"1.2rem"}
      justifyItems={"center"}
      alignItems={"center"}
      bgColor={"white"}
      p={"1.25rem 1.25rem 8rem 1.25rem"}
      border={"3px solid #000000"}
      m={"0 auto"}
    >
      <Text fontSize={"1.1rem"} fontWeight={700}>
        Profile
      </Text>
      <Stack direction={"row"} align={"center"} w={"full"} mt={"2rem"}>
        <Image
          src={dyhb}
          alt="profile"
          borderRadius={"lg"}
          boxSize={"4rem"}
          objectFit={"cover"}
        />
        <Stack pl={"0.5rem"}>
          <Text fontSize={"0.9rem"} fontWeight={500}>
            Dylan Heboth Rajagukguk
          </Text>
          <Text
            fontSize={"0.75rem"}
            fontWeight={500}
            py={"0.2rem"}
            px={"0.7rem"}
            borderRadius={"full"}
            bgColor={"#f2f2f2"}
            color={"#0B121550"}
            textAlign={"center"}
            w={"fit-content"}
          >
            dyhb@gmail.com
          </Text>
        </Stack>
      </Stack>
      <Stack
        w={"full"}
        h={"7.4rem"}
        mt={"1.5rem"}
        direction={"row"}
        justify={"space-between"}
        bgColor={"#efe43d"}
        borderRadius={"lg"}
      >
        <Stack direction={"column"} justify={"center"} ml={"1rem"}>
          <Image src={logo} alt="preview" boxSize={"3rem"} />
          <Text fontSize={"0.9rem"} fontWeight={600} ml={"0.3rem"}>
            “One Second Now, Worry Less Later”
          </Text>
        </Stack>
        <Image src={preview} alt="preview" boxSize={"9rem"} me={"0.8rem"} />
      </Stack>
      <Stack w={"full"} mt={"1rem"}>
        {buttons.map((button, index) => (
          <Button key={index} variant={"unstyled"} my={"0.1rem"}>
            <Stack direction={"row"} align={"center"} justify={"space-between"}>
              <Stack direction={"row"} align={"center"}>
                <Stack bgColor={"#f2f2f2"} p={"0.4rem"} borderRadius={"md"}>
                  {button.icon}
                </Stack>
                <Text fontSize={"0.9rem"} fontWeight={500} ml={"0.3rem"}>
                  {button.text}
                </Text>
              </Stack>
              <Stack>
                <IoIosArrowForward size={"1.5rem"} />
              </Stack>
            </Stack>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Profile;
