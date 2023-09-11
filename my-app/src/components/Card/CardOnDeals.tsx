import { CardProfileListListingProps } from "@/schema/Card/cardListing";
import { Card, CardBody, Button, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import escrow from "../../../public/EscrowFactoryContract.json";
import { fetchListingById, insertTransaction } from "@/shared/utils";
import { CardOnDealsProps } from "@/schema/Card/cardOnDeals";
import { BigNumber, ethers } from "ethers";
import { watchContractEvent } from "wagmi/actions";
import { Transaction } from "@/schema/transaction";
import { DeployEscrowContract } from "../hooks/DeployContract";

export const CardOnDeals = ({
  token,
  amount,
  price,
  duration,
  id,
}: CardOnDealsProps) => {
  const [result, setResult] = useState<any[]>([]); // [Listing, Listing, Listing
  const [value, setValue] = useState<any>();
  const [contractAddress, setContractAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [addressR, setAddressR] = useState("");
  const [listId, setListId] = useState(0);
  const [state, setState] = useState(true);
  const { address } = useAccount();
  const router = useRouter();
  const toast = useToast();
  //   const { config } = usePrepareContractWrite({
  //     address: "0x0165878a594ca255338adfa4d48449f69242eb8f",
  //     abi: escrow.abi,
  //     functionName: "createEscrow",
  //     args: [value, sellerAddress, addressR, listId],
  //     onError: (error) => {
  //       console.log(value);
  //       console.log(error);
  //       setState(false);
  //     },
  //   });

  const watchEvent = watchContractEvent(
    {
      address: "0xF389E98821E2aa9439D6868D85Ba9e0252b8e1cB",
      abi: escrow.abi,
      eventName: "EscrowCreated",
    },
    (log) => {
      console.log(log);
    }
  );

  //   const { data, write, isSuccess } = useContractWrite(config);

  //   const handleClick = async () => {
  //     if (write) write();
  //   };
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchListingById(id);
      console.log(data);
      if (data[0]?.status == "DONE") setState(false);
      console.log(state);
      setResult(data);
      setSellerAddress(data[0]?.wallet_address);
      setListId(data[0]?.id);
      setAddressR(address?.toString());
      console.log(ethers.utils.parseEther(data[0]?.amount.toString()));
      setValue(data[0]?.amount);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const sendData = async () => {
      if (contractAddress) {
        const dataTr: Transaction = {
          contractAddress: contractAddress,
          buyerAddress: addressR,
          sellerAddress: sellerAddress,
          status: "ONGOING",
        };
        await insertTransaction(dataTr);
      }
    };
  }, [contractAddress]);
  return (
    <Card border={"2px"}>
      <div className="flex justify-between align-center">
        <CardBody>
          <Text> Token: {token}</Text>
          <Text>Amount: {amount}</Text>
          <Text>Price: {price}</Text>
          <Text>Duration: {duration} Minutes</Text>
        </CardBody>
      </div>
      {state ? (
        <DeployEscrowContract
          value={value?.toString()}
          sellerAddress={sellerAddress}
          addressR={addressR}
          listId={listId}
        />
      ) : (
        <>
          <Button onClick={() => router.push(`/trade/detail/${listId}`)}>
            Continue
          </Button>
        </>
      )}

      {/* {isSuccess ??
        toast({
          title: "Contract Deployed",
          description: "Contract is deployed.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })} */}
    </Card>
  );
};
