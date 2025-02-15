import { Stack, Text, Spacer } from "@chakra-ui/react";

const AllList = ({
  listData,
}: {
  listData: {
    name: string;
    updatedAt: string;
    items: { itemName: string }[];
  };
}) => {
  return (
    <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} my={"0.2rem"}>
      {/* Header Section */}
      <Stack
        direction={"row"}
        align={"center"}
        mb={"0.25rem"}
        px={"1rem"}
        pt={"1rem"}
      >
        <Text
          fontWeight={"medium"}
          color={"black"}
          fontSize={"0.8rem"}
          noOfLines={1}
        >
          {listData.name || "List Name"}
        </Text>
        <Spacer />
        <Text fontWeight={400} color={"#00000080"} fontSize={"0.7rem"}>
          {listData.updatedAt}
        </Text>
      </Stack>

      {/* Checking if listData.items exists and mapping over the items */}
      {listData &&
      Array.isArray(listData.items) &&
      listData.items.length > 0 ? (
        <Stack overflowX={"auto"} direction={"row"} px={"1rem"} pb={"1rem"}>
          <Stack
            fontWeight={400}
            fontSize={"0.75rem"}
            direction={"row"}
            justify={"start"}
            align={"center"}
          >
            {/* Iterasi untuk menampilkan setiap item */}
            {listData.items.map((item, index) => (
              <Stack
                key={index}
                px={"1rem"}
                py={"0.25rem"}
                color={"white"}
                bgColor={"black"}
                borderRadius={"lg"}
                w={"max-content"}
              >
                <Text noOfLines={1}>{item.itemName}</Text>{" "}
                {/* Menampilkan nama item */}
              </Stack>
            ))}
          </Stack>
        </Stack>
      ) : (
        <Stack mb={"1rem"} px={"1rem"}>
          <Stack
            border={"1px"}
            borderRadius={"md"}
            borderStyle={"dashed"}
            borderColor={"black"}
            textAlign={"center"}
            py={"0.3rem"}
          >
            <Text fontWeight={400} color={"#000000"} fontSize={"0.8rem"}>
              Scan Your Item
            </Text>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default AllList;
