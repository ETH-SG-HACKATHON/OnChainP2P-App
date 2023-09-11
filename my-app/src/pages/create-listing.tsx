import { Listing } from "@/schema/createListing";
import { Select, Button, Input, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { FetchBalanceResult } from "wagmi/actions";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Text, Divider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar/Navbar";
import { CreateListing } from "@/components/hooks/CreateListing";
import { ethers } from "ethers";

function Createlisting() {
  const [token, setToken] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountEthers, setAmountEthers] = useState<any>("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [state2, setState2] = useState(false);
  const [data2, setData2] = useState<Listing>();
  const [state, setState] = useState(false);
  const [tokenOption, setTokenOption] = useState<FetchBalanceResult[]>([]);
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    console.log(data);
    if (data) {
      setTokenOption([data]);
    }
  }, []);

  // const { config } = usePrepareContractWrite({
  //   address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  //   abi: listing.abi,
  //   functionName: "createAd",
  //   args: [amountEthers, paymentMethod],
  //   onSuccess(test) {
  //     console.log(config);
  //   },
  // });

  // const { data: data2, write: write2 } = useContractWrite(config);

  // const handleSubmit = async () => {
  //   console.log(process.env.LISTING_CONTRACT);
  //   console.log(address);
  //   console.log(ethers.utils.parseEther(amount.toString()));
  //   setAmountEthers(ethers.utils.parseEther(amount.toString()));
  //   if (address && write2) {
  //     const dataList: Listing = {
  //       walletAddress: address.toString(),
  //       token: token,
  //       amount: amount,
  //       price: price,
  //       duration: duration,
  //       paymentMethod: paymentMethod,
  //       name: name,
  //       accountNumber: accountNumber,
  //     };
  //     console.log(dataList);
  //     write2();
  //     insertListingToSupabase(dataList);
  //     //TODO submit transaction to on-chain
  //     console.log("listed");
  //     router.push("/");
  //     toast({
  //       title: "Listing Submitted.",
  //       description: "Listing has been submitted to the system.",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // };

  useEffect(() => {
    console.log(amountEthers);
    console.log(state2);
    if (amountEthers && paymentMethod && address) {
      console.log("masuk");
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
      setData2(dataList);
      setState2(true);
    }
  }, [amountEthers, paymentMethod]);

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-semibold mb-2 ml-4">Create Listing</h1>

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
                  >
                    {" "}
                    {tokenOption.map((token, key) => {
                      return (
                        <option key={key} value={token.symbol}>
                          {token.symbol}
                        </option>
                      );
                    })}
                  </Select>
                </div>
                <Text fontSize="lg" as="b" className="mt-3">
                  Amount
                </Text>
                <Input
                  variant="outline"
                  placeholder={amount.toString()}
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    setAmountEthers(ethers.utils.parseEther(e.target.value));
                  }}
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
                    placeholder={price.toString()}
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
                  {data2 && state2 ? (
                    <CreateListing
                      amountEthers={amountEthers}
                      paymentMethod={paymentMethod}
                      data={data2}
                    />
                  ) : (
                    <></>
                  )}

                  {/* {state2 ?? (
                    <CreateListing
                      amountEthers={amountEthers}
                      paymentMethod={paymentMethod}
                      data={data2 || {}}
                    />
                  )} */}
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
