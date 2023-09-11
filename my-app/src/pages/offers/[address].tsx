import { CardOffer } from "@/components/Card/CardOffer";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Divider, Text } from "@chakra-ui/react";

function ViewOffers() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData([
      {
        id: 1,
        buyer: "0x1234567890",
        reputation: 100,
      },
    ]);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto w-7/8 mt-16">
        <Text fontSize="4xl" as="b">
          Offers
        </Text>
        <Divider className="mt-2 mb-6" />
        <div>
          {data.map((item, index) => {
            return (
              <CardOffer
                id={item.id}
                buyer={item.buyer}
                reputation={item.reputation}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewOffers;
