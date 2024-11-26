import {
  Stack,
  Text,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
// import { Items } from "@/dummy.tsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "@/router";
import useAuth from "@/hooks/useAuth";
import useSWR from "swr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { GoPlus } from "react-icons/go";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
// import { BLECLIP } from "@/utils/useBLE";
import { useBluetooth } from "@/providers/BluetoothProvider";
import ItemList from "@/components/ItemList";

type Item = {
  id: string;
  name: string;
  lists: string[];
  createdAt: Date;
  updatedAt: Date;
};

const itemSchema = z.object({
  id: z.string({ required_error: "Item ID is required" }),
  name: z
    .string({ required_error: "Item name is required" })
    .min(3, { message: "Minimum 3 Words" })
    .max(255),
});

type ItemDataFillable = z.infer<typeof itemSchema>;

type ModalState = {
  state?: Item;
  id?: string;
  mode: "create" | "edit" | "delete";
};

const Item = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const { bleClip, isConnected } = useBluetooth();
  const errorHandler = useToastErrorHandler();
  const toast = useToast();
  const api = useApi();
  const size = ["sm"];
  const [scannedItems, setScannedItems] = useState<string | null>(null);

  const { data: itemData, mutate } = useSWR("/item");

  // BLECLIP Check
  useEffect(() => {
    if (isConnected && bleClip) {
      bleClip.setAddItemCallback((newTagID) => {
        setScannedItems(newTagID);
      });
    }
  }, [isConnected, bleClip]);

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
    control,
    formState: { errors },
    setValue,
  } = useForm<ItemDataFillable>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: scannedItems!,
      name: "",
    },
  });

  useEffect(() => {
    if (scannedItems) {
      setValue("id", scannedItems);
    }
  }, [scannedItems, setValue]);

  const [modalState, setModalState] = useState<ModalState | undefined>();

  useEffect(() => {
    if (modalState && modalState.mode === "edit") {
      reset({
        id: modalState.state?.id,
        name: modalState.state?.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  return (
    <>
      <Stack
        minW={"320px"}
        w={"full"}
        maxW={"425px"}
        minH={"100vh"}
        lineHeight={"1.2rem"}
        bgColor={"white"}
        p={"1.25rem 1.25rem 8rem 1.25rem"}
      >
        {/* Header start */}
        <Stack
          color={"black"}
          direction={"row"}
          mt={"1rem"}
          align={"center"}
          mb={"1.2rem"}
        >
          <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
            Your Items
          </Text>
          <Spacer />
          <Button
            bgColor={"#EEEEEE"}
            borderRadius={"md"}
            px={"0.7rem"}
            h={"2rem"}
            leftIcon={<GoPlus />}
            onClick={() => setModalState({ mode: "create" })}
          >
            <Text fontWeight={"500"} color={"#4E4E4E"} fontSize={"0.75rem"}>
              Add Item
            </Text>
          </Button>
          {/* Header end */}
          {/* Modal for adding/editing items */}

          {/* end */}
        </Stack>

        {itemData &&
        Array.isArray(itemData.data) &&
        itemData.data.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          itemData.data.map((item: any) => (
            <ItemList
              key={item.id} // Ensure unique key for each list
              itemData={{
                id: item.id,
                name: item.name,
                // lists: item.lists,
                updatedAt: item.updatedAt,
              }}
              onClick={() => {
                const data = itemData.data.find((i: Item) => i.id === item.id);
                if (data) {
                  setModalState({ mode: "delete", id: data.id });
                }
              }}
              onClickEdit={() => {
                const data = itemData.data.find((i: Item) => i.id === item.id);
                if (data) {
                  setModalState({ mode: "edit", id: data.id, state: data });
                }
              }}
            />
          ))
        ) : (
          <Stack
            w={"full"}
            border={"1px"}
            h={"full"}
            p={"1rem"}
            borderRadius={"lg"}
            borderStyle={"dashed"}
            alignItems={"center"}
            fontWeight={"regular"}
          >
            <Text>Add your item to create a list</Text>
          </Stack>
        )}
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
            {modalState?.mode === "create" && "Create A New Item"}
            {modalState?.mode === "edit" && "Edit Item"}
            {modalState?.mode === "delete" && "Delete Item"}
            <Stack mt={"0.5rem"}>
              {modalState?.mode === "create" && (
                <Text fontWeight={"normal"} fontSize={"0.8rem"}>
                  Scan your item with the CLIP module and item ID will be shown.
                </Text>
              )}
              {modalState?.mode === "delete" && (
                <Text fontWeight={"normal"} fontSize={"0.8rem"}>
                  Are you sure you want to delete this item?
                </Text>
              )}
            </Stack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {modalState?.mode === "edit" && (
              <form
                id="edit-data"
                onSubmit={handleSubmit((data) => {
                  if (modalState.id) {
                    api
                      .put<ResponseModel>(`/item/update/${modalState.id}`, data)
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
                <Stack spacing={"1rem"}>
                  <FormControl isInvalid={!!errors.id}>
                    <Input
                      textAlign={"center"}
                      placeholder="Your item ID will be shown here"
                      bgColor={"black"}
                      color={"white"}
                      {...register("id")}
                      readOnly
                    />
                    <FormErrorMessage>
                      {errors.id && errors.id.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel
                      fontFamily={"PlusJakartaSans"}
                      fontWeight={"semibold"}
                      fontSize={"0.8rem"}
                    >
                      Item Name
                    </FormLabel>
                    <Input
                      placeholder="Input your item name"
                      {...register("name")}
                      type="text"
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  {modalState?.mode === "edit" && modalState.state ? (
                    <Stack>
                      <Text>
                        Last Update: {""}
                        {new Date(modalState.state.updatedAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </Text>
                    </Stack>
                  ) : (
                    <Stack>
                      <Text>No item selected</Text>
                    </Stack>
                  )}
                </Stack>
              </form>
            )}

            {modalState?.mode === "create" && (
              <form
                id="add-data"
                onSubmit={handleSubmit((data) => {
                  api
                    .post<ResponseModel>("/item/create", data)
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
                      setScannedItems(null);
                    });
                })}
              >
                <Stack spacing={"1rem"}>
                  <FormControl isInvalid={!!errors.id}>
                    {!isConnected && (
                      <Stack
                        alignItems={"center"}
                        color={"red.800"}
                        mb={"0.6rem"}
                      >
                        <Text>Please connect to CLIP to scan your item</Text>
                      </Stack>
                    )}
                    <Input
                      textAlign={"center"}
                      placeholder="Your item ID will be shown here"
                      bgColor={"black"}
                      color={"white"}
                      {...register("id")}
                      // value={scannedItems!}
                      readOnly
                    />

                    <FormErrorMessage>
                      {errors.id && errors.id.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel
                      fontFamily={"PlusJakartaSans"}
                      fontWeight={"semibold"}
                      fontSize={"0.8rem"}
                    >
                      Item Name
                    </FormLabel>

                    <Input
                      placeholder="Input your item name"
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
            {modalState?.mode === "edit" && (
              <Button
                type="submit"
                form="edit-data"
                bgColor={"black"}
                color={"#F0E13D"}
                fontFamily={"PlusJakartaSans"}
                fontWeight={"normal"}
                fontSize={"0.8rem"}
                borderRadius={"10px"}
              >
                Save
              </Button>
            )}

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

            {modalState?.mode === "delete" && (
              <Button
                bgColor={"black"}
                color={"#F0E13D"}
                fontFamily={"PlusJakartaSans"}
                fontWeight={"normal"}
                fontSize={"0.8rem"}
                borderRadius={"10px"}
                onClick={() => {
                  if (modalState.id) {
                    api
                      .delete<ResponseModel>(`/item/delete/${modalState.id}`)
                      .then((res) => {
                        toast({
                          title: "Item deleted successfully",
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
                }}
              >
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal End */}
    </>
  );
};

export default Item;
