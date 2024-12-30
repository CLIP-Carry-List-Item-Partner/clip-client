// BACKUP DARI BEFORE LOGIN LIST
// import { Stack, Text, Button } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import ItemTemplate1 from "@/components/itemTemplate1.tsx";
// import { BLECLIP } from "@/utils/useBLE";

// type ScannedItems = {
//   id: string;
//   name: string;
// };

// const BeforeLoginList = () => {
//   const [isZonk, setIsZonk] = useState(false);
//   const [scannedItems, setScannedItems] = useState<ScannedItems[]>([]);
//   const [deletedItems, setDeletedItems] = useState<string[]>([]);

//   useEffect(() => {
//     const bleClip = new BLECLIP();

//     bleClip.setAddItemCallback((newTagID) => {
//       const newItem = { id: newTagID, name: `Tag ${scannedItems.length + 1}` };
//       setScannedItems([...scannedItems, newItem]);
//     });

//     // bleClip.connectToBLE();
//   }, [scannedItems]);

//   // const handleDelete = (id: string) => {
//   //   const updatedItems = scannedItems.filter((item) => item !== id);
//   //   setScannedItems(updatedItems);
//   //   setDeletedItems([...deletedItems, id]);
//   //   localStorage.setItem("scannedItems", JSON.stringify(updatedItems));
//   // };

//   // // Create an instance of BLECLIP
//   // const bleClip = new BLECLIP();

//   // // Load items from localStorage
//   // const loadItemsFromStorage = () => {
//   //   const items = JSON.parse(localStorage.getItem("scannedItems") || "[]");
//   //   setScannedItems(items);
//   //   setIsZonk(items.length === 0);
//   // };

//   // useEffect(() => {
//   //   loadItemsFromStorage();

//   //   // Set the add item callback
//   //   bleClip.setAddItemCallback(addItem);

//   //   // Load items every 1 seconds
//   //   const intervalId = setInterval(() => {
//   //     loadItemsFromStorage();
//   //   }, 2000);

//   //   const handleStorageChange = () => {
//   //     loadItemsFromStorage(); // Reload items from localStorage
//   //   };

//   //   window.addEventListener("storage", handleStorageChange);

//   //   // Clean up the interval and event listener on component unmount
//   //   return () => {
//   //     clearInterval(intervalId);
//   //     window.removeEventListener("storage", handleStorageChange);
//   //   };
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   // // Function to add a new item
//   // const addItem = (newTagID: string) => {
//   //   if (!scannedItems.includes(newTagID)) {
//   //     const updatedItems = [...scannedItems, newTagID]; // Add new item to array
//   //     setScannedItems(updatedItems); // Update state
//   //     localStorage.setItem("scannedItems", JSON.stringify(updatedItems)); // Save to localStorage
//   //   }
//   // };

//   return (
//     <Stack
//       w={"full"}
//       align={"center"}
//       justify={"center"}
//       fontFamily={"PlusJakartaSans"}
//       bgColor={"black"}
//     >
//       <Stack
//         minW={"320px"}
//         w={"full"}
//         maxW={"425px"}
//         minH={"100vh"}
//         p={"1.25rem"}
//         bgColor={"white"}
//       >
//         <Text
//           fontSize={"1.2rem"}
//           fontWeight={"700"}
//           ml={"0.5rem"}
//           mb={"0.5rem"}
//         >
//           New List
//         </Text>
//         {/* List Items Start */}
//         <Stack
//           bgColor={"#eeeeee"}
//           borderRadius={"2xl"}
//           p={"1rem"}
//           h={"30rem"}
//           overflowY={"auto"}
//         >
//           {scannedItems.length === 0 ? (
//             <Stack
//               bgColor={"white"}
//               border={"1px"}
//               borderRadius={"xl"}
//               borderStyle={"dashed"}
//               my={"0.125rem"}
//               p={"0.75rem"}
//             >
//               <Stack
//                 bgColor={"black"}
//                 color={"white"}
//                 px={"0.5rem"}
//                 py={"0.2rem"}
//                 borderRadius={"md"}
//                 w={"fit-content"}
//               >
//                 <Text
//                   fontSize={"0.5rem"}
//                   fontWeight={400}
//                   letterSpacing={"0.05rem"}
//                   color={"#F0E13D"}
//                 >
//                   #XXXXXXXXX
//                 </Text>
//               </Stack>
//               <Text fontSize={"0.9rem"} fontWeight={500}>
//                 Your item will be listed here
//               </Text>
//             </Stack>
//           ) : (
//             scannedItems.map((item, index) => (
//               <ItemTemplate1
//                 key={index}
//                 name={`Tag ${index + 1}`}
//                 id={item.id}
//                 // onDelete={handleDelete}
//               />
//             ))
//           )}
//         </Stack>
//         {/* List Items End */}
//         <Link to="/auth/login">
//           <Button
//             mt={"0.5rem"}
//             w={"full"}
//             bgColor={"black"}
//             color={"white"}
//             _hover={{ bgColor: "gray.800" }}
//           >
//             Back
//           </Button>
//         </Link>
//       </Stack>
//     </Stack>
//   );
// };

// export default BeforeLoginList;
