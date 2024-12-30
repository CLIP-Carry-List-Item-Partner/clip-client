import { Stack, Text, Spacer, Box } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const ItemTemplate1 = ({
  name,
  id,
  onDelete,
}: {
  name: string;
  id: string;
  onDelete: (id: string) => void;
}) => {
  return (
    <Stack
      bgColor={"white"}
      borderRadius={"xl"}
      my={"0.125rem"}
      p={"0.75rem"}
      direction={"row"}
      align={"center"}
    >
      <Stack gap={0}>
        <Stack
          bgColor={"black"}
          color={"white"}
          px={"0.5rem"}
          py={"0.1rem"}
          borderRadius={"md"}
          w={"fit-content"}
        >
          <Text
            fontSize={"0.5rem"}
            fontWeight={400}
            letterSpacing={"0.05rem"}
            color={"#F0E13D"}
          >
            {id}
          </Text>
        </Stack>
        <Text w={"9rem"} fontSize={"0.9rem"} fontWeight={500} mt={"0.3rem"}>
          {name}
        </Text>
      </Stack>
      <Spacer />
      <Box
        as={FaTrash}
        color={"#00000040"}
        cursor={"pointer"}
        fontSize={"1.25rem"}
        me={"0.5rem"}
        onClick={() => onDelete(id)}
      />
    </Stack>
  );
};

export default ItemTemplate1;
