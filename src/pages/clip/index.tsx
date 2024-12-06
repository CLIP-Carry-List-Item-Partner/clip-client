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
import AllList from "@/components/allListTemplate";
import { useState, useEffect } from "react";
import Lists from "@/dummy.tsx";
import { useNavigate } from "@/router";
import useAuth from "@/hooks/useAuth";
import { Outlet, useLocation, Link } from "react-router-dom";
import useSWR from "swr";
import { HiOutlineLogout } from "react-icons/hi";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { z } from "zod";
import { useBluetooth } from "@/providers/BluetoothProvider";
import { FaCircleCheck } from "react-icons/fa6";
import HomeList from "@/components/homeListTemplate";

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

  console.log(listData.data);

  const currentList = listData.data?.data?.sort(
    (a: List, b: List) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];

  // console.log(currentList);

  // const allList = listData.data?.data;

  // const itemData = useSWR<Item[]>("/item");

  useEffect(() => {
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

    // if (auth.status === "authenticated") {
    //   toast({
    //     title: "Welcome back!",
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   nav("/clip");
    //   return;
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // const [isActive, setIsActive] = useState(false);
  // const handleStatusClick = () => {
  //   setIsActive(!isActive);
  // };

  // let i = 0;

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
            <Text fontWeight={700} fontSize={"1.2rem"}>
              {auth.user?.name}
            </Text>
            <Text fontWeight={400} color={"#777777"} fontSize={"0.75rem"}>
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
              />
            </MenuButton>
            <MenuList
              p={"0.5rem"}
              backdropBlur={"xl"}
              opacity={"50%"}
              shadow={"lg"}
            >
              <MenuGroup title="Profile">
                <MenuItem
                  as={Link}
                  to={"/auth/user/profile"}
                  fontWeight={"normal"}
                >
                  My Account
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem
                icon={<HiOutlineLogout size="1.5em" />}
                onClick={() => auth.logout()}
                fontWeight={"bold"}
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
          <Spacer />
          <Image src={pb} alt="pb" maxH={"100%"} />
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
              </Text>
            </Stack>
          </Stack>
          <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} p={"1rem"}>
            {listData &&
            Array.isArray(listData.data) &&
            listData.data.length > 0 ? (
              // Sort by 'createdAt' and get the latest 3 items
              listData.data
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 3) // Get the latest 3 items
                .map((item: any) => {
                  console.log("Rendering item:", item); // Debugging log
                  return (
                    <HomeList
                      key={item.id} // Use item.id for the key
                      listData={{
                        items: [
                          {
                            itemName: item.name, // Accessing the name correctly
                            itemId: item.id, // Accessing the id correctly
                          },
                        ],
                      }}
                    />
                  );
                })
            ) : (
              <Text>No items in this list</Text>
            )}

            <Button
              as={Link}
              to={`/list/${currentList?.id}`}
              color={"#000000B2"}
              fontSize={"0.75rem"}
              textAlign={"center"}
              mt={"0.25rem"}
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
                // nanti yang di [id] dibenerin
                <Link to={`/clip/list/${list.id}`}>
                  <AllList
                    key={list.id} // Ensure unique key for each list
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
