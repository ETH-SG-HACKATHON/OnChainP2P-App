import { Listing } from "@/schema/createListing";
import { Select, Button, Input, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { FetchBalanceResult } from "wagmi/actions";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Text, Divider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar/Navbar";

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
      <div className="p-8">
        <Navbar />
        <h1 className="text-3xl font-semibold  mt-6 mb-2 ml-4">
          Create Listing
        </h1>

        <div className="flex justify-around p-4 gap-5">
          <div className="w-1/2">
            <Card className="p-2">
              <CardBody>
                <Text fontSize="2xl" as="b">
                  Listing Form
                </Text>
                <Divider className="mt-2" />
                <div className="mt-3">
                  <Text fontSize="lg" as="b">
                    Wallet Address
                  </Text>
                  <Input
                    variant="filled"
                    className="cursor-not-allowed pointer-events-none"
                    placeholder={address}
                  />
                </div>
                <div className="mt-3 mb-3">
                  <Text fontSize="lg" as="b">
                    Token
                  </Text>
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
                      if (
                        e.target.value === "USDT" ||
                        e.target.value === "USDC"
                      ) {
                        setState(true);
                      } else {
                        setState(false);
                      }
                      const balance = tokenOption.find(
                        (token) => token.symbol === e.target.value
                      )?.formatted;
                      setBalance(balance || "");
                    }}
                  />
                  {tokenOption.map((token, key) => {
                    return (
                      <option key={key} value={token.symbol}>
                        {token.symbol}
                      </option>
                    );
                  })}
                </div>
                <Text fontSize="lg" as="b" className="mt-3">
                  Amount
                </Text>
                <Input
                  variant="outline"
                  placeholder={amount.toString()}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {/* <Divider className="mt-2" /> */}
                <div className="mt-3">
                  <Text fontSize="lg" as="b">
                    Balance
                  </Text>
                  <Input
                    variant="filled"
                    className="cursor-not-allowed pointer-events-none"
                    placeholder={balance}
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
                <div className="mt-3">
                  <Text fontSize="lg" as="b">
                    Price
                  </Text>
                  <Input
                    variant="filled"
                    className="cursor-not-allowed pointer-events-none"
                    placeholder={price}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="mt-3 mb-5">
                  <Text fontSize="lg" as="b">
                    Duration
                  </Text>
                  <Select
                    variant="outline"
                    onChange={(e) => setDuration(Number(e.target.value))}
                  >
                    <option value="1800">30 Minutes</option>
                    <option value="900">15 Minutes</option>
                  </Select>
                </div>
                <div className="mt-3 mb-5">
                  <Text fontSize="lg" as="b">
                    Payment Method
                  </Text>
                  <Select
                    variant="outline"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="BCA">BCA</option>
                    <option value="CIMB">CIMB</option>
                    <option value="PERMATA">PERMATA</option>
                  </Select>
                </div>
              </CardBody>
            </Card>

            <Card className="mt-4 p-2">
              <CardBody>
                <Text fontSize="2xl" as="b">
                  Personal Information
                </Text>
                <Divider className="mt-2" />
                <div className="mt-3">
                  <Text fontSize="lg" as="b">
                    Name
                  </Text>
                  <Input
                    variant="outline"
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <Text fontSize="lg" as="b">
                    Account Number
                  </Text>
                  <Input
                    variant="outline"
                    placeholder={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="w-1/2 p-2">
            <CardBody>
              <div>
                <Text className="text-2xl" as="b">
                  Preview
                </Text>
                <hr className="my-2" />
                <div className="mt-4">
                  <h3>Wallet Address: {address}</h3>
                </div>
                <div className="mt-4">
                  <h3>Token: {token}</h3>
                </div>
                <div className="mt-4">
                  <h3>Amount: {amount}</h3>
                </div>
                <div className="mt-4">
                  <h3>Price: {price}</h3>
                </div>
                <div className="mt-4">
                  <h3>Duration: {duration}</h3>
                </div>
                <div className="mt-4">
                  <h3>Payment Method: {paymentMethod}</h3>
                </div>
                <div className="mt-4">
                  <h3>Name: {name}</h3>
                </div>
                <div className="mt-4">
                  <h3>Account Number: {accountNumber}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Createlisting;
