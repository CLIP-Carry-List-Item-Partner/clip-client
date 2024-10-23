import { Stack, Text, Image, Button } from "@chakra-ui/react";
import onBoard from "@/assets/onboarding.svg";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "@/router";
import { useBluetooth } from "@/providers/BluetoothProvider";

const Login = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const { isConnected, connectToDevice, imei } = useBluetooth(); // Extract imei from the Bluetooth context

  useEffect(() => {
    // Clear IMEI from local storage on refresh
    localStorage.removeItem("imei");
  }, []);

  useEffect(() => {
    // Redirect if authenticated
    if (auth.status === "authenticated") {
      return nav("/clip");
    }
  }, [auth, nav]);

  return (
    <Stack
      w={"full"}
      align={"center"}
      justify={"center"}
      fontFamily={"PlusJakartaSans"}
      bgColor={"black"}
    >
      <Stack minW={"320px"} maxW={"425px"} minH={"100vh"} bgColor={"#FAF9F6"}>
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

            {/* Menampilkan IMEI dari state */}
            {isConnected && imei ? ( // Check both isConnected and imei
              <Text
                fontSize={"0.8rem"}
                fontWeight={"medium"}
                color={"black"}
                mt={"2rem"}
                alignSelf={"center"}
              >
                Connected to CLIP {imei}
              </Text>
            ) : (
              <Text
                fontSize={"0.8rem"}
                fontWeight={"medium"}
                color={"black"}
                mt={"2rem"}
                alignSelf={"center"}
              >
                Not connected to CLIP
              </Text>
            )}
          </Stack>
          <Stack mt={"2rem"}>
            <Button
              bgColor={"#FAF9F6"}
              variant={"outline"}
              borderRadius={"lg"}
              borderColor={"#ECECEC"}
              my={"0.2rem"}
              as={Link}
              to={`http://localhost:8080/auth/login`}
            >
              <Stack direction={"row"} align={"center"} justify={"center"}>
                <FcGoogle fontSize={"1.5rem"} />
                <Text fontSize={"0.8rem"} fontWeight={500} color={"#000000"}>
                  Login with Google
                </Text>
              </Stack>
            </Button>

            {isConnected ? (
              <Button
                as={Link}
                to={`/auth/beforeLoginList`}
                bgColor={"black"}
                borderRadius={"lg"}
                my={"0.2rem"}
                cursor={"pointer"}
                _hover={{ bgColor: "blackAlpha.800" }}
              >
                <Text fontSize={"0.8rem"} fontWeight={600} color={"#F0E13D"}>
                  Scan your items
                </Text>
              </Button>
            ) : (
              <Button
                bgColor={"black"}
                borderRadius={"lg"}
                my={"0.2rem"}
                cursor={"pointer"}
                _hover={{ bgColor: "blackAlpha.800" }}
                onClick={connectToDevice}
              >
                <Text fontSize={"0.8rem"} fontWeight={600} color={"#F0E13D"}>
                  Connect
                </Text>
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
