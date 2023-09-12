import { Button } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import escrow from "../../../public/Listings.json";
import { useEffect } from "react";
import { updateTransactionStatus } from "@/shared/utils";

interface DeployEscrowContractProps {
  listId: number;
}

export const DeployEscrowContract = ({ listId }: DeployEscrowContractProps) => {
  const { config } = usePrepareContractWrite({
    address: "0x74C7d9cd90c23EDb4f95BCC1Ead374b24940f2dd",
    abi: escrow.abi,
    functionName: "startTrade",
    args: [listId],
    onError: (error) => {
      console.log(error);
    },
  });
  const { data, write, isSuccess } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess) {
      updateTransactionStatus(listId);
    }
  }, [isSuccess]);

  const handleClick = async () => {
    if (write) write();
  };

  return <Button onClick={handleClick}>Deploy Contract</Button>;
};
