import { Stack, Text, Spacer } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const CurrentList = ({ name, id }: { name: string; id: string }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"xl"}
      my={"0.125rem"}
      p={"0.75rem"}
    >
      <Stack direction={"row"} align={"center"}>
        <FaCircle color={"#f0e13d"} fontSize={"1.25rem"} />
        <Text w={"9rem"} fontSize={"0.9rem"} fontWeight={600} ml={"0.25rem"}>
          {name}
        </Text>
      </Stack>
      <Spacer />
      <Stack
        bgColor={"black"}
        color={"white"}
        px={"0.5rem"}
        py={"0.1rem"}
        borderRadius={"md"}
      >
        <Text fontSize={"0.7rem"} fontWeight={400} letterSpacing={"0.05rem"}>
          {id}
        </Text>
      </Stack>
    </Stack>
  );
};

export default CurrentList;
