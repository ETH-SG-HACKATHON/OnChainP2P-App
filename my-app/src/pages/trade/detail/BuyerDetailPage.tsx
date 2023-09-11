import { BuyerPov } from "@/components/Buyer/BuyerPov";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { sendNotificationToSeller } from "@/shared/utils";
import { useAccount } from "wagmi";

export function BuyerDetailPage() {
  const [state, setState] = useState(false);
  const { address } = useAccount();
  const toast = useToast();

  // const handleBuyPending = async () => {
  //   await sendNotificationToSeller();
  // };
  return (
    <div>
      <div>Buyer Detail Page</div>
      <div className="flex justify-between px-[200px] border-[10px]">
        <div>
          {/* Image */}
          <div>
            <Image
              src="/dummy-image.jpeg"
              width={200}
              height={200}
              alt="Image"
            />
          </div>
        </div>
        
        <div>
          {/* Details */}
          <div>
            <h1>Test data</h1>
            <div className="mb-[10px]">
              <p>Offer: 1</p>
              <p>Description: Lorem Ipsum</p>
            </div>
            <div className="mb-[10px]">
              <Button
                onClick={() => {
                  toast({
                    title: "Notification is Send.",
                    description: "Notification is send to the seller.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              >
                Buy
              </Button>
            </div>
            <div>
              <Button>Chat</Button>
            </div>
          </div>
        </div>
      </div>
      {state ? <BuyerPov /> : <></>}
    </div>
  );
}