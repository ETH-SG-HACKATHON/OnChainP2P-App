import { CardProfileList } from "@/components/Card/CardProfileList";
import { CardProfileListing } from "@/schema/Card/cardListing";
import { getListingFromSupabase } from "@/shared/utils";

import { use, useEffect, useState } from "react";
import { useAccount } from "wagmi";

function ProfilePage() {
  const [result, setResult] = useState<any[]>([]); // [Listing, Listing, Listing
  const { address } = useAccount();
  useEffect(() => {
    const getListing = async () => {
      const data = await getListingFromSupabase(address?.toString() || "");
      console.log(data);
      setResult(data || []);
    };
    getListing();
  }, []);
  return (
    <div className="px-[80px]">
      <div>Profile Page</div>
      <hr></hr>
      <div>
        <div>
          <h1 className="text-[20px]">On Going Listing</h1>
          <div className="grid grid-cols-5 gap-4">
            {result.map((item: CardProfileListing, index) => {
              if (!item.offers) {
                return (
                  <CardProfileList
                    id={item.id}
                    key={index}
                    token={item.token}
                    amount={item.amount}
                    price={item.price}
                    duration={(item.duration / 60).toString()}
                    notif={0}
                  />
                );
              } else {
                return (
                  <CardProfileList
                    id={item.id}
                    key={index}
                    token={item.token}
                    amount={item.amount}
                    price={item.price}
                    duration={(item.duration / 60).toString()}
                    notif={item.offers.length}
                  />
                );
              }
            })}
          </div>
        </div>
        <hr></hr>
        <div>
          <h1>On Going Deals</h1>
        </div>
        <hr></hr>
        <div>
          <h1>On Going Buy</h1>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
