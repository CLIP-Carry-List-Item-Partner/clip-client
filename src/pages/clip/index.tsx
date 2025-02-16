import {
  Stack,
  Text,
  Image,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import pb from "@/assets/Powerbank.svg";
import clipModule from "@/assets/clipModule.svg";
import AllList from "@/components/AllList";
import { useState, useEffect } from "react";
import { useNavigate } from "@/router";
import useAuth from "@/hooks/useAuth";
import { Outlet, useLocation, Link } from "react-router-dom";
import useSWR from "swr";
import { HiOutlineLogout } from "react-icons/hi";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { z } from "zod";
import { useBluetooth } from "@/providers/BluetoothProvider";
import { FaCircle, FaCircleCheck } from "react-icons/fa6";

type List = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type Item = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const Home = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const { isConnected, connectToDevice } = useBluetooth();
  const errorHandler = useToastErrorHandler();
  const toast = useToast();
  const api = useApi();

  const listData = useSWR("/list");

  const currentList = listData.data?.data?.sort(
    (a: List, b: List) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0] ?? { items: [] };

  // if (!currentList) {
  //   console.log("No lists available");
  // } else {
  //   console.log(currentList.items);
  // }

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      toast({
        title: "Please login to continue",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      nav("/auth/login");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Stack
        w={"full"}
        maxW={"425px"}
        minH={"100vh"}
        lineHeight={"1.2rem"}
        bgColor={"white"}
        p={"1.25rem 1.25rem 8rem 1.25rem"}
      >
        {/* <-- Nama, Email, Profile Start --> */}
        <Stack direction={"row"} align={"center"}>
          <Stack color={"black"} gap={"0.4rem"}>
            <Text fontWeight={700} fontSize={"1.2rem"} noOfLines={1}>
              {auth.user?.name}
            </Text>
            <Text
              fontWeight={400}
              color={"#777777"}
              fontSize={"0.75rem"}
              noOfLines={1}
            >
              {auth.user?.email}
            </Text>
          </Stack>
          <Spacer />
          <Menu>
            <MenuButton>
              <Image
                src={auth.user?.picture}
                alt="profile"
                borderRadius={"full"}
                boxSize={"2.75rem"}
                objectFit={"cover"}
                cursor={"pointer"}
                referrerPolicy="no-referrer"
              />
            </MenuButton>
            <MenuList
              p={"0.3rem"}
              // backdropBlur={"xl"}
              // opacity={"50%"}
              shadow={"lg"}
              borderRadius={"xl"}
            >
              <MenuItem
                icon={<HiOutlineLogout size="1.5em" />}
                onClick={() => auth.logout()}
                fontWeight={"bold"}
                py={"0.6rem"}
                color={"red.700"}
                borderRadius={"lg"}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
        {/* <-- Tagline, Nama, Profile End --> */}
        {/* <-- Device Status Start --> */}
        <Stack
          h={"6rem"}
          bgColor={"#9d9d9d"}
          borderRadius={"xl"}
          direction={"row"}
          align={"center"}
          mt={"0.8rem"}
          bgGradient={
            "linear(to-r, blackAlpha.700, blackAlpha.800, blackAlpha.900)"
          }
          overflow={"hidden"}
        >
          <Stack ml={"1.2rem"} spacing={"0.8rem"}>
            <Text
              color={"white"}
              fontSize={"1.1rem"}
              fontWeight={"semibold"}

              // mb={"0.2rem"}
            >
              Device Status
            </Text>
            {isConnected ? (
              <Stack
                h={"2rem"}
                w={"full"}
                bgColor={"#f0e13d"}
                fontWeight={"medium"}
                alignItems={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                borderRadius={"md"}
                direction={"row"}
              >
                <FaCircleCheck color={"#000000"} width={"2px"} />
                <Text>Active</Text>
              </Stack>
            ) : (
              <Stack
                direction={"row"}
                h={"2rem"}
                align={"center"}
                justify={"center"}
              >
                <Text
                  bgColor={"#9d9d9d"}
                  color={"#000000B2"}
                  borderRadius={"lg"}
                  px={"0.7rem"}
                  py={"0.4rem"}
                  fontWeight={500}
                  fontSize={"0.75rem"}
                >
                  Inactive
                </Text>
                <Button
                  bgColor={"#f0e13d"}
                  onClick={connectToDevice}
                  cursor={"pointer"}
                  size={"sm"}
                  h={"2rem"}
                  borderRadius={"lg"}
                  // _hover={{ bgColor: "#a29609" }}
                >
                  <Text color={"black"} fontWeight={500} fontSize={"0.75rem"}>
                    Pair
                  </Text>
                </Button>
              </Stack>
            )}
          </Stack>
          {/* <Spacer /> */}
          <Image
            src={clipModule}
            alt="clipModule"
            w={"100%"}
            mt={"2rem"}
            mr={"4rem"}
          />
        </Stack>
        {/* <-- Device Status End --> */}

        {/* <-- Current List Start --> */}
        <Stack color={"black"} mt={"2rem"}>
          <Stack
            direction={"row"}
            align={"center"}
            justify={"space-between"}
            mb={"0.8rem"}
          >
            <Text fontSize={"1rem"} fontWeight={700}>
              Current List
            </Text>
            <Stack
              border={"1px"}
              borderRadius={"xl"}
              py={"0.1rem"}
              px={"0.5rem"}
              borderColor={"#777777"}
            >
              <Text fontSize={"0.8rem"} fontWeight={"normal"}>
                {currentList?.name}
                {" - "}
                {currentList.items.length}
                {currentList.items.length > 1 ? " items" : " item"}
              </Text>
            </Stack>
          </Stack>
          <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} p={"0.6rem"}>
            {currentList.items.map(
              (item: { itemId: string; itemName: string }) => (
                <Stack
                  key={item.itemId}
                  direction={"row"}
                  alignItems={"center"}
                  bgColor={"white"}
                  borderRadius={"xl"}
                  // my={"0.125rem"}
                  p={"0.75rem"}
                  boxShadow={"sm"} // Add a shadow for better UI
                  _hover={{ bgColor: "#f9f9f9" }} // Hover effect for interactivity
                  transition="background-color 0.2s ease-in-out"
                >
                  <Stack
                    // key={index}
                    flexDirection={"row"}
                    // align={"center"}
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
                        noOfLines={1}
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
                        noOfLines={1}
                      >
                        {item.itemId}
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              )
            )}

            <Button
              as={Link}
              to={`/clip/list/${currentList?.id}`}
              color={"#000000B2"}
              fontSize={"0.75rem"}
              textAlign={"center"}
              my={"0.6rem"}
              fontWeight={400}
              variant={"link"}
            >
              View All Items
            </Button>
          </Stack>
        </Stack>
        {/* <-- Current List End --> */}

        {/* <-- Saved List start --> */}
        <Stack color={"black"} mt={"2rem"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={"0.5rem"}
          >
            <Text fontWeight={700} fontSize={"1rem"}>
              Your List
            </Text>
            <Button
              as={Link}
              to={`/clip/list`}
              variant={"link"}
              color={"#0B1215"}
              fontSize={"0.75rem"}
              fontWeight={500}
              textAlign={"center"}
            >
              View All
            </Button>
          </Stack>
          {listData && listData.data ? (
            listData.data.data
              .sort(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (a: any, b: any) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((list: any) => (
                <Link to={`/clip/list/${list.id}`}>
                  <AllList
                    key={list.id}
                    listData={{
                      items: list.items,
                      name: list.name,
                      updatedAt: new Date(list.updatedAt).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      ),
                    }}
                  />
                </Link>
              ))
          ) : (
            <Stack>
              <Text>Your list will be shown here</Text>
            </Stack>
          )}
        </Stack>
        {/* <-- Saved List end -->     */}
      </Stack>
    </>
  );
};

export default Home;
