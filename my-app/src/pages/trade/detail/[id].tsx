import { BuyerPov } from "@/components/Buyer/BuyerPov";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  getListingFromSupabase,
  sendNotificationToSeller,
} from "@/shared/utils";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";

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

  const router = useRouter();
  const { id } = router.query;
  const [listings, setListings] = useState<any[]>([]); // Adjust the type as needed

  useEffect(() => {
    // Define an async function inside useEffect to perform the data fetching
    async function fetchData() {
      try {
        const address = "your_wallet_address_here"; // Replace with the desired wallet address
        const data = await getListingFromSupabase(id);

        // Set the retrieved data to the 'listings' state
        setListings(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Call the fetchData function to initiate data retrieval when the component is mounted
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-[700px] flex flex-col items-center mt-[50px]">
        <div className="border-[10px] border-green-main w-[600px] h-[800px] rounded-3xl">
          <h1 className=" mx-8 mt-3 text-2xl font-bold"> Listing details </h1>

          <div className="p-[40px]">
            {/* Details */}
            <div>
              {listings.map((listing) => (
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
              ))}
            </div>

            {/* Button */}
            <div className="flex mt-5 gap-5">
              <button
                onClick={() => {
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
