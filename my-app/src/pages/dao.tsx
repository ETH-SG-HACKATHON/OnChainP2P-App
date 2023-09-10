import DaoCard from "@/components/Card/DaoCard";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";
import { Text } from "@chakra-ui/react";

const DummyVote = [
  {
    byAddress: "0x1234567890",
    details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    sReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    byAddress: "0x2457112314",
    details: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    sReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    byAddress: "0x3349875092",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    sReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    byAddress: "0x4867234124",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    sReason: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

interface Dummy {
  byAddress: string;
  details: string;
  bReason: string;
  sReason: string;
}

const Dao = () => {
  const [dummy, setDummy] = useState<Dummy[]>(DummyVote);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto justify-center items-center">
        <div className="flex flex-row items-center justify-center mt-20 text-green-main">
          <Text fontSize="6xl" as="b">
            Vote Anonymously. Fair & Square.
          </Text>
        </div>
        <Text fontSize="xl" className="justify-center items-center text-center font-semibold">
          DP2P allows anonymous and secure voting from DAO members to ensure
          fairness among users.
        </Text>
      </div>
      <div className="container w-7/8 items-center justify-center mx-auto">
        <div className="grid grid-cols-2 items-center mt-16 gap-8">
          {dummy.map((item, key) => (
            <DaoCard
              byAddress={item.byAddress}
              details={item.details}
              bReason={item.bReason}
              sReason={item.sReason}
              key={key}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dao;
