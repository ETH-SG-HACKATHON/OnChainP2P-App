import { CardComponentProps } from "@/schema/Card/card";
import { Button, Card, CardBody, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const CardComponent = ({
  title,
  offer,
  description,
}: CardComponentProps) => {
  const router = useRouter();
  return (
    <Card border={"2px"}>
      <div className="flex justify-between align-center">
        <CardBody>
          <Text> Title: {title}</Text>
          <Text> Offer: {offer}</Text>
          <Text> Description: {description}</Text>
          <div className="pt-[10px]">
            <Button
              width={100}
              onClick={() => {
                router.push(`/buyer/detail/${title}`);
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
