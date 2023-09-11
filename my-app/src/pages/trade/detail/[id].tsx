import { BuyerPov } from "@/components/Buyer/BuyerPov";
import { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import {
  // checkUserOrSeller,
  // checkUserOrSeller2,
  fetchListingById,
  sendNotificationToSeller,
} from "@/shared/utils";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";

function BuyerDetailPage() {
  const [state, setState] = useState(false);
  const [sellerAddress, setSellerAddress] = useState("");
  const [dataFetch, setDataFetch] = useState<any[]>([]);
  const [listingId, setListingId] = useState(0);
  const [states, setStates] = useState(1);
  const [deposit, setDeposit] = useState(false);

  const toast = useToast();
  const { address, isConnecting, isDisconnected } = useAccount();

  // const handleBuyPending = async () => {
  //   if (address) {
  //     console.log(listingId);
  //     console.log(sellerAddress);

  //     await sendNotificationToSeller(
  //       sellerAddress,
  //       address?.toString(),
  //       listingId
  //     );
  //   }
  // };

  const router = useRouter();
  const { id } = router.query;
  const [listings, setListings] = useState<any[]>([]); // Adjust the type as needed

  useEffect(() => {
    const getDataListing = async () => {
      if (id) {
        setListingId(Number(id));
        console.log(id);
        const data = await fetchListingById(Number(id));
        console.log(data);
        if (data) {
          setSellerAddress(data[0]?.wallet_address || "");
          setListingId(data[0]?.id || "");
          setDataFetch(data);
        }
      }
    };
    getDataListing();
  }, [id]);

  // useEffect(() => {
  //   const check = async () => {
  //     if (address) {
  //       const test = await checkUserOrSeller(address.toString());
  //       if (test === 1) {
  //         setStates(1);
  //       } else if (test === 2) {
  //         setStates(2);
  //       } else {
  //         setStates(3);
  //       }
  //     }
  //   };
  //   check();
  // }, []);

  // useEffect(() => {
  //   const checkPossibleDeposit = async () => {
  //     if (address) {
  //       const test = await checkUserOrSeller2(address.toString());
  //       setDeposit(true);
  //     }
  //   };
  //   checkPossibleDeposit();
  // }, []);


  const  handleBuy = () => {
    setStates(2)
    




  }


  return (
    <div>
      <Navbar />
      <div className="h-[700px] flex flex-col items-center mt-[50px]">
        <div className="border-[10px] border-green-main w-[600px] h-[800px] rounded-3xl">
          <h1 className=" mx-8 mt-3 text-2xl font-bold"> Listing details </h1>

          <div className="p-[40px]">
            <div>
              {dataFetch.map((listing) => {
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

            <div>
              {states === 1 ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <button onClick={handleBuy}>Buy</button>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <p>none</p>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {states === 2 ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <p> waiting for seller to accept</p>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <button onClick={()=> setStates(3) }>accept</button>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {states === 3 ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <b onClick={()=> setStates(4) }> deploy contract</b>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <p>waiting for buyer to deploy contract</p>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {states === 4 ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <p> waiting for seller to deposit </p>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <b onClick={()=> setStates(5) }> deposit money</b>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {states === 5 ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <b onClick={()=> setStates(6) }> picture button  </b>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <p> waiting for buyer proof</p>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {states === 6 ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <p> wait for seller confirmation   </p>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <b onClick={()=> setStates(7) }> confirm</b>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {states === 7 ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <p> transaction successfull   </p>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <p> transaction successfull </p>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>






            {/* Button */}
            {/* {states === 1 ? (
              <div>
                <Button>Waiting for buyer to transfer</Button>
              </div>
            ) : (
              <></>
            )}
            {states === 2 ? (
              <div>
                <Button>Waiting for seller to deposit</Button>
                {deposit ? <Button>Deposit</Button> : <></>}
              </div>
            ) : (
              <></>
            )}
            {states === 3 ? <Button>Buy</Button> : <></>} */}
            {/* <div className="flex mt-5 gap-5">
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
                payment proof
              </button> */}
          </div>
        </div>
        {state ? <BuyerPov /> : <></>}
      </div>
    </div>
  );
}

export default BuyerDetailPage;
