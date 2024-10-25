import { Stack, Text, Image, useToast, Spinner } from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import { useFetcher } from "@/hooks/useApi";

const AppLayout = () => {
  const auth = useAuth();
  const fetcher = useFetcher();
  const nav = useNavigate();

  if (auth.status === "loading") {
    return (
      <Stack
        justifyItems={"center"}
        alignItems={"center"}
        bgColor={"white"}
        minW={"320px"}
        maxW={"425px"}
        minH={"100vh"}
      >
        <Spinner size={"xl"} />
        <Text>Loading...</Text>
      </Stack>
    );
  }

  return (
    <>
      <SWRConfig
        value={{
          fetcher,
          refreshInterval: 10 * 1000,
        }}
      >
        {/* Contents */}
        <Outlet />
      </SWRConfig>
    </>
  );
};

export default AppLayout;
