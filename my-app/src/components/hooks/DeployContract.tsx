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
    address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
    abi: escrow.abi,
    functionName: "createEscrow",
    args: [value, sellerAddress, addressR, listId],
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
