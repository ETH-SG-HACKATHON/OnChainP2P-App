import { useEffect } from "react";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import btc from "../../public/logo.png";

const HeroLayout = () => {
  return (
    <div className="h-[500px] flex justify-between items-center">
      <div className="ml-[200px] text-xl">
        <Typewriter
          options={{
            strings: ["Hello", "World", "with", "Typewriter.js"],
            autoStart: true,
            loop: true,
          }}
        />
        <h1 className="w-[500px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ullam
          molestiae saepe officia ipsa.
        </h1>
      </div>

      <div className="mr-[200px]">
        <Image src={btc} alt="" width={450} height={450} quality={100} />
      </div>
    </div>
  );
};

export default HeroLayout;
