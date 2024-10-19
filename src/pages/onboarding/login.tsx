import { Stack, Text, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import onBoard from "../../assets/onboarding.svg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <>
      <Stack
        minW={"320px"}
        w={"full"}
        maxW={"425px"}
        minH={"100vh"}
        bgColor={"white"}
      >
        <Stack align={"center"}>
          <Image src={onBoard} alt="onBoard"></Image>
        </Stack>
        <Stack p={"1.25rem"}>
          <Stack textAlign={"center"} mt={"1rem"}>
            <Text fontSize={"1.1rem"} fontWeight={700} color={"#A1A1A1"}>
              CLIP
            </Text>
            <Stack gap={0}>
              <Text fontSize={"1.2rem"} fontWeight={700} color={"#000000"}>
                You're almost there!
              </Text>
              <Text fontSize={"1rem"} fontWeight={500} color={"#00000050"}>
                Scan your item now to begin
              </Text>
            </Stack>
          </Stack>
          {/* <-- Button Start --> */}
          <Stack mt={"10%"}>
            <Button
              bgColor={"white"}
              variant={"outline"}
              borderRadius={"lg"}
              my={"0.2rem"}
            >
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <FcGoogle fontSize={"1.5rem"} />
                <Text fontSize={"0.8rem"} fontWeight={500} color={"#000000"}>
                  Login with Google
                </Text>
              </Stack>
            </Button>
            <Button
              as={Link}
              to="/beforeLoginList"
              bgColor={"black"}
              borderRadius={"lg"}
              my={"0.2rem"}
              cursor={"pointer"}
              _hover={{ bgColor: "blackAlpha.800" }}
            >
              <Text fontSize={"0.8rem"} fontWeight={600} color={"#F0E13D"}>
                Connect
              </Text>
            </Button>
          </Stack>
          {/* <-- Button End --> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
