import { Stack, Text, Spacer, Button } from "@chakra-ui/react";

const ItemTemplate2 = ({
  itemData,
  onClick,
  onClickEdit,
}: {
  itemData: {
    id: string;
    name: string;
  };
  onClick: () => void;
  onClickEdit: () => void;
}) => {
  return (
    <Stack
      border={"1px"}
      borderRadius={"xl"}
      borderColor={"#DDDDDD"}
      shadow={"base"}
      my={"0.125rem"}
      p={"1.2rem"}
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
          <Text fontSize={"0.7rem"} fontWeight={400} color={"white"}>
            {itemData.id}
          </Text>
        </Stack>
        <Text w={"10rem"} fontSize={"1rem"} fontWeight={500} mt={"0.3rem"}>
          {itemData.name}
        </Text>
      </Stack>
      <Spacer />
      <Stack direction={"row"} color={"#4E4E4E"} me={"0.5rem"}>
        <Button
          bgColor={"white"}
          border={"1px"}
          h={"2rem"}
          px={"0.5rem"}
          mx={"0.2rem"}
          fontSize={"0.7rem"}
          fontWeight={500}
          onClick={onClick}
        >
          Delete
        </Button>
        <Button
          bgColor={"#EEEEEE"}
          h={"2rem"}
          px={"1rem"}
          mx={"0.2rem"}
          fontSize={"0.7rem"}
          fontWeight={500}
          onClick={onClickEdit}
        >
          Edit
        </Button>
      </Stack>
    </Stack>
  );
};

export default ItemTemplate2;
