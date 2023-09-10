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
  import btc from "../../public/HomeImage2.png";
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
          width={100}
          height={100}
          src={logofull}
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
            <button className='bg-green-main text-white font-bold rounded-md w-20 h-10' onClick={handleTrade}>
              Trade
            </button>
          </CardFooter>
        </Stack>
      </Card>
    );
  };
  
  export default ListCard;
  