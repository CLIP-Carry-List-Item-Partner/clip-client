import { Stack, Text, Image, Spacer, Button } from "@chakra-ui/react";
import dyhb from "../../assets/dyhb.png";
import pb from "../../assets/Powerbank.svg";
import { FaCircle } from "react-icons/fa";
import CurrTemplate from "../../components/currListTemplate.tsx";
import YourTemplate from "../../components/yourListTemplate.tsx";
import { useState } from "react";
import Lists from "../../dummy.tsx";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const handleStatusClick = () => {
    setIsActive(!isActive);
  };

  let i = 0;

  return (
    <>
      <Stack
        minW={"320px"}
        w={"full"}
        maxW={"425px"}
        lineHeight={"1.2rem"}
        bgColor={"white"}
        p={"1.25rem"}
      >
        {/* <-- Nama, Email, Profile Start --> */}
        <Stack direction={"row"} align={"center"}>
          <Stack color={"black"} gap={0}>
            <Text fontWeight={"700"} fontSize={"1.2rem"}>
              Paelism Bennington
            </Text>
            <Text fontWeight={"400"} color={"#777777"} fontSize={"0.75rem"}>
              rafael.herdani@gmail.com
            </Text>
          </Stack>
          <Spacer />
          <Image
            src={dyhb}
            alt="dyhb"
            borderRadius={"full"}
            boxSize={"2.75rem"}
            objectFit={"cover"}
            cursor={"pointer"}
          />
        </Stack>
        {/* <-- Tagline, Nama, Profile End --> */}
        {/* <-- Device Status Start --> */}
        <Stack
          h={"6rem"}
          bgColor={"#9d9d9d"}
          borderRadius={"lg"}
          direction={"row"}
          align={"center"}
          mt={"0.8rem"}
          bgGradient={
            "linear(to-r, blackAlpha.700, blackAlpha.800, blackAlpha.900)"
          }
        >
          <Stack ml={"1.2rem"}>
            <Text
              color={"white"}
              fontSize={"1.25rem"}
              fontWeight={"600"}
              mb={"0.2rem"}
            >
              Device Status
            </Text>
            {isActive ? (
              <Stack direction={"row"} justify={"center"} align={"center"}>
                <Button
                  h={"2rem"}
                  w={"full"}
                  onClick={handleStatusClick}
                  cursor={"pointer"}
                  bgColor={"#f0e13d"}
                  _hover={{ bgColor: "#a29609" }}
                  fontWeight={"400"}
                  fontSize={"0.75rem"}
                >
                  Active
                  <Stack mt={"0.15rem"} ml={"0.5rem"}>
                    <FaCircle color={"#a29609"} fontSize={"0.5rem"} />
                  </Stack>
                </Button>
              </Stack>
            ) : (
              <Stack
                direction={"row"}
                h={"2rem"}
                align={"center"}
                fontWeight={"400"}
                fontSize={"0.75rem"}
              >
                <Text
                  bgColor={"#9d9d9d"}
                  color={"#000000B2"}
                  borderRadius={"lg"}
                  py={"0.3rem"}
                  px={"0.7rem"}
                >
                  Inactive
                </Text>
                <Button
                  bgColor={"#f0e13d"}
                  onClick={handleStatusClick}
                  cursor={"pointer"}
                  size={"sm"}
                  h={"1.7rem"}
                  borderRadius={"lg"}
                  _hover={{ bgColor: "#a29609" }}
                >
                  Pair
                </Button>
              </Stack>
            )}
          </Stack>
          <Spacer />
          <Image src={pb} alt="pb" maxH={"100%"} />
        </Stack>
        {/* <-- Device Status End --> */}
        {/* <-- Current List Start --> */}
        <Stack color={"black"} mt={"0.75rem"}>
          <Stack
            direction={"row"}
            align={"center"}
            justify={"space-between"}
            mb={"0.5rem"}
          >
            <Text fontSize={"1.2rem"} fontWeight={"700"}>
              Current List
            </Text>
            <Text
              fontWeight={"500"}
              color={"#777777"}
              fontSize={"0.75rem"}
              border={"1px"}
              borderRadius={"xl"}
              py={"0.1rem"}
              px={"0.5rem"}
            >
              {Lists[i].listname}
            </Text>
          </Stack>
          <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} p={"1rem"}>
            {Lists[i].items.slice(0, 3).map((item, index) => (
              <CurrTemplate key={index} {...item} />
            ))}
            <Button
              variant={"link"}
              color={"#000000B2"}
              fontSize={"0.75rem"}
              textAlign={"center"}
              mt={"0.25rem"}
            >
              View All Items
            </Button>
          </Stack>
        </Stack>
        {/* <-- Current List End --> */}
        {/* <-- Saved List start --> */}
        <Stack color={"black"} mt={"0.75rem"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={"0.5rem"}
          >
            <Text fontWeight={"700"} fontSize={"1.2rem"}>
              Your List
            </Text>
            <Button
              variant={"link"}
              color={"#0B1215"}
              fontSize={"0.75rem"}
              fontWeight={"500"}
              textAlign={"center"}
            >
              View All
            </Button>
          </Stack>
        </Stack>
        {Lists.map((list, index) => (
          <YourTemplate key={index} {...list} />
        ))}
        {/* <-- Saved List end -->     */}
      </Stack>
    </>
  );
};

export default Home;
