import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/DP2Plogo3.png";
import { useAccount } from "wagmi";
import { useToast } from "@chakra-ui/react";

const Navbar = () => {
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();

  const toast = useToast();

  const handleVote = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }
    router.push("/dao");
  };

  const handleProfile = () => {
    if (isDisconnected) {
      toast({
        title: `Please connect your wallet first`,
        position: "top-right",
        isClosable: true,
        status: "warning",
        duration: 3000,
      });
      return;
    }

    router.push(`/profile`);
  };

  const handleSwap = () =>{
    router.push("/convert");


  }

  return (
    <div className="h-[70px] flex justify-between items-center">
      <Link href={"/"} className="ml-[30px]">
        <Image src={logo} alt="" width={130} height={100} />
      </Link>

      <div className="flex items-center gap-4 mr-[30px]">
      <button
          className="w-[100px] bg-green-main hover:bg-green-main text-white font-semibold py-2 px-4 rounded-full"
          onClick={handleSwap}
        >
          Swap
        </button>

        <button
          className="w-[100px] bg-green-main hover:bg-green-main text-white font-semibold py-2 px-4 rounded-full"
          onClick={handleVote}
        >
          Vote
        </button>
        <button
          className="w-[100px] bg-green-main hover:bg-green-main text-white font-semibold py-2 px-4 rounded-full"
          onClick={handleProfile}
        >
          Profile
        </button>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
