import { Stack, Text, Spacer, Box, Button } from "@chakra-ui/react";
import Lists from "../../dummy.tsx";
import SavedTemplate from "../../components/saveListTemplate.tsx";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const List = () => {
  return (
    <Stack
      minW={"320px"}
      w={"full"}
      maxW={"425px"}
      minH={"100vh"}
      lineHeight={"1.2rem"}
      bgColor={"white"}
      p={"1.25rem 1.25rem 8rem 1.25rem"}
    >
      <Stack
        color={"black"}
        direction={"row"}
        mt={"1rem"}
        align={"center"}
        mb={"1.2rem"}
      >
        <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
          Your List
        </Text>
        <Spacer />
        <Button
          bgColor={"#EEEEEE"}
          borderRadius={"md"}
          px={"0.7rem"}
          h={"2rem"}
          leftIcon={<GoPlus />}
        >
          <Text fontWeight={"500"} color={"#4E4E4E"} fontSize={"0.75rem"}>
            New List
          </Text>
        </Button>
      </Stack>
      {Lists.map((list, index) => (
        <SavedTemplate key={index} {...list} />
      ))}
    </Stack>
  );
};

export default List;
