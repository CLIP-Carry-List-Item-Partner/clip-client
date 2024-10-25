// import {
//   Stack,
//   Text,
//   Spacer,
//   Box,
//   Button,
//   Input,
//   useToast,
// } from "@chakra-ui/react";
// import { FaChevronCircleLeft } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import useSWR from "swr";
// import useAuth from "@/hooks/useAuth";
// import { useNavigate } from "@/router";
// import ItemTemplate1 from "@/components/itemTemplate1.tsx";

// const EditList = () => {
//   const { id } = useParams(); // Get list ID from URL
//   const auth = useAuth();
//   const nav = useNavigate();
//   const toast = useToast();

//   // Fetch the specific list using the ID from the URL
//   const { data: listData } = useSWR(`/list/${id}`);
//   // console.log(listData);

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

//   if (!listData) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <Stack
//       minW={"320px"}
//       w={"full"}
//       maxW={"425px"}
//       minH={"100vh"}
//       lineHeight={"1.2rem"}
//       bgColor={"white"}
//       p={"1.25rem"}
//     >
//       {/* <-- Header Start --> */}
//       <Stack
//         color={"black"}
//         direction={"row"}
//         mt={"1rem"}
//         align={"center"}
//         mb={"0.8rem"}
//       >
//         <Box as={Link} to="/clip/list">
//           <FaChevronCircleLeft fontSize={"1.2rem"} />
//         </Box>
//         <Text fontSize={"1.1rem"} fontWeight={"700"} ml={"0.5rem"}>
//           Edit List
//         </Text>
//         <Spacer />
//         <Stack>
//           <Text
//             bgColor={"white"}
//             border={"1px"}
//             borderRadius={"xl"}
//             px={"0.7rem"}
//             py={"0.2rem"}
//             fontWeight={"500"}
//             color={"#777777"}
//             fontSize={"0.75rem"}
//           >
//             {listData && listData.data ? (
//               new Date().toLocaleDateString() +
//               " " +
//               new Date().toLocaleTimeString()
//             ) : (
//               // listData.data.items.length
//               <Text>Loading...</Text>
//             )}
//           </Text>
//         </Stack>
//       </Stack>
//       {/* <-- Header End --> */}
//       {/* <-- List name Start --> */}
//       <Stack mt={"0.5rem"}>
//         <Text fontSize={"0.9rem"} fontWeight={"600"} color={"#000000"}>
//           List Name
//         </Text>
//         <Input defaultValue={listData.data.name} placeholder="List Name" />
//       </Stack>
//       {/* <-- List name End --> */}
//       {/* <-- List Items Start --> */}
//       <Stack mt={"0.5rem"}>
//         <Text fontSize={"0.9rem"} fontWeight={"600"} color={"#000000"}>
//           Items
//         </Text>
//         <Stack
//           bgColor={"#eeeeee"}
//           borderRadius={"2xl"}
//           p={"1rem"}
//           h={"34rem"}
//           overflowY={"auto"}
//         >
//           {listData &&
//           Array.isArray(listData.data) &&
//           listData.data.length > 0 ? (
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             listData.data.items.map((item: any) => (
//               <ItemTemplate1
//                 key={item.id}
//                 listData={{
//                   items: item.itemName,
//                 }}
//               />
//             ))
//           ) : (
//             <Text>No items in this list</Text>
//           )}
//         </Stack>
//       </Stack>
//       {/* <-- List Items End --> */}
//       {/* <-- Button Start --> */}
//       <Stack
//         mt={"auto"}
//         mb={"15px"}
//         direction={"row"}
//         justify={"center"}
//         w={"full"}
//       >
//         <Button
//           as={Link}
//           to="/currentList"
//           bgColor={"white"}
//           borderRadius={"lg"}
//           border={"1px"}
//           py={"0.2rem"}
//           px={"4rem"}
//           cursor={"pointer"}
//           _hover={{ bgColor: "whiteAlpha.900" }}
//         >
//           <Text fontSize={"0.8rem"} fontWeight={600} color={"#000000"}>
//             Cancel
//           </Text>
//         </Button>
//         <Button
//           bgColor={"black"}
//           borderRadius={"lg"}
//           py={"0.2rem"}
//           px={"4rem"}
//           cursor={"pointer"}
//           _hover={{ bgColor: "blackAlpha.800" }}
//         >
//           <Text fontSize={"0.8rem"} fontWeight={600} color={"#F0E13D"}>
//             Save
//           </Text>
//         </Button>
//       </Stack>
//       {/* <-- Button End --> */}
//     </Stack>
//   );
// };

// export default EditList;
