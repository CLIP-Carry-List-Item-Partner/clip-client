import { Stack, Text, Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BeforeLoginItem from "@/components/BeforeLoginItem";
import { useBluetooth } from "@/providers/BluetoothProvider";

type ScannedItems = {
  id: string;
  name: string;
};

const BeforeLoginList = () => {
  const { bleClip, isConnected } = useBluetooth();
  const [scannedItems, setScannedItems] = useState<ScannedItems[]>([]);
  const [deletedItems, setDeletedItems] = useState<string[]>([]);
  const toast = useToast();

  let lastItemNumber = parseInt(
    localStorage.getItem("lastItemNumber") || "1",
    10
  );

  useEffect(() => {
    if (isConnected && bleClip) {
      bleClip.setAddItemCallback((newTagID) => {
        setScannedItems((prevItems) => {
          const isExisting = prevItems.some((item) => item.id === newTagID);

          if (!isExisting) {
            // Jika daftar kosong, reset lastItemNumber kembali ke 1
            if (prevItems.length === 0) {
              lastItemNumber = 1;
              localStorage.setItem("lastItemNumber", lastItemNumber.toString());
            }

            const newItem = {
              id: newTagID,
              name: `Item ${lastItemNumber}`,
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
            lastItemNumber += 1;
            localStorage.setItem("lastItemNumber", lastItemNumber.toString());
            return [...prevItems, newItem];
          } else {
            // console.log(`TagID ${newTagID} already exists.`);
            toast({
              title: "Tag already exists",
              description: `TagID ${newTagID} already exists.`,
              status: "warning",
              duration: 2000,
              isClosable: true,
            });
            return prevItems;
          }
        });
      });
    }
  }, [isConnected, bleClip]);

  const handleDelete = (id: string) => {
    const updatedItems = scannedItems.filter((item) => item.id !== id);
    setScannedItems(updatedItems);
    setDeletedItems([...deletedItems, id]);
    localStorage.setItem("scannedItems", JSON.stringify(updatedItems));

    if (updatedItems.length === 0) {
      localStorage.setItem("lastItemNumber", "1");
    }
  };

  return (
    <Stack
      w={"full"}
      align={"center"}
      justify={"center"}
      fontFamily={"PlusJakartaSans"}
      bgColor={"black"}
    >
      <Stack
        minW={"320px"}
        w={"full"}
        maxW={"425px"}
        minH={"100vh"}
        p={"1.25rem"}
        bgColor={"white"}
      >
        <Text
          fontSize={"1.2rem"}
          fontWeight={"700"}
          ml={"0.5rem"}
          mb={"0.5rem"}
        >
          New List
        </Text>
        {/* List Items Start */}
        <Stack
          bgColor={"#eeeeee"}
          borderRadius={"2xl"}
          p={"1rem"}
          h={"30rem"}
          overflowY={"auto"}
        >
          {scannedItems.length === 0 ? (
            <Stack
              bgColor={"white"}
              border={"1px"}
              borderRadius={"xl"}
              borderStyle={"dashed"}
              my={"0.125rem"}
              p={"0.75rem"}
            >
              <Stack
                bgColor={"black"}
                color={"white"}
                px={"0.5rem"}
                py={"0.2rem"}
                borderRadius={"md"}
                w={"fit-content"}
              >
                <Text
                  fontSize={"0.5rem"}
                  fontWeight={400}
                  letterSpacing={"0.05rem"}
                  color={"#F0E13D"}
                >
                  #XXXXXXXXX
                </Text>
              </Stack>
              <Text fontSize={"0.9rem"} fontWeight={500}>
                Your item will be listed here
              </Text>
            </Stack>
          ) : (
            scannedItems.map((item) => (
              <BeforeLoginItem
                key={item.id}
                name={item.name}
                id={item.id}
                onDelete={handleDelete}
              />
            ))
          )}
        </Stack>
        {/* List Items End */}
        <Link to="/auth/login">
          <Button
            my={"1rem"}
            w={"full"}
            bgColor={"black"}
            color={"white"}
            borderRadius={"lg"}
            _hover={{ bgColor: "gray.800" }}
          >
            <Text
              fontFamily={"PlusJakartaSans"}
              fontWeight={"medium"}
              fontSize={"0.8rem"}
            >
              Back
            </Text>
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default BeforeLoginList;
