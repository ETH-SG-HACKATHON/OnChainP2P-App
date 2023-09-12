import { CardProfileListListingProps } from "@/schema/Card/cardListing";
import { Card, CardBody, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const CardProfileList = ({
  token,
  amount,
  price,
  duration,
  notif,
  id,
}: CardProfileListListingProps) => {
  const { address } = useAccount();
  const router = useRouter();
  return (
    <Card border={"2px"}>
      <div className="flex justify-between align-center">
        <CardBody>
          <Text> Token: {token}</Text>
          <Text>Amount: {amount}</Text>
          <Text>Price: {price}</Text>
          <Text>Duration: {duration} Minutes</Text>
        </CardBody>
        <CardBody>
          <h1>Offers: {notif}</h1>
        </CardBody>
      </div>
      {notif && notif > 0 ? (
        <Button onClick={() => router.push(`/offers/${id}`)}>
          Check Offer
        </Button>
      ) : (
        <></>
      )}
    </Card>
  );
};
