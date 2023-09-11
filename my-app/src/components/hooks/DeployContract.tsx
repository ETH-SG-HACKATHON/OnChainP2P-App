import { Button } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import escrow from "../../../public/EscrowFactoryContract.json";

interface DeployEscrowContractProps {
  value: number;
  sellerAddress: string;
  addressR: string;
  listId: number;
}

export const DeployEscrowContract = ({
  value,
  sellerAddress,
  addressR,
  listId,
}: DeployEscrowContractProps) => {
  const { config } = usePrepareContractWrite({
    address: "0x1a8a56a0b9c7a6f02dbc129d4e5e52c18206ad2c",
    abi: escrow.abi,
    functionName: "startTrade",
    args: [listId],
    onError: (error) => {
      console.log(value);
      console.log(error);
    },
  });

  const { data, write, isSuccess } = useContractWrite(config);

  const handleClick = async () => {
    if (write) write();
  };

  return <Button onClick={handleClick}>Deploy Contract</Button>;
};
