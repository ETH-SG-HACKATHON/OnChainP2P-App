import { CardDisputeComponentProps } from "@/schema/Card/cardDispute";
import { Card, CardBody, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { title } from "process";

export const CardDisputeComponent = ({
  buyer,
  seller,
  symbol,
  amount,
  reason,
  time,
}: CardDisputeComponentProps) => {
  const router = useRouter();
  return (
    <Card border={"2px"} borderColor='teal'>
      <div className="flex justify-between align-center">
        <CardBody>
          <Text as='b'>
            {" "}
            Buyer: {buyer} vs Seller: {seller}
          </Text>
          <Text className="mt-2"> Symbol: {symbol}</Text>
          <Text> Amount: {amount}</Text>
          <Text> Reason: {reason}</Text>
          <Text> Time: {time}</Text>
          <div className="mt-5">
            <button
              className="bg-green-main font-semibold w-1/3 h-8 rounded-md text-white"
              onClick={() => {
                router.push(`/dispute/${buyer}`);
              }}
            >
              Vote
            </button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};
