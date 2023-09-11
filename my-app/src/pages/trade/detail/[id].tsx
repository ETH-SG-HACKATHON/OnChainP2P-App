import { BuyerPov } from "@/components/Buyer/BuyerPov";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { fetchListingById, sendNotificationToSeller } from "@/shared/utils";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar/Navbar";
import img from "../../../../public/USDC.png";
import { useRouter } from "next/router";

function BuyerDetailPage() {
  const [state, setState] = useState(true);
  const [sellerAddress, setSellerAddress] = useState("");
  const [dataFetch, setDataFetch] = useState<any[]>([]);
  const [listingId, setListingId] = useState(0);
  const { address } = useAccount();
  const toast = useToast();
  const router = useRouter();

  const { id } = router.query;

  const handleBuyPending = async () => {
    if (address) console.log(listingId);
    console.log(sellerAddress);
    await sendNotificationToSeller(sellerAddress, address, listingId);
  };

  useEffect(() => {
    const getDataListing = async () => {
      setListingId(id);
      const data = await fetchListingById(id);
      console.log(data);
      setSellerAddress(data[0]?.wallet_address);
      setListingId(data[0]?.id);
      setDataFetch(data);
    };
    getDataListing();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-[700px] flex flex-col items-center mt-[50px]">
        <div className="border-[10px] border-green-main w-[600px] h-[650px] rounded-3xl">
          <h1 className=" mx-8 mt-7 text-2xl font-bold"> Listing Details </h1>

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
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                Wallet Address: {dataFetch[0].wallet_address}
              </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                Token: {dataFetch[0].token}
              </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                Amount:{dataFetch[0].amount}
              </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                Price:{dataFetch[0].price}
              </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                Duration:{dataFetch[0].duration}
              </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                Payment Method: {dataFetch[0].payment_method}
              </h1>
              <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                Name:{dataFetch[0].name}
              </h1>
            </div>

            {/* Button */}
            <div className="flex mt-5 gap-5">
              <button
                onClick={() => {
                  handleBuyPending();
                  toast({
                    title: "Notification is Send.",
                    description: "Notification is send to the seller.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
                className="w-[100px] bg-green-main hover:bg-green-main text-white font-semibold py-2 px-4 rounded-full"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
        {state ? <BuyerPov /> : <></>}
      </div>
    </div>
  );
}

export default BuyerDetailPage;
