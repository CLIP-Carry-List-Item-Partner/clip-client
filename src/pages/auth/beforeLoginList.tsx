import { Stack, Text, Button } from "@chakra-ui/react";
import Lists from "../../dummy.tsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ItemTemplate from "../../components/itemTemplate.tsx";

const BeforeLoginList = () => {
  const [isZonk, setIsZonk] = useState(false); // Liat ada item apa nggak di List dummy data
  let i = 2; // Index List dummy data

  // cek apakah ada item di List dummy data sesuai index
  useEffect(() => {
    const hasItems = Lists[i].items.length > 0;
    if (!hasItems) {
      setIsZonk(true);
    } else {
      setIsZonk(false);
    }
  });

  return (
    <Stack
      minW={"320px"}
      w={"full"}
      maxW={"425px"}
      minH={"100vh"}
      p={"1.25rem"}
      bgColor={"white"}
    >
      <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"} mb={"0.5rem"}>
        New List
      </Text>
      {/* Isi List Start */}
      <Stack
        bgColor={"#eeeeee"}
        borderRadius={"2xl"}
        p={"1rem"}
        h={"25rem"}
        overflowY={"auto"}
      >
        {isZonk ? (
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
        ) : (
          Lists[i].items.map((item, index) => (
            <ItemTemplate key={index} {...item} />
          ))
        )}
      </Stack>
      {/* Isi List End */}
      {/* Button Start */}
      <Stack mt={"auto"}>
        <Button
          bgColor={"black"}
          borderRadius={"lg"}
          p={"0.2rem"}
          cursor={"pointer"}
          _hover={{ bgColor: "blackAlpha.800" }}
          isDisabled={isZonk}
        >
          <Text fontSize={"0.8rem"} fontWeight={600} color={"#F0E13D"}>
            Login to save your list
          </Text>
        </Button>
        <Button
          as={Link}
          to="/login"
          bgColor={"white"}
          borderRadius={"lg"}
          border={"1px"}
          p={"0.2rem"}
          cursor={"pointer"}
          _hover={{ bgColor: "whiteAlpha.900" }}
        >
          <Text fontSize={"0.8rem"} fontWeight={600} color={"#000000"}>
            Cancel
          </Text>
        </Button>
      </Stack>
      {/* Button End */}
    </Stack>
  );
};

export default BeforeLoginList;
