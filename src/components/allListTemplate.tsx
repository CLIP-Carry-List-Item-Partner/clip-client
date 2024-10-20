import { Stack, Text, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const AllList = ({
  listData,
}: {
  listData: {
    name: string;
    updatedAt: string;
    items?: { name: string; id: string }[];
  };
}) => {
  const [isZonk, setIsZonk] = useState(false);

  useEffect(() => {
    const hasItems = listData.items && listData.items.length > 0;
    setIsZonk(!hasItems);
  }, [listData.items]);

  return (
    <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} my={"0.2rem"}>
      <Stack
        direction={"row"}
        align={"center"}
        mb={"0.25rem"}
        px={"1rem"}
        pt={"1rem"}
      >
        <Text fontWeight={"medium"} color={"black"} fontSize={"1rem"}>
          {listData.name || "List Name"}
        </Text>
        <Spacer />
        <Text fontWeight={400} color={"#00000080"} fontSize={"0.7rem"}>
          {listData.updatedAt || ""}
        </Text>
      </Stack>
      {isZonk ? (
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
      ) : (
        // Show list items
        <Stack overflowX={"auto"} direction={"row"} px={"1rem"} pb={"1rem"}>
          <Stack
            fontWeight={400}
            fontSize={"0.75rem"}
            direction={"row"}
            justify={"start"}
            align={"center"}
          >
            {(listData.items || []).map((item, index) => (
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
      )}
    </Stack>
  );
};

export default AllList;
