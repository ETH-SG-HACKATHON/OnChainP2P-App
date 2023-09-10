import DaoCard from "@/components/Card/Daocard";
import Navbar from "@/components/Navbar/Navbar";
import { useState } from "react";



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
  ]
  

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
      <div className=" flex flex-col items-center mt-16 gap-4">
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
  );
};

export default Dao;
