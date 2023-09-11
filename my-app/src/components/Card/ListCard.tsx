import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Heading,
    Button,
    Text,
  } from "@chakra-ui/react";
  import logofull from "../../../public/DP2Plogo2.png";
  import router from "next/router";
  import Image from "next/image"

  
  interface ListCardProps {
    token: string;
    price: number;
    amount: number;
    duration: number;
    id: number;
  }
  
  const ListCard = ({ token, price, amount, duration, id }: ListCardProps) => {
  
    const handleTrade = (walletId)=> {
      router.push(`/trade/detail/${walletId}`);
  
    }
    return (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        className=" w-[40rem] max-w-[40rem] " //play with this for centering
      >
        <Image
          src={logofull}
          alt="Caffe Latte"
          width={200}
          height={200}
        />
  
        <Stack>
          <CardBody>
            <Heading size="md">Token = {token}</Heading>
  
            <Text>
              Listing Price = {price} <br />
              Listing Amount = {amount} <br />
              Listing Duration = {duration}
            </Text>
          </CardBody>
  
          <CardFooter>
            <button className='bg-green-main text-white font-bold rounded-md w-20 h-10' 
            onClick={() => handleTrade(id)}>
              Trade
            </button>
          </CardFooter>
        </Stack>
      </Card>
    );
  };
  
  export default ListCard;
  