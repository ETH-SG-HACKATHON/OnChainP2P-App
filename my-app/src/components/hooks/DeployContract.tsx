import { Button } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import escrow from "../../../public/EscrowFactoryContract.json";
import { BigNumber, ethers } from "ethers";

interface DeployEscrowContractProps {
  value: string;
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
    address: "0xF389E98821E2aa9439D6868D85Ba9e0252b8e1cB",
    abi: escrow.abi,
    functionName: "createEscrow",
    args: [ethers.utils.parseEther("0.002"), sellerAddress, addressR, listId],
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
