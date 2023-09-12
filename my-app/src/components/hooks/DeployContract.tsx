import { Button } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import escrow from "../../../public/EscrowFactoryContract.json";

interface DeployEscrowContractProps {
  listId: number;
}

export const DeployEscrowContract = ({ listId }: DeployEscrowContractProps) => {
  const { config } = usePrepareContractWrite({
    address: "0xce6a29493983B221532205bC422F5759F89dFE8F",
    abi: escrow.abi,
    functionName: "startTrade",
    args: [listId],
    onError: (error) => {
      console.log(error);
    },
  });

  const { data, write, isSuccess } = useContractWrite(config);

  const handleClick = async () => {
    if (write) write();
  };

  return <Button onClick={handleClick}>Deploy Contract</Button>;
};
