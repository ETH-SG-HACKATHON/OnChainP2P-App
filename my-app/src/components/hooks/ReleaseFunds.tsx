import { Button } from "@chakra-ui/react";
import escrow from "../../../public/Listings.json";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { BigNumber } from "ethers";

interface ReleaseFundsProps {
  id: string;
  contractAddress: `0x${string}`;
}

export const ReleaseFunds = ({ contractAddress, id }: ReleaseFundsProps) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: escrow.abi,
    functionName: "verifyBankTransfer",
    args: [2],
  });

  const { data, write, isSuccess } = useContractWrite(config);

  const handleSubmit = () => {
    if (write) write();
  };

  return <Button onClick={handleSubmit}>Release Funds</Button>;
};
