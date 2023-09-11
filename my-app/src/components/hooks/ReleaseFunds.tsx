import { Button } from "@chakra-ui/react";
import escrow from "../../../public/EscrowFactoryContract.json";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

interface ReleaseFundsProps {
  contractAddress: `0x${string}`;
}

export const ReleaseFunds = ({ contractAddress }: ReleaseFundsProps) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: escrow.abi,
    functionName: "transferBuyer",
  });

  const { data, write, isSuccess } = useContractWrite(config);

  const handleSubmit = () => {
    if (write) write();
  };

  return <Button onClick={handleSubmit}>Release Funds</Button>;
};
