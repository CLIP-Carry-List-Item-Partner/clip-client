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
} from "@chakra-ui/react";
import Lists from "../../dummy.tsx";
import SavedTemplate from "../../components/saveListTemplate.tsx";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";

const List = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for modal

  return (
    <Stack
      minW={"320px"}
      w={"full"}
      maxW={"425px"}
      minH={"100vh"}
      lineHeight={"1.2rem"}
      bgColor={"white"}
      p={"1.25rem 1.25rem 8rem 1.25rem"}
      style={{ filter: isOpen ? "blur(3px)" : "none" }}
    >
      {/* <-- Header Start --> */}
      <Stack
        color={"black"}
        direction={"row"}
        mt={"1rem"}
        align={"center"}
        mb={"1.2rem"}
      >
        <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
          Your List
        </Text>
        <Spacer />
        <Button
          bgColor={"#EEEEEE"}
          borderRadius={"md"}
          px={"0.7rem"}
          h={"2rem"}
          leftIcon={<GoPlus />}
          onClick={onOpen}
        >
          <Text fontWeight={"500"} color={"#4E4E4E"} fontSize={"0.75rem"}>
            New List
          </Text>
        </Button>
        {/* Header end */}
        {/* Modal for create new list */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            w={"full"}
            maxW={"320px"}
            my={"auto"}
            borderRadius={"2xl"}
            bgColor={"#EEEEEE"}
          >
            <Stack>
              <ModalHeader fontWeight={700}>Create a New List</ModalHeader>
              <ModalCloseButton fontSize={"1rem"} mt={"0.5rem"} me={"0.3rem"} />
            </Stack>
            <ModalBody pb={6}>
              <FormControl>
                <Stack direction={"row"} align={"center"}>
                  <FormLabel fontSize={"0.9rem"} fontWeight={600}>
                    List name
                  </FormLabel>
                  <Spacer />
                  <FormLabel
                    fontSize={"0.8rem"}
                    fontWeight={400}
                    color={"#0B1215"}
                    mx={0}
                  >
                    *Required
                  </FormLabel>
                </Stack>
                <Input required />
              </FormControl>
            </ModalBody>

            <ModalFooter w={"full"} justifyContent={"space-between"}>
              <Button
                onClick={onClose}
                fontSize={"0.8rem"}
                fontWeight={600}
                color={"black"}
                border={"1px solid"}
                borderRadius={"lg"}
                px={"3rem"}
              >
                Cancel
              </Button>
              <Button
                fontSize={"0.8rem"}
                fontWeight={600}
                bgColor={"black"}
                color={"#F0E13D"}
                borderRadius={"lg"}
                px={"3rem"}
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* Modal end */}
      </Stack>
      {/* <-- List Start --> */}
      {Lists.map((list, index) => (
        <SavedTemplate key={index} {...list} />
      ))}
      {/* <-- List End --> */}
    </Stack>
  );
};

export default List;
