import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "@/router";
import { Stack, Text } from "@chakra-ui/react";

const Root = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      return navigate("/auth/login");
    }

    // nanti diarahkan ke sini kalau sudah terautentikasi
    // if (auth.status === "authenticated") {
    //   return navigate("/clip");
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Stack align={"center"} justify={"center"}>
        <Text>TESSSS</Text>
      </Stack>
    </>
  );
};

export default Root;
