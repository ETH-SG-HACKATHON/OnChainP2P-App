import { CardOfferProps } from "@/schema/Card/cardOffer";
import { acceptOffer } from "@/shared/utils";
import { Card, CardBody, Button, Text, useToast } from "@chakra-ui/react";
import router from "next/router";

export const CardOffer = ({ buyer, reputation, id }: CardOfferProps) => {
  const toast = useToast();
  const handleAccept = async () => {
    try {
      const result = await acceptOffer(id);
      console.log(result);
      toast({
        title: "Offer Accepted",
        description: "Offer is accepted.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async () => {
    try {
      const result = await acceptOffer(id);
      console.log(result);
      toast({
        title: "Offer Rejected",
        description: "Offer is rejected.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card border={"2px"}>
      <div className="flex justify-between align-center">
        <CardBody>
          <Text>Buyer: {buyer}</Text>
          {/* TODO fetch data reputation On-Chain */}
          <Text>Reputation: {reputation}</Text>
          <div className="pt-[10px]">
            <Button onClick={handleAccept}>Accept</Button>
          </div>
          <div className="pt-[10px]">
            <Button onClick={handleReject}>Reject</Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};
