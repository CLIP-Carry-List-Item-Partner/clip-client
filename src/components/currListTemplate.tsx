import { Stack, Text, Spacer } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

interface CurrentListProps {
  name: string;
  id: string;
}

const CurrentList = ({ name, id }: CurrentListProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"xl"}
      my={"0.125rem"}
      p={"0.75rem"}
      boxShadow={"md"} // Add a shadow for better UI
      _hover={{ bgColor: "#f9f9f9" }} // Hover effect for interactivity
      transition="background-color 0.2s ease-in-out"
    >
      <Stack direction={"row"} align={"center"}>
        <FaCircle color={"#f0e13d"} fontSize={"1.25rem"} />
        <Text
          fontSize={"0.9rem"}
          fontWeight={600}
          ml={"0.25rem"}
          wordBreak="break-word"
        >
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
        wordBreak="break-all" // Handle long ids gracefully
      >
        <Text fontSize={"0.7rem"} fontWeight={400} letterSpacing={"0.05rem"}>
          {id}
        </Text>
      </Stack>
    </Stack>
  );
};

export default CurrentList;
