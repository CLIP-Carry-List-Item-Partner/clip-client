import { Stack, Text, Spacer, Box, Button, useToast } from "@chakra-ui/react";
import { FaChevronCircleLeft } from "react-icons/fa";
import CurrTemplate from "@/components/currListTemplate.tsx";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import useSWR from "swr";

const DetailList = () => {
  const { id } = useParams(); // Get list ID from URL
  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();

  // Fetch the specific list using the ID from the URL
  const { data: listData } = useSWR(`/list/${id}`);

  useEffect(() => {
    if (auth.status === "loading") {
      return;
    }

    if (auth.status === "unauthenticated") {
      toast({
        title: "Please login to continue",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      nav("/auth/login");
      return;
    }
  }, [auth, nav, toast]);

  if (!listData) {
    return <Text>Loading...</Text>;
  }

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
      {/* <-- Header Start --> */}
      <Stack
        color={"black"}
        direction={"row"}
        mt={"1rem"}
        align={"center"}
        mb={"0.8rem"}
      >
        <Box as={Link} to="/clip/list">
          <FaChevronCircleLeft fontSize={"1.5rem"} />
        </Box>
        <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
          {listData && listData.data ? (
            listData.data.name
          ) : (
            <Text>Loading...</Text>
          )}
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
      {/* <-- Header End --> */}

      {/* <-- Current List Start --> */}
      <Stack
        bgColor={"#eeeeee"}
        borderRadius={"2xl"}
        p={"1rem"}
        h={"45rem"}
        overflowY={"auto"}
      >
        {listData &&
        Array.isArray(listData.data.items) &&
        listData.data.items.length > 0 ? (
          // Map each item in the items array
          listData.data.items.map((item: any) => (
            <CurrTemplate
              key={item.item.id} // Use item.item.id for the key
              listData={{
                items: [
                  {
                    itemName: item.item.name, // Accessing the name correctly
                    itemId: item.item.id, // Accessing the id correctly
                  },
                ],
              }}
            />
          ))
        ) : (
          <Text>No items in this list</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default DetailList;
