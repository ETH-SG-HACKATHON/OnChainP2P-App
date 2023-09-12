import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";
import ListCard from "./Card/ListCard";
import { getAllListingFromSupabase } from "@/shared/utils";

const ListLayout = () => {
  const [listings, setListings] = useState<any[]>([]);
  const router = useRouter();
  const toast = useToast();

  const { address, isConnecting, isDisconnected } = useAccount();

  const handleClick = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/create-listing");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllListingFromSupabase();
        if (data) setListings(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-10">
      <button
        className="bg-green-main text-white font-bold py-2 px-4 rounded absolute right-[3rem]"
        onClick={handleClick}
      >
        Create Listing
      </button>
      <div className="flex flex-row justify-center items-center h-[1150px]">
        {/* play with width for centering */}
        <div className="flex flex-wrap w-[1300px] gap-4">
          {listings.map((listing, key) => (
            <ListCard
              token={listing.token}
              price={listing.price}
              amount={listing.amount}
              duration={listing.duration}
              id={listing.id}
              key={key}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLayout;
