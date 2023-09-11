import { CardComponentProps } from "@/schema/Card/card";
import { Button, Card, CardBody, Text } from "@chakra-ui/react";
import { Tenali_Ramakrishna } from "next/font/google";
import { useRouter } from "next/router";

export const CardComponent = ({
  title,
  offer,
  description,
}: CardComponentProps) => {
  const router = useRouter();
  return (
    <Card border={"2px"} borderColor='teal'>
      <div className="flex justify-between align-center">
        <CardBody className="flex flex-col">
          <Text as='b'> Title: {title}</Text>
          <Text as='b'> Offer: {offer}</Text>
          <Text className="mt-2"> Description: {description}</Text>
          <div className="mt-5">
            <button
              className="bg-green-main font-semibold w-1/3 h-8 rounded-md text-white"
              onClick={() => {
                router.push(`/buyer/detail/${title}`);
              }}
            >
              Buy
            </button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};
