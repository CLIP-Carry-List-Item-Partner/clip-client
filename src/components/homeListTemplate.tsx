import { Stack, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const HomeList = ({
  listData,
}: {
  listData: { items: { itemName: string; itemId: string }[] };
}) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"xl"}
      my={"0.125rem"}
      p={"0.75rem"}
      boxShadow={"md"}
      _hover={{ bgColor: "#f9f9f9" }}
      transition="background-color 0.2s ease-in-out"
    >
      {listData.items.map((item, index) => (
        <Stack
          key={index}
          flexDirection={"row"}
          justify={"space-between"}
          w={"100%"}
        >
          <Stack flexDirection={"row"}>
            <FaCircle color={"#f0e13d"} fontSize={"1.25rem"} />
            <Text
              fontSize={"0.9rem"}
              fontWeight={600}
              ml={"0.25rem"}
              wordBreak="break-word"
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
            >
              {item.itemId}
            </Text>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default HomeList;
