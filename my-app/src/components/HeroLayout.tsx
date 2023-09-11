import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import btc from "../../public/HomeImage2.png";
import { Text } from "@chakra-ui/react";
import { Yellowtail } from "next/font/google";

const HeroLayout = () => {
  return (
    <div className="h-[500px] flex justify-between items-center">
      <div className="ml-[200px] text-xl">
        <div className="flex flex-row text-5xl text-green-main font-bold">
          <Text fontSize="5xl" className="mr-3" color="black">
            Convert
          </Text>
          <Typewriter
            options={{
              strings: ["USD", "EUR", "IDR", "MYR", "SGD"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="flex flex-row text-5xl text-green-main font-bold">
          <Text fontSize="5xl" className="mr-3" color="black">
            Into
          </Text>
          <Typewriter
            options={{
              strings: ["USDT", "USDC"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <h1 className="w-[500px] mt-4 font-semibold">
          DP2P is an easy-to-use peer-to-peer (P2P) platform that lets
          traders buy and sell cryptocurrencies directly with other individuals.
        </h1>
      </div>

      <div className="mr-[200px]">
        <Image src={btc} alt="" width={600} height={600} quality={100} />
      </div>
    </div>
  );
};

export default HeroLayout;
