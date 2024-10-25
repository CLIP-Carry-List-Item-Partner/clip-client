import {
  Stack,
  Text,
  Image,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { GoPlus } from "react-icons/go";
import { useForm, Controller } from "react-hook-form";
import { useBluetooth } from "@/providers/BluetoothProvider";
import { Items } from "../../../dummy";
import item from "@/assets/item.svg";
import list from "@/assets/list.svg";

type List = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  items: Item[];
};

type Item = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const listSchema = z
  .object({
    name: z
      .string({ required_error: "List name is required" })
      .min(3, { message: "Minimum 3 Words" })
      .max(255),
  })
  .extend({
    items: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .optional(),
  });

type LisDataFillable = z.infer<typeof listSchema>;

type ModalState = {
  state?: List;
  mode: "create" | "edit";
};

const List = () => {
  const auth = useAuth();
  const nav = useNavigate();
  // const { bleClip, isConnected } = useBluetooth();
  const errorHandler = useToastErrorHandler();
  const toast = useToast();
  const api = useApi();
  const size = ["sm"];

  const { data: listData, mutate } = useSWR("/list");

  // const { data: itemData } = useSWR<Item[]>("/item");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<LisDataFillable>({
    resolver: zodResolver(listSchema),
  });

  const [modalState, setModalState] = useState<ModalState | undefined>();

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  return (
    <>
      <Stack
        w={"full"}
        maxW={"425px"}
        minH={"100vh"}
        lineHeight={"1.2rem"}
        bgColor={"white"}
        p={"1.25rem 1.25rem 8rem 1.25rem"}
        fontFamily={"PlusJakartaSans"}
      >
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
              // colorScheme={"#EEEEEE"}
              bgColor={"#EEEEEE"}
              color={"#0B1215"}
              fontSize={"0.75rem"}
              fontWeight={"medium"}
              textAlign={"justify"}
              alignItems={"center"}
              justifyItems={"center"}
              borderRadius={"10px"}
              leftIcon={<GoPlus size={"1rem"} />}
              onClick={() => setModalState({ mode: "create" })}
            >
              New List
            </Button>
          </Stack>
          {listData && listData.data ? (
            listData.data
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
        {/* <-- Saved List end --> */}
      </Stack>

      {/* Modal Start */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(undefined)}
        size={size}
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent borderRadius={"15px"}>
          <ModalHeader
            fontWeight={"bold"}
            fontFamily={"PlusJakartaSans"}
            fontSize={"1rem"}
          >
            Create A New List
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modalState?.mode === "create" && (
              <form
                id="add-data"
                onSubmit={handleSubmit((data) => {
                  api
                    .post<ResponseModel>("/list/create", data)
                    .then((res) => {
                      toast({
                        title: "List created successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        description: res.data.message,
                      });
                    })
                    .catch(errorHandler)
                    .finally(() => {
                      setModalState(undefined);
                      mutate();
                      // listData.mutate();
                    });
                })}
              >
                <Stack>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel
                      fontFamily={"PlusJakartaSans"}
                      fontWeight={"normal"}
                      fontSize={"0.8rem"}
                    >
                      List Name
                    </FormLabel>

                    <Input
                      placeholder="Input your list name"
                      {...register("name")}
                      type="text"
                    />

                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </form>
            )}
          </ModalBody>

          <ModalFooter>
            {modalState?.mode === "create" && (
              <Button
                type="submit"
                form="add-data"
                bgColor={"black"}
                color={"#F0E13D"}
                fontFamily={"PlusJakartaSans"}
                fontWeight={"normal"}
                fontSize={"0.8rem"}
                borderRadius={"10px"}
              >
                Create
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal End */}
    </>
  );
};

export default List;
