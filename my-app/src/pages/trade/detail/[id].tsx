import { BuyerPov } from "@/components/Buyer/BuyerPov";
import { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import {
  acceptOffer,
  // checkUserOrSeller,
  // checkUserOrSeller2,
  fetchListingById,
  getNotificationFromSupabaseId,
  insertTransaction,
  sendNotificationToSeller,
} from "@/shared/utils";
import { useAccount } from "wagmi";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import { contractAddresses } from "@/abi/constant";
import { watchContractEvent } from "wagmi/actions";
import escrow from "../../../../public/EscrowFactoryContract.json";


function BuyerDetailPage() {
  const [state, setState] = useState(false);
  const [sellerAddress, setSellerAddress] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");


  const [dataFetch, setDataFetch] = useState<any[]>([]);
  const [listingId, setListingId] = useState(0);
  const [contractAddress, setContractAddress] = useState("");





  
  const [deposit, setDeposit] = useState(false);

  const [states, setStates] = useState(1);
  const [status, setStatus] = useState("");

  const toast = useToast();
  const { address, isConnecting, isDisconnected } = useAccount();

  const watchEvent = watchContractEvent(
    {
      address: "0xce6a29493983B221532205bC422F5759F89dFE8F",
      abi: escrow.abi,
      eventName: "EscrowCreated",
      
    },
   
    (log) => {
      setContractAddress(log)
      console.log("contractAddress log:",log)
    }

  
  );

  const handleBuyPending = async () => {
    if (address) {
      console.log(listingId);
      console.log(sellerAddress);

      await sendNotificationToSeller(
        sellerAddress,
        address?.toString(),
        listingId
      );
    }
  };

  const handleAccept = () =>{
    acceptOffer(Number(id))
  }

  const handleDeployContract = () => {
    insertTransaction()

  }


  const router = useRouter();
  const { id } = router.query;
  const [listings, setListings] = useState<any[]>([]); // Adjust the type as needed

  useEffect(() => { //get individual listing data
    const getDataListing = async () => {
      if (id) {
        setListingId(Number(id));
        console.log("my",id);
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



  useEffect(() => { //getnotificationstatus
    const getNotification = async () => {
      const data = await getNotificationFromSupabaseId(Number(id));
      console.log(data);
      if (data) {
        setStatus(data[0]?.status);
        console.log("my status",data[0]?.status )
        if (data) {
          setBuyerAddress(data[0]?.buyer_address || "");
          
        }
      }
    };
    getNotification();
  }, [id]);
  console.log("statusssku", status)

  // console.log("contract Address: ",contractAddress )
  console.log("buyer address: ", buyerAddress ) 
  console.log("seller address: ", sellerAddress)

  // useEffect(() => { //getnotificationstatus
  //   const getNotification = async () => {
  //     const data = await getNotificationFromSupabaseId(Number(id));
  //     console.log(data);
  //     if (data) {
  //       setStatus(data[0]?.status);
  //       console.log("my status",data[0]?.status )
  //     }
  //   };
  //   getNotification();
  // }, [id]);
  // console.log("statusssku", status)








  // useEffect(() => {
  //   const getNotification = async () => {
  //     const data = await getNotificationFromSupabaseId(Number(id));
  //     console.log(data);
  //     if (data) {
  //       setStatus(data[0]?.status);
  //       console.log("my status", data[0]?.status);
  //     }
  //   };
  //   getNotification();
  
  //   // Second useEffect placed inside the first one
  //   const getStates = async () => {
  //     if (status === "PENDING") {
  //       setStates(2);
  //     }
  //   };
  //   getStates();
  // }, [id]);
  

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

  // const  handleBuy = () => {
  //   setStates(2)
  // }


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


            {/* 1 = undefined
                2 = pending
                3 = accepted
                4 = ongoing */}

            <div>
              {status === undefined ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <button onClick={handleBuyPending}>Buy</button>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <p>none</p>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {status === "PENDING" ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <p> waiting for seller to accept</p>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <button onClick={handleAccept}>accept</button>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {status === "ACCEPTED" ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <b onClick={() => handleDeployContract}> deploy contract</b>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <p>waiting for buyer to deploy contract</p>
                  )}
                </div>
              ) : // Render nothing if states is not equal to 1
              null}
            </div>

            <div>
              {status === "ONGOING" ? (
                <div>
                  {address !== sellerAddress ? (
                    // Render the "Buy" button if the address is not equal to the seller's address
                    <p> waiting for seller to deposit </p>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <b onClick={() => setStates(5)}> deposit money</b>
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
                    <b onClick={() => setStates(6)}> picture button </b>
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
                    <p> wait for seller confirmation </p>
                  ) : (
                    // Render a message if the address is equal to the seller's address
                    <b onClick={() => setStates(7)}> confirm</b>
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
                    <p> transaction successfull </p>
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
