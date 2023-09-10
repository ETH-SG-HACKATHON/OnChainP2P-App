import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";

export const DummyVote = [
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

const FullVote = () => {
  const router = useRouter();
  const { Address } = router.query;
  const [dummy, setDummy] = useState<Dummy[]>(DummyVote);

  // Filter the DummyVote array to find the matching vote by byAddress
  const vote = dummy.find((item) => item.byAddress === Address);

  // Check if a matching vote was found
  if (!vote) {
    return <div>Vote not found</div>;
  }

  // Extract details, bReason, and sReason from the found vote
  const { details, bReason, sReason } = vote;

  return (
    <div>
      <Navbar />
      <h1>Dispute by: {Address}</h1>
      <p>Details: {details}</p>
      <div className="h-[600px] flex items-center justify-around">
        <div className="text-center">
          <p>buyer Reason: {bReason}</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Vote
          </button>
        </div>
        <div className="text-center">
          <p> seller Reason: {sReason}</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullVote;
