import {
  Stack,
  Text,
  Spacer,
  Box,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalContent,
  list,
  ModalFooter,
} from "@chakra-ui/react";
import { FaChevronCircleLeft } from "react-icons/fa";
import CurrTemplate from "@/components/currListTemplate.tsx";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import useSWR from "swr";
import { PiCaretCircleLeftFill } from "react-icons/pi";
import { z } from "zod";
import { useBluetooth } from "@/providers/BluetoothProvider";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

type ListUpdate = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    name: string;
  }[];
};

type ScannedItems = {
  id: string;
  name: string;
};

const listUpdateSchema = z.object({
  name: z.string().min(3).max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().min(3).max(255),
      })
    )
    .optional(),
});

type ListDataFillable = z.infer<typeof listUpdateSchema>;

type ModalState = {
  state?: ListUpdate;
  id: number;
  mode: "edit" | "delete";
};

const DetailList = () => {
  const { id } = useParams();
  const auth = useAuth();
  const nav = useNavigate();
  const mainSize = ["full"];
  const deleteSize = ["sm"];
  const toast = useToast();
  const errorHandler = useToastErrorHandler();
  const { bleClip, isConnected } = useBluetooth();
  const api = useApi();
  const [deleteConfirmModal, setDeteleConfirmModal] = useState(false);
  const [scannedItems, setScannedItems] = useState<ScannedItems[]>([]);

  const { data: listData, mutate } = useSWR(`/list/${id}`);

  const validateItem = async (itemId: string) => {
    try {
      const response = await api.get(`/item/${itemId}`);
      return response.data;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  };

  // const { data: itemData } = useSWR("/item");

  // BLECLIP Check
  // useEffect(() => {
  //   if (isConnected && bleClip) {
  //     bleClip.setAddItemCallback((newTagID) => {
  //       const existingItem = scannedItems.some((item) => item.id === newTagID);
  //       if (!existingItem) {
  //         setScannedItems((prev) => [
  //           ...prev,
  //           { id: newTagID, name: `Scanned Item ${prev.length + 1}` },
  //         ]);
  //       } else {
  //         toast({
  //           title: "Item already exists",
  //           status: "warning",
  //           duration: 3000,
  //           isClosable: true,
  //         });
  //       }
  //     });
  //   }
  // }, [isConnected, bleClip, scannedItems, toast]);

  useEffect(() => {
    if (isConnected && bleClip) {
      bleClip.setAddItemCallback(async (newTagID) => {
        const existingItem = scannedItems.some((item) => item.id === newTagID);
        if (existingItem) {
          toast({
            title: "Item already exists",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        // Validate if item exists in the /item endpoint
        const item = await validateItem(newTagID);
        if (item) {
          setScannedItems((prev) => [
            ...prev,
            {
              id: newTagID,
              name: item.data.name || `Scanned Item ${prev.length + 1}`,
            },
          ]);
        } else {
          toast({
            title: "Item not found",
            description: "This item does not exist.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, bleClip, scannedItems, toast]);

  // Auth Check
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
    formState: { errors },
    setValue,
  } = useForm<ListDataFillable>({
    resolver: zodResolver(listUpdateSchema),
    defaultValues: {
      name: listData?.data.name || "",
      items: scannedItems,
    },
  });

  useEffect(() => {
    if (scannedItems) {
      setValue("items", [...(listData?.data.items || []), ...scannedItems]);
    }
  }, [scannedItems, listData?.data.items, setValue]);

  const [modalState, setModalState] = useState<ModalState | undefined>();

  useEffect(() => {
    if (modalState && modalState.mode === "edit") {
      reset({
        name: modalState.state?.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  // useEffect(() => {
  //   reset();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [modalState]);

  return (
    <>
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
          <Box as={"button"} onClick={() => nav(-1)}>
            <PiCaretCircleLeftFill fontSize={"2rem"} />
          </Box>
          <Text fontSize={"1rem"} fontWeight={"semibold"} ml={"0.5rem"}>
            {listData && listData.data ? (
              listData?.data?.name
            ) : (
              <Text>Loading...</Text>
            )}
          </Text>
          <Spacer />
          <Button
            as={Link}
            // to="/editList"
            bgColor={"white"}
            border={"1px"}
            borderRadius={"xl"}
            px={"1rem"}
            h={"1.7rem"}
            onClick={() =>
              setModalState({
                mode: "edit",
                id: listData?.data?.id,
                state: listData?.data,
              })
            }
          >
            <Text fontWeight={"semibold"} color={"black"} fontSize={"0.75rem"}>
              Edit {listData?.data?.id}
            </Text>
          </Button>
        </Stack>
        {/* <-- Header End --> */}

        {/* <-- Current List Start --> */}
        <Stack
          bgColor={"#eeeeee"}
          borderRadius={"2xl"}
          p={"0.6rem"}
          h={"45rem"}
          overflowY={"auto"}
        >
          {listData &&
          Array.isArray(listData.data.items) &&
          listData.data.items.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            listData.data.items.map((item: any) => (
              <CurrTemplate
                key={item.item.id}
                listData={{
                  items: [
                    {
                      itemName: item.item.name,
                      itemId: item.item.id,
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

      {/* Modal Start */}
      <Modal
        isCentered
        isOpen={!!modalState}
        onClose={() => setModalState(undefined)}
        size={mainSize}
      >
        {/* <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" /> */}

        <ModalContent>
          <ModalHeader
            fontWeight={"bold"}
            fontFamily={"PlusJakartaSans"}
            fontSize={"1rem"}
            pt={"2rem"}
          >
            {modalState?.mode === "edit"
              ? "Edit Your List"
              : "Delete Your List"}
            {modalState?.mode === "edit" && (
              <Stack
                fontFamily={"PlusJakartaSans"}
                fontWeight={"medium"}
                fontSize={"0.8rem"}
                pt={"0.5rem"}
              >
                <Text>
                  Scan your item with the CLIP module and item will be shown.
                </Text>
              </Stack>
            )}
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            {modalState?.mode === "edit" && (
              <form
                id="edit-data"
                onSubmit={handleSubmit((data) => {
                  if (modalState.id) {
                    api
                      .put<ResponseModel>(`/list/update/${modalState.id}`, data)
                      .then((res) => {
                        toast({
                          title: "Item updated successfully",
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
                      });
                  }
                })}
              >
                <Stack spacing={"1rem"} fontFamily={"PlusJakartaSans"}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel fontWeight={"semibold"} fontSize={"0.8rem"}>
                      List Name
                    </FormLabel>
                    <Input
                      placeholder="Input your list name"
                      {...register("name")}
                      type="text"
                      fontWeight={"medium"}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.items}
                    fontFamily={"PlusJakartaSans"}
                  >
                    <FormLabel fontWeight={"semibold"} fontSize={"0.8rem"}>
                      Item List
                    </FormLabel>
                    <Stack
                      spacing={2}
                      bgColor={"#EEEEEE"}
                      borderRadius={"xl"}
                      p={"0.6rem"}
                    >
                      {listData && listData.data.items.length > 0 ? (
                        [...listData.data.items, ...scannedItems].map(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (item: any) => (
                            <CurrTemplate
                              key={item.id || item.item.id}
                              listData={{
                                items: [
                                  {
                                    itemName: item.name || item.item.name,
                                    itemId: item.id || item.item.id,
                                  },
                                ],
                              }}
                            />
                          )
                        )
                      ) : (
                        <Text>Loading items...</Text>
                      )}
                    </Stack>

                    {!!errors.items && (
                      <Text fontSize={"sm"} color={"red.500"} mt={2}>
                        {errors.items.message}
                      </Text>
                    )}
                  </FormControl>
                  ;
                </Stack>
              </form>
            )}
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            {modalState?.mode === "edit" && (
              <Stack
                flexDirection={"row"}
                fontFamily={"PlusJakartaSans"}
                w={"full"}
                alignItems={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
              >
                <Button
                  w={"full"}
                  h={"3rem"}
                  // bgColor={"black"}
                  // color={"#F0E13D"}
                  fontWeight={"medium"}
                  fontSize={"0.8rem"}
                  borderRadius={"10px"}
                  onClick={() => setDeteleConfirmModal(true)}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  form="edit-data"
                  w={"full"}
                  h={"3rem"}
                  bgColor={"black"}
                  color={"#F0E13D"}
                  fontWeight={"medium"}
                  fontSize={"0.8rem"}
                  borderRadius={"10px"}
                >
                  Update
                </Button>
              </Stack>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal End */}

      {/* Delete Confirm Modal Start */}
      <Modal
        isOpen={deleteConfirmModal}
        onClose={() => setDeteleConfirmModal(false)}
        isCentered
        size={deleteSize}
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <ModalContent fontFamily={"PlusJakartaSans"} borderRadius={"15px"}>
          <ModalHeader>Delete List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this list?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                if (!modalState?.id) {
                  console.log(modalState?.id);
                  toast({
                    title: "Error",
                    description: "Invalid List ID",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                  return;
                }
                api
                  .delete(`/list/delete/${modalState?.id}`)
                  .then((res) => {
                    toast({
                      title: "List deleted successfully",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      description: res.data.message,
                    });
                  })
                  .catch(errorHandler)
                  .finally(() => {
                    setDeteleConfirmModal(false);
                    mutate();
                    nav("/clip/list");
                  });
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailList;
