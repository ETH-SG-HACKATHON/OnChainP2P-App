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
    id: number;
    idr: number;
    usdt: number;
    sAddress: string;
  }
  
  const ListCard = ({ idr, usdt, sAddress, id }: ListCardProps) => {
  
    const handleTrade = ()=> {
      router.push(`/trade/detail/${id}`);
  
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
            <Heading size="md">IDR = {idr}</Heading>
  
            <Text>
              Available USDT = {usdt} <br />
              Estimated trade time is 30 minutes <br />
              Seller Address = {sAddress}
            </Text>
          </CardBody>
  
          <CardFooter>
            <button className='bg-green-main text-white font-bold rounded-md w-20 h-10' onClick={handleTrade}>
              Trade
            </button>
          </CardFooter>
        </Stack>
      </Card>
    );
  };
  
  export default ListCard;
  