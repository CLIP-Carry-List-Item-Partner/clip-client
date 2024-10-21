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
import ItemTemplate2 from "@/components/itemTemplate2.tsx";
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
import { BLECLIP } from "@/utils/useBLE";

type Item = {
  id: string;
  name: string;
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
  mode: "create" | "edit" | "delete";
};

const Item = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const errorHandler = useToastErrorHandler();
  const toast = useToast();
  const api = useApi();
  const size = ["sm"];
  const [scannedItems, setScannedItems] = useState<string | null>(null);

  const { data: itemData } = useSWR("/item");

  useEffect(() => {
    const bleClip = new BLECLIP();
    bleClip.setAddItemCallback((newTagID) => {
      setScannedItems(newTagID);
    });

    bleClip.connectToBLE();
  }, []);

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
  } = useForm<ItemDataFillable>({
    resolver: zodResolver(itemSchema),
  });

  const [modalState, setModalState] = useState<ModalState | undefined>();

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
        // style={{ filter: isOpen ? "blur(3px)" : "none" }} // Blur the background when modal is open
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
            // onClick={handleAddItem}
          >
            <Text fontWeight={"500"} color={"#4E4E4E"} fontSize={"0.75rem"}>
              Add Item
            </Text>
          </Button>
          {/* Header end */}
          {/* Modal for adding/editing items */}

          {/* end */}
        </Stack>

        {itemData && itemData.data ? (
          itemData.data.map((item: any) => (
            // nanti yang di [id] dibenerin
            // <Link to={`/clip/list/${list.id}`}>
            <ItemTemplate2
              key={item.id} // Ensure unique key for each list
              itemData={{
                id: item.id,
                name: item.name,
              }}
            />
            // </Link>
          ))
        ) : (
          <Stack>
            <Text>Your list will be shown here</Text>
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
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader
            fontWeight={"bold"}
            fontFamily={"PlusJakartaSans"}
            fontSize={"1rem"}
          >
            {modalState?.mode === "create" && "Create A New Item"}
            {modalState?.mode === "edit" && "Edit Item"}
            {modalState?.mode === "delete" && "Delete Item"}
            <Stack mt={"0.5rem"}>
              <Text fontWeight={"normal"} fontSize={"0.8rem"}>
                Scan your item with the CLIP module and item ID will be shown.
              </Text>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
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
                      setModalState(undefined);
                      setScannedItems(null);
                      itemData.mutate();
                    })
                    .catch(errorHandler);
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
                      value={scannedItems || ""}
                      // value={rfidScanData} // Assuming 'rfidScanData' is the state storing the scanned RFID value
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

export default Item;
