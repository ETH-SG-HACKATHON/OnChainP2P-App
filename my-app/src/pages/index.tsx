import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar/Navbar";
import HeroLayout from "@/components/HeroLayout";
import ListLayout from "@/components/ListLayout";
import listing from "../../public/Listings.json";
import { useContractRead } from "wagmi";
import { useEffect } from "react";
import { BigNumber } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useContractRead({
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    abi: listing.abi,
    functionName: "getAd",
    args: [BigNumber.from(BigInt(1))],
  });

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <Navbar />
      <HeroLayout />
      <ListLayout />
    </div>
  );
}
