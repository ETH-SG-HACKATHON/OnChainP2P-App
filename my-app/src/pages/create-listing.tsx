import { Listing } from "@/schema/createListing";
import { Select, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { FetchBalanceResult } from "wagmi/actions";

function Createlisting() {
  const [token, setToken] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [state, setState] = useState(false);
  const [tokenOption, setTokenOption] = useState<FetchBalanceResult[]>([]);
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  const router = useRouter();

  useEffect(() => {
    console.log(data);
    if (data) {
      setTokenOption([data]);
    }
  }, []);

  const handleSubmit = async () => {
    if (address) {
      const dataList: Listing = {
        walletAddress: address.toString(),
        token: token,
        amount: amount,
        price: price,
        duration: duration,
        paymentMethod: paymentMethod,
        name: name,
        accountNumber: accountNumber,
      };
      //TODO submit transaction to on-chain
      router.push("/");
    }
  };

  return (
    <div>
      <div>
        <h1>Create Listing</h1>
      </div>
      <div className="flex justify-around border-[10px]">
        <div>
          <h1>Fill up the form</h1>
          <div>
            <h1>Wallet Address</h1>
            <p>{address}</p>
          </div>
          <div>
            <h1>Token</h1>
            {state ?? (
              <p>
                Convert to USDT or USDC{" "}
                <span>
                  <a href={`/convert`}>Convert Now</a>
                </span>
              </p>
            )}
            <Select
              placeholder="Select option"
              onChange={(e) => {
                setToken(e.target.value);
                if (e.target.value === "USDT" || e.target.value === "USDC") {
                  setState(true);
                } else {
                  setState(false);
                }
                const balance = tokenOption.find(
                  (token) => token.symbol === e.target.value
                )?.formatted;
                setBalance(balance || "");
              }}
            >
              {tokenOption.map((token, key) => {
                return (
                  <option key={key} value={token.symbol}>
                    {token.symbol}
                  </option>
                );
              })}
            </Select>
          </div>
          <div>
            <h1>Amount</h1>
            <h1>Balance: {balance}</h1>
            <Input
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <h1>Price</h1>
            <Input
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <h1>Duration</h1>
            <Select
              placeholder="Select option"
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value="1800">30 Minutes</option>
              <option value="900">15 Minutes</option>
            </Select>
          </div>
          <div>
            <h1>Payment Method</h1>
            <Select
              placeholder="Select option"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="BCA">BCA</option>
              <option value="CIMB">CIMB</option>
              <option value="PERMATA">PERMATA</option>
            </Select>
          </div>
          <div>
            <h1>Payment Account</h1>
            <hr></hr>
            <h1>Name</h1>
            <Input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <h1>Account Number</h1>
            <Input
              placeholder="Account Number"
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="my-[10px]">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
        <div className="border-[10px] px-[10px]">
          <h1 className="text-[20px]">Preview</h1>
          <hr></hr>
          <div>
            <h1>Wallet Address: {address}</h1>
          </div>
          <div>
            <h1>Token: {token}</h1>
          </div>
          <div>
            <h1>Amount: {amount}</h1>
          </div>
          <div>
            <h1>Price: {price}</h1>
          </div>
          <div>
            <h1>Duration: {duration}</h1>
          </div>
          <div>
            <h1>Payment Method: {paymentMethod}</h1>
          </div>
          <div>
            <h1>Name: {name}</h1>
          </div>
          <div>
            <h1>Account Number: {accountNumber}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createlisting;
