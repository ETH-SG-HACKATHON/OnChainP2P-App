import { CardComponent } from "@/components/Card/Card";
import { CardDisputeComponent } from "@/components/Card/CardDispute";
import Navbar from "@/components/Navbar/Navbar";
import { CardComponentProps } from "@/schema/Card/card";
import { CardDisputeComponentProps } from "@/schema/Card/cardDispute";
import { title } from "process";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

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
      <Navbar />
      <div className="px-[100px]">
        <div className="flex flex-col mx-auto justify-center items-center text-green-main text-center mt-10">
          <Text fontSize="6xl" as="b">
            Explore More. Know More.
          </Text>
          <Text fontSize="xl" as="b" color='black' className="justify-center items-center text-center">
            Learn more about our current available listings and happening disputes.
          </Text>
        </div>
        <div>
          <div className="">
            <Text fontSize="4xl" as="b">
              Listings
            </Text>
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
          <div className="mt-10 mb-20">
          <Text fontSize="4xl" as="b">
              Disputes Happening
            </Text>
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
