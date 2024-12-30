import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "@/router";
import { useLocation } from "react-router-dom";
import { Spinner, Stack, Text, useToast } from "@chakra-ui/react";

const GoogleCallback = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (auth.status === "authenticated") {
      toast({
        title: "Error",
        description: "You are already logged in!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return nav("/clip");
    }

    if (auth.status === "unauthenticated") {
      const searchParams = new URLSearchParams(loc.search);
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (!code) {
        toast({
          title: "Error",
          description: "Invalid token",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return nav("/auth/login");
      }

      if (error) {
        toast({
          title: "Error",
          description: "Google authentication failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return nav("/auth/login");
      }

      auth
        .googleCallback(code)
        .then(() => {
          toast({
            title: "Welcome back!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          nav("/clip");
        })

        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          nav("/auth/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Stack justifyItems={"center"} alignItems={"center"} bgColor={"white"}>
        <Spinner size={"xl"} />
        <Text>Loading...</Text>
      </Stack>
    </>
  );
};

export default GoogleCallback;
