import { Stack, Text, Image, Spacer, Button } from "@chakra-ui/react";
import dyhb from "../../assets/dyhb.png";
import pb from "../../assets/Powerbank.svg";
import CurrTemplate from "../../components/currListTemplate.tsx";
import YourTemplate from "../../components/saveListTemplate.tsx";
import { useState } from "react";
import Lists from "../../dummy.tsx";
import { Link } from "react-router-dom";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const handleStatusClick = () => {
    setIsActive(!isActive);
  };

  let i = 0;

  return (
    <>
      <Stack
        w={"full"}
        maxW={"425px"}
        minH={"100vh"}
        lineHeight={"1.2rem"}
        bgColor={"white"}
        p={"1.25rem 1.25rem 8rem 1.25rem"}
      >
        {/* <-- Nama, Email, Profile Start --> */}
        <Stack direction={"row"} align={"center"}>
          <Stack color={"black"} gap={0}>
            <Text fontWeight={700} fontSize={"1.2rem"}>
              Paelism Bennington
            </Text>
            <Text fontWeight={400} color={"#777777"} fontSize={"0.75rem"}>
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
              fontWeight={600}
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
                  fontWeight={600}
                  fontSize={"0.7rem"}
                >
                  Active
                </Button>
              </Stack>
            ) : (
              <Stack
                direction={"row"}
                h={"2rem"}
                align={"center"}
                justify={"center"}
              >
                <Text
                  bgColor={"#9d9d9d"}
                  color={"#000000B2"}
                  borderRadius={"lg"}
                  px={"0.7rem"}
                  py={"0.4rem"}
                  fontWeight={500}
                  fontSize={"0.75rem"}
                >
                  Inactive
                </Text>
                <Button
                  bgColor={"#f0e13d"}
                  onClick={handleStatusClick}
                  cursor={"pointer"}
                  size={"sm"}
                  h={"2rem"}
                  borderRadius={"lg"}
                  _hover={{ bgColor: "#a29609" }}
                >
                  <Text color={"black"} fontWeight={500} fontSize={"0.75rem"}>
                    Pair
                  </Text>
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
            <Text fontSize={"1.2rem"} fontWeight={700}>
              Current List
            </Text>
            <Stack
              border={"1px"}
              borderRadius={"xl"}
              py={"0.1rem"}
              px={"0.5rem"}
              borderColor={"#777777"}
            >
              <Text fontWeight={500} color={"#777777"} fontSize={"0.75rem"}>
                {Lists[i].listname}
              </Text>
            </Stack>
          </Stack>
          <Stack bgColor={"#eeeeee"} borderRadius={"2xl"} p={"1rem"}>
            {Lists[i].items.slice(0, 3).map((item, index) => (
              <CurrTemplate key={index} {...item} />
            ))}
            <Button
              as={Link}
              to="/currentList"
              color={"#000000B2"}
              fontSize={"0.75rem"}
              textAlign={"center"}
              mt={"0.25rem"}
              fontWeight={400}
              variant={"link"}
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
            <Text fontWeight={700} fontSize={"1.2rem"}>
              Your List
            </Text>
            <Button
              variant={"link"}
              color={"#0B1215"}
              fontSize={"0.75rem"}
              fontWeight={500}
              textAlign={"center"}
            >
              View All
            </Button>
          </Stack>
          {Lists.map((list, index) => (
            <YourTemplate key={index} {...list} />
          ))}
        </Stack>
        {/* <-- Saved List end -->     */}
      </Stack>
    </>
  );
};

export default Home;
