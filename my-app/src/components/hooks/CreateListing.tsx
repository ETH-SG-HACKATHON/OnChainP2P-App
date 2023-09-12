import { Button, useToast } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import listing from "../../../public/Listings.json";
import { Listing } from "@/schema/createListing";
import { insertListingToSupabase } from "@/shared/utils";
import { useRouter } from "next/router";
import { abi } from "@/abi/constant";
import { BigNumber } from "ethers";

interface CreateListingProps {
  amountEthers: any;
  paymentMethod: string;
  data: Listing;
}

export const CreateListing = ({
  amountEthers,
  paymentMethod,
  data,
}: CreateListingProps) => {
  const router = useRouter();
  const toast = useToast();
  const { config } = usePrepareContractWrite({
    address: "0x74C7d9cd90c23EDb4f95BCC1Ead374b24940f2dd",
    abi: listing.abi,
    functionName: "createAd",
    args: [
      data.token,
      amountEthers,
      data.price,
      BigNumber.from(BigInt(data.duration)),
      paymentMethod,
      data.name,
      data.accountNumber,
    ],
    onSuccess(test) {
      console.log(config);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: data2, write: write2 } = useContractWrite(config);

  const handleSubmit = async () => {
    if (write2) write2();
    insertListingToSupabase(data);
    console.log("listed");
    router.push("/");
    toast({
      title: "Listing Submitted.",
      description: "Listing has been submitted to the system.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <button
      className="bg-green-main text-white font-bold py-2 px-4 rounded"
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
};
