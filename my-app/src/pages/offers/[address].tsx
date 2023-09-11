import { CardOffer } from "@/components/Card/CardOffer";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Divider, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { fetchNotification } from "@/shared/utils";

function ViewOffers() {
  const [data, setData] = useState<any[] | null | undefined>([]);
  const [addressR, setAddressR] = useState<string | undefined>("");
  const { address } = useAccount();
  useEffect(() => {
    setAddressR(address?.toString());
    const fetchData = async () => {
      if (address) {
        const result = await fetchNotification(address?.toString());
        setData(result);
      }
    };
    fetchData();
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
          {data ? (
            data.map((item, index) => {
              return (
                <CardOffer
                  id={item.id}
                  buyer={item.buyer_address}
                  reputation={100}
                  key={index}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewOffers;
