import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "rain";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div>Test</div>
      <ConnectButton />
    </div>
  );
}
