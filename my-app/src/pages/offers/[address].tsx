import { CardOffer } from "@/components/Card/CardOffer";
import { useEffect, useState } from "react";

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
      <h1>View Offers</h1>
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
  );
}

export default ViewOffers;
