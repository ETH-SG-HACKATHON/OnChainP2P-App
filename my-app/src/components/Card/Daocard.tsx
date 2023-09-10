import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";
import router, { useRouter } from "next/router";

interface DaoCardProps {
  byAddress: string;
  details: string;
  bReason: string;
  sReason: string;
}

const DaoCard = ({ byAddress, details, bReason, sReason }: DaoCardProps) => {
  const handleVote = () => {
    router.push(`/vote/${byAddress}`);
  };

  return (
    <div>
      <Card className="w-5/11">
        <CardBody className="flex justify-between">
          <div className='flex flex-col'>
            <Text as='b'>Dispute by: {byAddress}</Text>
            <Text as='b'>Details: {details}</Text>
          </div>
          <button
            className="w-[70px] bg-green-main hover:bg-green-main text-white font-semibold py-2 px-4 rounded-md"
            onClick={handleVote}
          >
            Vote
          </button>
        </CardBody>
      </Card>
    </div>
  );
};

export default DaoCard;
