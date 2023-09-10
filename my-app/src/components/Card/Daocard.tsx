import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import router, { useRouter } from "next/router";


interface DaoCardProps {
  byAddress: string;
  details: string;
  bReason: string;
  sReason: string;
}

const DaoCard = ({byAddress, details, bReason, sReason}: DaoCardProps) => {

  const handleVote = ()=> {
    router.push(`/vote/${byAddress}`);
  }

  return (
    <div>
      <Card className="w-[40rem]">
        <CardBody className="flex justify-between">
          <div>
            <Text>Dispute by: {byAddress}</Text>
            <Text>Details: {details}</Text>
          </div>         
          <button onClick={handleVote}>
            vote
          </button>
        </CardBody>
      </Card>
    </div>
  );
};

export default DaoCard;
