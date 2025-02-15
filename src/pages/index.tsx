import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "@/router";
import { Spinner, Stack, Text } from "@chakra-ui/react";

const Root = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (auth.status === "unauthenticated") {
        return navigate("/auth/login");
      }
      if (auth.status === "authenticated") {
        return navigate("/clip");
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Stack align={"center"} justify={"center"}>
        <Spinner />
      </Stack>
    </>
  );
};

export default Root;
