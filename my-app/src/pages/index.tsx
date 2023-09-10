import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar/>
    </div>
  );
}
