import { Stack, Text, Spacer, Box, Button, Input } from "@chakra-ui/react";
import { FaChevronCircleLeft } from "react-icons/fa";
import Lists from "@/dummy.tsx";
import { Link } from "react-router-dom";
import ItemTemplate from "@/components/itemTemplate.tsx";
import { useState, useEffect } from "react";

const EditList = () => {
  const [isZonk, setIsZonk] = useState(false); // Liat ada item apa nggak di List dummy data

  // cek apakah ada item di List dummy data sesuai index
  useEffect(() => {
    const hasItems = Lists[i].items.length > 0;
    if (!hasItems) {
      setIsZonk(true);
    } else {
      setIsZonk(false);
    }
  });

  let i = 1; // Index List dummy data

  return (
    <Stack
      minW={"320px"}
      w={"full"}
      maxW={"425px"}
      minH={"100vh"}
      lineHeight={"1.2rem"}
      bgColor={"white"}
      p={"1.25rem"}
    >
      <Stack
        color={"black"}
        direction={"row"}
        mt={"1rem"}
        align={"center"}
        mb={"0.8rem"}
      >
        <Box as={Link} to="/currentList">
          <FaChevronCircleLeft fontSize={"1.5rem"} />
        </Box>
        <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
          Edit List
        </Text>
        <Spacer />
        <Stack>
          <Text
            bgColor={"white"}
            border={"1px"}
            borderRadius={"xl"}
            px={"0.7rem"}
            py={"0.2rem"}
            fontWeight={"500"}
            color={"#777777"}
            fontSize={"0.75rem"}
          >
            Updated, {Lists[i].lastUpdated}
          </Text>
        </Stack>
      </Stack>
      <Stack mt={"0.5rem"}>
        <Text fontSize={"0.9rem"} fontWeight={"600"} color={"#000000"}>
          List Name
        </Text>
        <Input defaultValue={Lists[i].listname} placeholder="List Name" />
      </Stack>
      <Stack mt={"0.5rem"}>
        <Text fontSize={"0.9rem"} fontWeight={"600"} color={"#000000"}>
          Items
        </Text>
        {isZonk ? (
          <Stack
            bgColor={"#eeeeee"}
            borderRadius={"2xl"}
            p={"1rem"}
            h={"34rem"}
          >
            <Stack
              bgColor={"white"}
              border={"1px"}
              borderRadius={"xl"}
              borderStyle={"dashed"}
              my={"0.125rem"}
              p={"0.75rem"}
            >
              <Stack
                bgColor={"black"}
                color={"white"}
                px={"0.5rem"}
                py={"0.2rem"}
                borderRadius={"md"}
                w={"fit-content"}
              >
                <Text
                  fontSize={"0.5rem"}
                  fontWeight={400}
                  letterSpacing={"0.05rem"}
                  color={"#F0E13D"}
                >
                  #XXXXXXXXX
                </Text>
              </Stack>
              <Text fontSize={"0.9rem"} fontWeight={500}>
                Your item will be listed here
              </Text>
            </Stack>
          </Stack>
        ) : (
          <Stack
            bgColor={"#eeeeee"}
            borderRadius={"2xl"}
            p={"1rem"}
            h={"34rem"}
            overflowY={"auto"}
          >
            {Lists[i].items.map((item, index) => (
              <ItemTemplate key={index} {...item} />
            ))}
          </Stack>
        )}
      </Stack>
      <Stack
        mt={"auto"}
        mb={"15px"}
        direction={"row"}
        justify={"center"}
        w={"full"}
      >
        <Button
          as={Link}
          to="/currentList"
          bgColor={"white"}
          borderRadius={"lg"}
          border={"1px"}
          py={"0.2rem"}
          px={"4rem"}
          cursor={"pointer"}
          _hover={{ bgColor: "whiteAlpha.900" }}
        >
          <Text fontSize={"0.8rem"} fontWeight={600} color={"#000000"}>
            Cancel
          </Text>
        </Button>
        <Button
          bgColor={"black"}
          borderRadius={"lg"}
          py={"0.2rem"}
          px={"4rem"}
          cursor={"pointer"}
          _hover={{ bgColor: "blackAlpha.800" }}
        >
          <Text fontSize={"0.8rem"} fontWeight={600} color={"#F0E13D"}>
            Save
          </Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditList;
