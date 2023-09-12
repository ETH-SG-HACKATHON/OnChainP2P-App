import { CardOnDeals } from "@/components/Card/CardOnDeals";
import { CardProfileList } from "@/components/Card/CardProfileList";
import Navbar from "@/components/Navbar/Navbar";
import { CardProfileListing } from "@/schema/Card/cardListing";
import {
  fetchAcceptedOffers,
  fetchListingById,
  getListingFromSupabase,
} from "@/shared/utils";

import { use, useEffect, useState } from "react";
import { useAccount } from "wagmi";

function ProfilePage() {
  const [result, setResult] = useState<any[]>([]); // [Listing, Listing, Listing
  const [deals, setDeals] = useState<any[]>([]);
  const [addressR, setAddressR] = useState<any[]>([]);
  const { address } = useAccount();
  useEffect(() => {
    if (address) {
      setAddressR(address?.toString());
    }
    const getListing = async () => {
      const data = await getListingFromSupabase(address?.toString() || "");
      console.log(data);
      setResult(data || []);
    };
    const fetchListing = async () => {
      console.log(address?.toString());
      if (address) {
        const data = await fetchAcceptedOffers(address?.toString());
        console.log(data);
        if (!data) return;
        let arr: any[] = [];
        data.map(async (item) => {
          const data2 = await fetchListingById(item.listing_id);
          if (data2) {
            console.log("ini data", data2[0].id);
            arr.push(data2[0].id);
          }
          setDeals(arr);
        });
        console.log(arr);
      }
    };
    getListing();
    fetchListing();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="px-[80px] pt-[20px]">
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
        </div>
        <hr></hr>
        <div>
          <h1>On Going Deals</h1>
          <div className="grid grid-cols-5 gap-4">
            {deals.map((item, index) => {
              return (
                <CardOnDeals
                  id={item}
                  key={index}
                  token={item.token}
                  amount={item.amount}
                  price={item.price}
                  duration={(item.duration / 60).toString()}
                />
              );
            })}
          </div>
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
