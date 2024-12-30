import { Stack, Text, Spacer, Box, Button } from "@chakra-ui/react";
import { FaChevronCircleLeft } from "react-icons/fa";
import Lists from "../../dummy.tsx";
import CurrTemplate from "../../components/currListTemplate.tsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CurrentList = () => {
  const [isZonk, setIsZonk] = useState(false); // Liat ada item apa nggak di List dummy data
  const i = 1; // Index List dummy data

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Box as={Link} to="/list">
          <FaChevronCircleLeft fontSize={"1.5rem"} />
        </Box>
        <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
          {Lists[i].listname}
        </Text>
        <Spacer />
        <Button
          as={Link}
          to="/editList"
          bgColor={"white"}
          border={"1px"}
          borderRadius={"xl"}
          px={"1rem"}
          h={"1.7rem"}
        >
          <Text fontWeight={"500"} color={"#777777"} fontSize={"0.75rem"}>
            Edit
          </Text>
        </Button>
      </Stack>
      {isZonk ? (
        <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} p={"1rem"} h={"45rem"}>
          <Stack
            border={"1px"}
            borderRadius={"lg"}
            borderStyle={"dashed"}
            my={"0.125rem"}
            p={"1rem"}
            textAlign={"center"}
          >
            <Text fontSize={"0.9rem"} fontWeight={600}>
              Select “Edit” to scan your item
            </Text>
          </Stack>
        </Stack>
      ) : (
        <Stack
          bgColor={"#eeeeee"}
          borderRadius={"2xl"}
          p={"1rem"}
          h={"45rem"}
          overflowY={"auto"}
        >
          {Lists[i].items.map((item, index) => (
            <CurrTemplate
              listData={{
                items: [],
              }}
              key={index}
              {...item}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default CurrentList;
