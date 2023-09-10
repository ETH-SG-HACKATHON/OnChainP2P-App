import { CardComponent } from "@/components/Card/Card";
import { CardDisputeComponent } from "@/components/Card/CardDispute";
import { CardComponentProps } from "@/schema/Card/card";
import { CardDisputeComponentProps } from "@/schema/Card/cardDispute";
import { title } from "process";
import { useEffect, useState } from "react";

function Explore() {
  const [data, setData] = useState<CardComponentProps[]>([]);
  const [dataDispute, setDataDispute] = useState<CardDisputeComponentProps[]>(
    []
  );
  useEffect(() => {
    setData([
      {
        title: "title",
        offer: "offer",
        description: "description",
      },
    ]);
    setDataDispute([
      {
        buyer: "0x67889",
        seller: "0x1234",
        symbol: "USDC",
        amount: 1000,
        reason: "reason",
        time: "time",
      },
    ]);
  }, []);
  return (
    <div>
      {/* Navbar */}
      <div className="px-[100px]">
        <div className="text-[50px]">Explore</div>
        <div>
          <div>
            <h1 className="text-[30px]">Lisitings</h1>
            <hr></hr>
            <br></br>
            <div className="grid grid-cols-5 gap-4">
              {/* All the listings */}
              {data.map((item, key) => {
                return (
                  <CardComponent
                    title={item.title}
                    offer={item.offer}
                    description={item.description}
                    key={key}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="text-[30px]">Dispute Happening</h1>
            <hr></hr>
            <br></br>
            <div className="grid grid-cols-5 gap-4">
              {/* All the listings */}
              {dataDispute.map((item, key) => {
                return (
                  <CardDisputeComponent
                    buyer={item.buyer}
                    seller={item.seller}
                    symbol={item.symbol}
                    amount={item.amount}
                    reason={item.reason}
                    time={item.time}
                    key={key}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
