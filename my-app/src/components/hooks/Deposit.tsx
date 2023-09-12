import { Button } from "@chakra-ui/react";
import escrow from "../../../public/EscrowContract.json";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

interface DepositProps {
  contractAddress: `0x${string}`;
}

export const Deposit = ({ contractAddress }: DepositProps) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: escrow.abi,
    functionName: "depositFunds",
  });

  const { data, write, isSuccess } = useContractWrite(config);

  const handleSubmit = () => {
    if (write) write();
  };

  return <Button onClick={handleSubmit}>Deposit</Button>;
};
