import { Select, Input, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { FetchBalanceResult } from "wagmi/actions";
import axios from "axios";

function ConvertPage() {
  const [tokenOption, setTokenOption] = useState<FetchBalanceResult[]>([]);
  const [payToken, setPayToken] = useState(0);
  const [recieveToken, setRecieveToken] = useState(0);
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  useEffect(() => {
    if (data) {
      setTokenOption([data]);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const params = {
        dexId: "1300",
        amountIn: "1000000000000000",
        amountOutMin: "0",
        path: [
          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        ],
        to: address,
        poolFees: "2975",
        from: address,
        gas: "173376",
      };
      const result = axios.post("https://api.expand.network/dex/swap", params);
    } catch (e) {}
  };
  return (
    <div className="">
      <div>Swap</div>
      <div className="flex justify-center">
        <div className="bg-black max-w-[500px] p-[20px] rounded-lg text-[white]">
          <div className="flex text-[white]">
            <h1 className="pr-[5px]">Swap</h1>
            <h1>Buy</h1>
          </div>
          <div>
            <div>
              {/* pay */}
              <div>
                <p>Pay</p>
              </div>
              <div className="flex justify-between">
                <Input
                  type="number"
                  value={payToken}
                  onChange={(e) => setPayToken(Number(e.target.value))}
                />
                <div className="pl-[10px]">
                  <Select>
                    {tokenOption.map((item, key) => {
                      return <option key={key}>{item.symbol}</option>;
                    })}
                  </Select>
                </div>
              </div>
            </div>
            <div>
              {/* recieve */}
              <div>
                <p>Recieve</p>
              </div>
              <div className="flex justify-between">
                <Text className="pl-[15px]">{recieveToken}</Text>
                <div className="pl-[10px]">
                  <Select>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex w-[100%]">
              <Button>Swap</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvertPage;
