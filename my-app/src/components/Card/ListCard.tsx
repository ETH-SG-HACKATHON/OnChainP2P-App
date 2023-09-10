import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Button,
    Text,
  } from "@chakra-ui/react";
  import router from "next/router";
  
  interface ListCardProps {
    idr: number;
    usdt: number;
    sAddress: string;
  }
  
  const ListCard = ({ idr, usdt, sAddress }: ListCardProps) => {
  
    const handleTrade = ()=> {
      router.push(`/trade/${sAddress}`);
  
    }
    return (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        className=" w-[40rem] max-w-[40rem] " //play with this for centering
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://static.thenounproject.com/png/2900961-200.png"
          alt="Caffe Latte"
        />
  
        <Stack>
          <CardBody>
            <Heading size="md">IDR = {idr}</Heading>
  
            <Text>
              Available USDT = {usdt} <br />
              Estimated trade time is 30 minutes <br />
              Seller Address = {sAddress}
            </Text>
          </CardBody>
  
          <CardFooter>
            <Button variant="solid" colorScheme="blue" onClick={handleTrade}>
              Trade
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    );
  };
  
  export default ListCard;
  