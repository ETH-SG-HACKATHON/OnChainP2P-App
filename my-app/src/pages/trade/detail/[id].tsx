import { BuyerPov } from "@/components/Buyer/BuyerPov";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { sendNotificationToSeller } from "@/shared/utils";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar/Navbar";
import img from "../../../../public/USDC.png";

function BuyerDetailPage() {
  const [state, setState] = useState(false);
  const [sellerAddress, setSellerAddress] = useState("");
  const [listingId, setListingId] = useState(0);
  const { address } = useAccount();
  const toast = useToast();

  const handleBuyPending = async () => {
    if (address)
      await sendNotificationToSeller(sellerAddress, address, listingId);
  };
  return (
    <div>
      <Navbar />
      <div className="h-[700px] flex flex-col items-center mt-[50px]">
        <div className="border-[10px] w-[600px] h-[650px] rounded-3xl">
          <h1 className=" mx-8 my-3 text-2xl font-bold"> Listing details </h1>

          {/* Image */}
          {/* <div className="flex flex-col justify-center items-center my-[50px]">
            <Image
              src={img}
              width={200}
              height={200}
              alt="Image"
              className="text-center"
            />
          </div> */}

          <div className="p-[40px]">

          
            {/* Details */}
            <div className=" flex flex-col gap-5">
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">Wallet Address: 1</h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">Token: Lorem Ipsum</h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">Amount: </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">Price: </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">Duration: </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">Payment Method</h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">Name: </h1>
            </div>

            {/* Button */}
            <div className="flex mt-5 gap-5">
              <Button
                onClick={() => {
                  toast({
                    title: "Notification is Send.",
                    description: "Notification is send to the seller.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                Buy
              </Button>
              <Button>Chat</Button>
            </div>

            </div>


        </div>
        {state ? <BuyerPov /> : <></>}
      </div>
    </div>
  );
}

export default BuyerDetailPage;
