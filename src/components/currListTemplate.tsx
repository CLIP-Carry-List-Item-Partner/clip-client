import { Stack, Text } from "@chakra-ui/react";
// import { FaCircle } from "react-icons/fa";
import { FaCircle, FaTrash } from "react-icons/fa";

const CurrentList = ({
  listData,
}: {
  listData: {
    items: { itemName: string; itemId: string }[];
  };
}) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"md"}
      my={"0.125rem"}
      p={"0.75rem"}
      boxShadow={"sm"}
      _hover={{ bgColor: "#f9f9f9" }}
      transition="background-color 0.2s ease-in-out"
    >
      {listData.items.map((item, index) => (
        <Stack
          key={index}
          flexDirection={"row"}
          justify={"space-between"}
          w={"100%"}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <Stack flexDirection={"row"}>
            <Text
              fontSize={"0.9rem"}
              fontWeight={600}
              ml={"0.25rem"}
              wordBreak="break-word"
              noOfLines={1}
            >
              {item.itemName}
            </Text>
          </Stack>
          <Stack
            bgColor={"black"}
            color={"white"}
            px={"0.5rem"}
            py={"0.1rem"}
            borderRadius={"md"}
            wordBreak="break-all"
          >
            <Text
              fontSize={"0.7rem"}
              fontWeight={400}
              letterSpacing={"0.05rem"}
              color={"#f0e13d"}
              noOfLines={1}
            >
              {item.itemId}
            </Text>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default CurrentList;
