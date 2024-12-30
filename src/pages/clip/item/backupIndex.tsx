// import {
//   Stack,
//   Text,
//   Spacer,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
// // import { Items } from "@/dummy.tsx";
// import ItemTemplate2 from "@/components/itemTemplate2.tsx";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useNavigate } from "@/router";
// import useAuth from "@/hooks/useAuth";
// import useSWR from "swr";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import { GoPlus } from "react-icons/go";
// import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";

// type Item = {
//   id: string;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// const itemSchema = z.object({
//   id: z.string(),
//   name: z
//     .string({ required_error: "Item name is required" })
//     .min(3, { message: "Minimum 3 Words" })
//     .max(255),
// });

// type ItemDataFillable = z.infer<typeof itemSchema>;

// type ModalState = {
//   state?: Item;
//   mode: "create" | "edit" | "delete";
// };

// const Item = () => {
//   const auth = useAuth();
//   const nav = useNavigate();
//   const errorHandler = useToastErrorHandler();
//   const toast = useToast();
//   const api = useApi();
//   const size = ["sm"];

//   const { data: listItem } = useSWR("/list");

//   useEffect(() => {
//     if (auth.status === "loading") {
//       return;
//     }

//     if (auth.status === "unauthenticated") {
//       toast({
//         title: "Please login to continue",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//       nav("/auth/login");
//       return;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [auth]);

//   const {
//     handleSubmit,
//     register,
//     reset,
//     control,
//     formState: { errors },
//   } = useForm<ItemDataFillable>({
//     resolver: zodResolver(itemSchema),
//   });

//   const [modalState, setModalState] = useState<ModalState | undefined>();

//   useEffect(() => {
//     reset();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [modalState]);

//   // const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for modal
//   // const [isEmpty, setIsEmpty] = useState(false); // To track whether the item list is empty
//   // const [isEdit, setIsEdit] = useState(false); // To track whether we're editing or adding an item
//   // const [currentItem, setCurrentItem] = useState({ name: "", id: "" }); // To store the current item

//   // // Check if items are empty
//   // useEffect(() => {
//   //   const hasItems = Items.length > 0;
//   //   setIsEmpty(!hasItems);
//   // });

//   // // Handle Add button click
//   // const handleAddItem = () => {
//   //   setIsEdit(false); // Set to Add mode
//   //   setCurrentItem({ name: "", id: "#XXXXXX" }); // Reset current item
//   //   onOpen();
//   // };

//   // // Handle Edit button click
//   // const handleEditItem = (item: any) => {
//   //   setIsEdit(true); // Set to Edit mode
//   //   setCurrentItem(item); // Set current item
//   //   onOpen();
//   // };

//   return (
//     <Stack
//       minW={"320px"}
//       w={"full"}
//       maxW={"425px"}
//       minH={"100vh"}
//       lineHeight={"1.2rem"}
//       bgColor={"white"}
//       p={"1.25rem 1.25rem 8rem 1.25rem"}
//       // style={{ filter: isOpen ? "blur(3px)" : "none" }} // Blur the background when modal is open
//     >
//       {/* Header start */}
//       <Stack
//         color={"black"}
//         direction={"row"}
//         mt={"1rem"}
//         align={"center"}
//         mb={"1.2rem"}
//       >
//         <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
//           Your Items
//         </Text>
//         <Spacer />
//         <Button
//           bgColor={"#EEEEEE"}
//           borderRadius={"md"}
//           px={"0.7rem"}
//           h={"2rem"}
//           leftIcon={<GoPlus />}
//           // onClick={handleAddItem}
//         >
//           <Text fontWeight={"500"} color={"#4E4E4E"} fontSize={"0.75rem"}>
//             Add Item
//           </Text>
//         </Button>
//         {/* Header end */}
//         {/* Modal for adding/editing items */}
//         <Modal isOpen={isOpen} onClose={onClose}>
//           <ModalOverlay />
//           <ModalContent
//             w={"full"}
//             maxW={"320px"}
//             my={"auto"}
//             borderRadius={"2xl"}
//             bgColor={"#EEEEEE"}
//           >
//             <Stack>
//               <ModalHeader fontWeight={700}>
//                 {isEdit ? "Edit Item" : "Add Item"}{" "}
//                 {/* Change based on button clicked (add/edit) */}
//                 <Text
//                   w={"90%"}
//                   fontSize={"0.8rem"}
//                   fontWeight={500}
//                   color={"#00000050"}
//                   mt={"0.2rem"}
//                 >
//                   {/* Change based on button clicked (add/edit) */}
//                   {isEdit
//                     ? "Rename your item and make sure the label is attached to the correct item."
//                     : "Scan your item with the CLIP module and item ID will be shown."}
//                 </Text>
//               </ModalHeader>
//               <ModalCloseButton fontSize={"1rem"} mt={"0.5rem"} me={"0.3rem"} />
//             </Stack>
//             <ModalBody pb={6}>
//               <Text
//                 fontSize={"0.8rem"}
//                 fontWeight={500}
//                 color={"white"}
//                 bgColor={"#000000"}
//                 borderRadius={"lg"}
//                 textAlign={"center"}
//                 py={"0.6rem"}
//                 mb={6}
//               >
//                 {currentItem.id} {/* Show item ID */}
//               </Text>
//               <FormControl>
//                 <Stack direction={"row"} align={"center"}>
//                   <FormLabel fontSize={"0.9rem"} fontWeight={600}>
//                     Item name
//                   </FormLabel>
//                   <Spacer />
//                   <FormLabel
//                     fontSize={"0.8rem"}
//                     fontWeight={400}
//                     color={"#0B1215"}
//                     mx={0}
//                   >
//                     *Required
//                   </FormLabel>
//                 </Stack>
//                 <Input defaultValue={currentItem.name} required />
//               </FormControl>
//             </ModalBody>

//             <ModalFooter w={"full"} justifyContent={"space-between"}>
//               <Button
//                 onClick={onClose}
//                 fontSize={"0.8rem"}
//                 fontWeight={600}
//                 color={"black"}
//                 border={"1px solid"}
//                 borderRadius={"lg"}
//                 px={"3rem"}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 fontSize={"0.8rem"}
//                 fontWeight={600}
//                 bgColor={"black"}
//                 color={"#F0E13D"}
//                 borderRadius={"lg"}
//                 px={"3rem"}
//               >
//                 Save
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//         {/* end */}
//       </Stack>
//       {/* Cek item list ada isi atau tidak */}
//       {isEmpty ? (
//         <Stack borderRadius={"2xl"} p={"1rem"} h={"45rem"}>
//           <Stack
//             border={"1px"}
//             borderRadius={"lg"}
//             borderStyle={"dashed"}
//             my={"0.125rem"}
//             p={"1rem"}
//             textAlign={"center"}
//           >
//             <Text fontSize={"0.9rem"} fontWeight={600}>
//               Add your item to create a list
//             </Text>
//           </Stack>
//         </Stack>
//       ) : (
//         Items.map((item, index) => (
//           <ItemTemplate2
//             key={index}
//             name={item.name}
//             id={item.id}
//             onEdit={() => handleEditItem(item)}
//           />
//         ))
//       )}
//       {/* end */}
//     </Stack>
//   );
// };

// export default Item;
