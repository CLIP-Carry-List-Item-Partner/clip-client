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
import CurrTemplate from "@/components/currListTemplate.tsx";
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

const Home = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const errorHandler = useToastErrorHandler();
  const toast = useToast();
  const api = useApi();

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

  const listData = useSWR("/list");

  const currentList = listData.data?.data?.sort(
    (a: List, b: List) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];

  console.log(currentList);

  const allList = listData.data?.data;

  const itemData = useSWR<Item[]>("/item");

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

  const [isActive, setIsActive] = useState(false);
  const handleStatusClick = () => {
    setIsActive(!isActive);
  };

  let i = 0;

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
                <MenuItem fontWeight={"normal"}>My Account</MenuItem>
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
          borderRadius={"lg"}
          direction={"row"}
          align={"center"}
          mt={"0.8rem"}
          bgGradient={
            "linear(to-r, blackAlpha.700, blackAlpha.800, blackAlpha.900)"
          }
        >
          <Stack ml={"1.2rem"}>
            <Text
              color={"white"}
              fontSize={"1.25rem"}
              fontWeight={600}
              mb={"0.2rem"}
            >
              Device Status
            </Text>
            {isActive ? (
              <Stack direction={"row"} justify={"center"} align={"center"}>
                <Button
                  h={"2rem"}
                  w={"full"}
                  onClick={handleStatusClick}
                  cursor={"pointer"}
                  bgColor={"#f0e13d"}
                  _hover={{ bgColor: "#a29609" }}
                  fontWeight={600}
                  fontSize={"0.7rem"}
                >
                  Active
                </Button>
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
                  onClick={handleStatusClick}
                  cursor={"pointer"}
                  size={"sm"}
                  h={"2rem"}
                  borderRadius={"lg"}
                  _hover={{ bgColor: "#a29609" }}
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
        <Stack color={"black"} mt={"0.75rem"}>
          <Stack
            direction={"row"}
            align={"center"}
            justify={"space-between"}
            mb={"0.5rem"}
          >
            <Text fontSize={"1.2rem"} fontWeight={700}>
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
            {/* Kondisi loading saat data sedang di-fetch */}
            {!itemData.data && !itemData.error && <Text>Loading items...</Text>}

            {/* {!currentList?.items} */}

            {/* Kondisi error jika fetching data gagal */}
            {itemData.error && <Text color="red">Failed to load items</Text>}

            {/* Pastikan data tersedia dan valid sebelum menggunakan map */}
            {/* {Array.isArray(itemData.data) &&
              itemData.data
                .slice(0, 3)
                .map((item, index) => <CurrTemplate key={index} {...item} />)} */}

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
        <Stack color={"black"} mt={"0.75rem"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={"0.5rem"}
          >
            <Text fontWeight={700} fontSize={"1.2rem"}>
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
          {listData && (
            <AllList
              listData={{
                name: listData.data?.name,
                // createdAt: listData.data?.createdAt,
                updatedAt: listData.data?.updatedAt,
                items: listData.data?.items,
              }}
            />
          )}
        </Stack>
        {/* <-- Saved List end -->     */}
      </Stack>
    </>
  );
};

export default Home;
