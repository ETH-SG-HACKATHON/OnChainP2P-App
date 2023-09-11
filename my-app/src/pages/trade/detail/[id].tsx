import { BuyerPov } from "@/components/Buyer/BuyerPov";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  getListingFromSupabaseId,
  getTransactionFromSupabase,
} from "@/shared/utils";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";

function BuyerDetailPage() {
  const [state, setState] = useState(false);
  const [sellerAddress, setSellerAddress] = useState("");
  const [dataFetch, setDataFetch] = useState<any[]>([]);
  const [listingId, setListingId] = useState(0);

  const toast = useToast();

  const handleBuyPending = async () => {
    // if (address) console.log(listingId);
    // console.log(sellerAddress);
    // await sendNotificationToSeller(sellerAddress, address, listingId);
  };

  const router = useRouter();
  const { id } = router.query;
  const [listings, setListings] = useState<any[]>([]); // Adjust the type as needed

  useEffect(() => {
    // Ensure that this code only runs on the client
    if (typeof window !== "undefined") {
      if (id) {
        async function fetchData() {
          //IGNORE AJA GPP
          try {
            const data = await getListingFromSupabaseId(id);
            setListings(data);
            setWalletAddress(data[0].wallet_address);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }

        // Call the fetchData function to initiate data retrieval when the component mounts
        fetchData();
      }
    }
  }, [id]);

  const [walletAddress, setWalletAddress] = useState("");
  const [transaction, setTransaction] = useState<any[]>([]);

  useEffect(() => {
    // Ensure that this code only runs on the client
    if (typeof window !== "undefined") {
      if (id) {
        async function fetchData() {
          //IGNORE AJA GPP
          try {
            const data = await getTransactionFromSupabase(walletAddress);
            setTransaction(data);
            console.log("transaction"), data;
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }

        // Call the fetchData function to initiate data retrieval when the component mounts
        fetchData();
      }
    }
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="h-[700px] flex flex-col items-center mt-[50px]">
        <div className="border-[10px] border-green-main w-[600px] h-[800px] rounded-3xl">
          <h1 className=" mx-8 mt-3 text-2xl font-bold"> Listing details </h1>

          <div className="p-[40px]">
            <div>
              {listings.map((listing) => {
                return (
                  <div key={listing.id} className="flex flex-col gap-5">
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[80px] ">
                      Wallet Address: {listing.wallet_address}
                    </h1>
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                      Token: {listing.token}
                    </h1>
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                      Amount: {listing.amount}
                    </h1>
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                      Price: {listing.price}
                    </h1>
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                      Duration: {listing.duration}
                    </h1>
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                      Payment Method: {listing.payment_method}
                    </h1>
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                      Name: {listing.name}
                    </h1>
                    <h1 className="flex items-center rounded-xl pl-[10px] border-2 w-[500px] h-[40px] ">
                      Account Number: {listing.account_number}
                    </h1>
                  </div>
                );
              })}
            </div>

            {/* Button */}

            <div className="flex mt-5 gap-5">
              <button
                onClick={() => {
                  handleBuyPending();
                  // Add your toast notification logic here
                }}
                className="w-[100px] bg-green-main hover:bg-green-main text-white font-semibold py-2 px-4 rounded-full"
              >
                Buy
              </button>

              <button
                onClick={() => {
                  // Add your toast notification logic here
                }}
                className="w-[100px] bg-red-500 hover:bg-green-main text-white font-semibold py-2 px-4 rounded-full"
              >
                DEPLOY
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
