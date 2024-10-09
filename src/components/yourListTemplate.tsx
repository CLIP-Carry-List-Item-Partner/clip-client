import { Stack, Text, Spacer } from "@chakra-ui/react";

const SavedList = ({
  listname,
  lastUpdated,
  items,
}: {
  listname: string;
  lastUpdated: string;
  items: { name: string; id: string }[];
}) => {
  return (
    <Stack bgColor={"#eeeeee"} borderRadius={"2xl"}>
      <Stack
        direction={"row"}
        align={"center"}
        mb={"0.25rem"}
        px={"1rem"}
        pt={"1rem"}
      >
        <Text fontWeight={"600"} color={"black"} fontSize={"1rem"}>
          {listname}
        </Text>
        <Spacer />
        <Text fontWeight={"400"} color={"#00000080"} fontSize={"0.7rem"}>
          Updated, {lastUpdated}
        </Text>
      </Stack>
      <Stack overflowX={"auto"} direction={"row"} px={"1rem"} pb={"1rem"}>
        <Stack
          fontWeight={"500"}
          fontSize={"0.75rem"}
          direction={"row"}
          justify={"start"}
          align={"center"}
        >
          {items.map((item, index) => (
            <Stack
              key={index}
              px={"1rem"}
              py={"0.25rem"}
              color={"white"}
              bgColor={"black"}
              borderRadius={"lg"}
              w={"max-content"}
            >
              <Text>{item.name}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SavedList;
