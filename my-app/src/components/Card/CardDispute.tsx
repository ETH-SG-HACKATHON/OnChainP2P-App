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
    <Card border={"2px"}>
      <div className="flex justify-between align-center">
        <CardBody>
          <Text>
            {" "}
            Buyer: {buyer} vs Seller: {seller}
          </Text>
          <Text> Symbol: {symbol}</Text>
          <Text> Amount: {amount}</Text>
          <Text> Reason: {reason}</Text>
          <Text> Time: {time}</Text>
          <div className="pt-[10px]">
            <Button
              width={100}
              onClick={() => {
                router.push(`/dispute/${buyer}`);
              }}
            >
              Buy
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};
