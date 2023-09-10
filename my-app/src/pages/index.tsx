import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar/Navbar";
import HeroLayout from "@/components/HeroLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroLayout/>
    </div>
  );
}
