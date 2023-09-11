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
    <div className="grid-cols-3 gap-4">
      <Card className="w-1/4">
        <div className="flex justify-between align-center">
          <CardBody>
            <Text as="b">Buyer: {buyer}</Text>
            {/* TODO fetch data reputation On-Chain */}
            <Text>Reputation: {reputation}</Text>
            <div className="flex mt-3">
              <div className="pt-[10px]">
                <button
                  className="bg-green-main h-10 w-20 mr-2 rounded-md text-white font-semibold"
                  onClick={handleAccept}
                >
                  Accept
                </button>
              </div>
              <div className="pt-[10px]">
                <button
                  className="bg-red-400 h-10 w-20 rounded-md text-white font-semibold"
                  onClick={handleReject}
                >
                  Reject
                </button>
              </div>
            </div>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};
