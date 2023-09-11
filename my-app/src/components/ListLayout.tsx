import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";
import ListCard from "./Card/ListCard";

const DummyList = [
  {
    id: 1,
    idr: 15000,
    usdt: 1000,
    sAddress: "0x1234567890",
  },
  {
    id: 2,
    idr: 16000,
    usdt: 2000,
    sAddress: "0x2457112314",
  },
  {
    id: 3,
    idr: 15500,
    usdt: 3000,
    sAddress: "0x3349875092",
  },
  {
    id: 4,
    idr: 17000,
    usdt: 4000,
    sAddress: "0x4867234124",
  },
  {
    id: 5,
    idr: 14900,
    usdt: 5000,
    sAddress: "0x5823478523",
  },
];

interface Dummy {
  id: number;
  idr: number;
  usdt: number;
  sAddress: string;
}

const ListLayout = () => {
  const [dummy, setDummy] = useState<Dummy[]>(DummyList);
  const router = useRouter();
  const toast = useToast();

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

  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <div className="mt-10">
      <button
        className="bg-green-main text-white font-bold py-2 px-4 rounded absolute right-[3rem]"
        onClick={handleClick}
      >
        Create Listing
      </button>
      <div className="flex flex-row justify-center items-center h-[900px]">
        {/* play with width for centering */}
        <div className="flex flex-wrap w-[1300px] gap-4">
          {dummy.map((item, key) => (
            <ListCard
              id={item.id}
              idr={item.idr}
              usdt={item.usdt}
              sAddress={item.sAddress}
              key={key}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListLayout;
