import { Stack, Text, Spacer, Box } from "@chakra-ui/react";
import { FaChevronCircleLeft } from "react-icons/fa";
import Lists from "../../dummy.tsx";
import CurrTemplate from "../../components/currListTemplate.tsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CurrentList = () => {
  let i = 0;
  return (
    <Stack
      minW={"320px"}
      w={"full"}
      maxW={"425px"}
      lineHeight={"1.2rem"}
      bgColor={"white"}
      p={"1.25rem"}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <Stack
          color={"black"}
          direction={"row"}
          mt={"1rem"}
          align={"center"}
          mb={"0.8rem"}
        >
          <Box as={Link} to="/">
            <FaChevronCircleLeft fontSize={"1.9rem"} />
          </Box>
          <Text fontSize={"1.2rem"} fontWeight={"700"} ml={"0.5rem"}>
            Current List
          </Text>
          <Spacer />
          <Text
            fontWeight={"500"}
            color={"#777777"}
            fontSize={"0.75rem"}
            border={"1px"}
            borderRadius={"xl"}
            py={"0.1rem"}
            px={"0.5rem"}
          >
            Tas Hari Senin
          </Text>
        </Stack>
        <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} p={"1rem"}>
          {Lists[i].items.map((item, index) => (
            <CurrTemplate key={index} {...item} />
          ))}
        </Stack>
      </motion.div>
    </Stack>
  );
};

export default CurrentList;
