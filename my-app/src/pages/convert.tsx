import { Select, Input, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAccount, useBalance } from "wagmi";
import { FetchBalanceResult } from "wagmi/actions";
import axios from "axios";
import Navbar from "@/components/Navbar/Navbar";

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
    console.log("balance", data);
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

      const result = await axios.post("https://api.expand.network/dex/swap", params, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "KAxEJKGa5Uz73kvcY5Dr1dxCOIF5bpTaiFn60h33",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-[100px] text-green-main">
        <Text fontSize="5xl" as="b" className="mb-2">
          Simply Click. Simply Input. Simply Swap Currency.
        </Text>
        <Text fontSize="xl" as="b" className="mb-20" color="black">
          One simple interface to swap your cryptocurrency without any hassle.
        </Text>
        <div className=" bg-[#F5F5F5] w-[450px] h-[350px] p-[20px] rounded-3xl text-[black] shadow-[0_20px_500px_rgba(0,_128,0,_0.7)]">
          <h1 className="pr-[5px] text-2xl text-[#526D82] font-bold">Swap</h1>
          <br />

          <div>
            <div>
              {/* pay */}
              <div>
                <p className="text-xl text-[#9E9FA5] font-semibold">Pay</p>
              </div>
              <div className="flex justify-between">
                <Input
                  type="number"
                  value={payToken}
                  onChange={(e) => setPayToken(Number(e.target.value))}
                  borderColor="blackAlpha.500"
                  size="lg"
                />
                <div className="pl-[12px]">
                  <Select borderColor="blackAlpha.500" size="lg">
                    {tokenOption.map((item, key) => {
                      return <option key={key}>{item.symbol}</option>;
                    })}
                  </Select>
                </div>
              </div>
            </div>
            <br />

            <div>
              {/* recieve */}
              <div>
                <p className="text-xl text-[#9E9FA5] font-semibold">Receive</p>
              </div>
              <div className="flex justify-between">
                <Text
                  className="p-[10px] rounded-lg border-solid border w-[300px]"
                  borderColor="blackAlpha.500"
                >
                  {recieveToken}
                </Text>
                <div className="pl-[10px]">
                  <Select borderColor="blackAlpha.500" size="lg">
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </Select>
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="flex justify-center">
              <button
                className="w-[300px] bg-green-main text-white font-semibold py-2 px-4 rounded-full"
                onClick={handleSubmit}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvertPage;

// const handleSubmit = async () => {
//   try {
//     const params = {
//       dexId: "1300",
//       amountIn: "1000000000000000",
//       amountOutMin: "0",
//       path: [
//         "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
//         "0x6B175474E89094C44Da98b954EedeAC495271d0F",
//       ],
//       to: address,
//       poolFees: "2975",
//       from: address,
//       gas: "173376",
//     };
//     const result = axios.post("https://api.expand.network/dex/swap", params, {
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": "KAxEJKGa5Uz73kvcY5Dr1dxCOIF5bpTaiFn60h33"
//       },
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
