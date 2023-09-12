> Tedzy Homo:

# DP2P - Trustless Decentralized P2P App On-Chain

## Intro to DP2P

DP2P is a decentralized peer-to-peer application that allow users to buy and sell cryptocurrency from one user to another. DP2P runs all transactions on-chain, ensuring transparency, fairness, and security in every transaction.

## Project Description

### Problem Statements

In centralized P2P exchanges, users typically deposit their funds into the exchange's wallets, giving the exchange control over their assets. This centralized control can lead to issues if the exchange is hacked, goes bankrupt, or engages in fraudulent activities.

### Get Started

To run the application, first install the dependencies:
bash
npm install

Then start the development server:
bash
npm run dev

### Solution

- Buyer and seller are able to perform peer-to-peer exchange on-chain without the need of a third-party institution, which enables transparency and security from fraud or bankrupcy risk.
- Enabling buyer and seller to apply for dispute in case if a suspicious activity is suspected from the opposing side to ensure fairness.

### Value Proposition

- On-Chain Transaction

By utilizing the power of on-chain transaction, peer-to-peer exchange can be performed without the need of a third-party organization or individual as the middleman, where it implements the smart contract instead as a replacement of the middleman. which allow the users to gain a whole new experience in peer-to-peer exchange in the Web3 environment. In addition, this type of peer-to-peer exchange system also enhances transparency, safety, and fairness among users.

- Solving Dispute through Anonymous Voting

In an event of disagreement between buyer and seller, each of them is given the ability to apply for dispute, where each party will be able to stand for their rights by showing evidences and proofs. This dispute event will then be evaluated and judged by the DAO community through anonymous voting based on the given evidence, allowing the conflict to be solved in a fair and objective manner. This dispute event will also affect the reputation of both buyer and seller, ensuring a fair punishment for the guilty side and a reward for the innocent side.

- Built-In Swap Feature

DP2P also have a built-in swap feature, which will help the user in swapping their token/currency simply if needed through simple gestures without the need of switching to another application.

### Features Utilisation

If you are a Buyer, you may:

1. Buy token from desired listed seller.
2. Transfer money using bank account to seller.
3. Post proof of payment to the seller.
4. Apply for dispute if the seller does not give the money.

If you are a Seller, you may:

1. Create listing to sell tokens to buyers.
2. Deposit token to the escrow contract.
3. Confirm 'payment received' from the buyer based on the proof of payment sent by the buyer.
4. Apply for dispute if the buyer have not paid the money until the timer runs out.

If you are a DAO member, you may:

1. Resolve dispute conflict by giving a vote to the preferred side (buyer or seller).
2. Give one vote to each dispute conflict that the member participated in.

Every successful transaction and every dispute event that is done will affect the reputation of the involved buyer and seller.

### Tech Stack

- Package-Manager: Node Package Manager (NPM)
- Smart Contract Development: Solidity, Foundry
  - Deploy: Polygon zkEVM, Linea, Polygon Mumbai, Taiko, Ziliqa, Neon
  - Network: Polygon zkEVM, Linea, Polygon Mumbai, Taiko, Ziliqa, Neon
- Frontend: next
  - Contract Interactions: wagmi, rainbowkit
  - Styling: tailwindcss
- Misc:
  - Linting & Formatting: eslint, prettier
  - Design: chakra tailwindcss

#### Deployments

- Polygon zkEVM

  Listings Contract Address: 0x81D034Cf7021c25af00442fA50D3e2e413a7F1d1

  Dispute Contract Address: 0x725552d5a03766908d1A919B168a622187076756

  EscrowFactory Contract Address: 0x1F0124224359Ed3194b669e4056384C1135f775c

> Tedzy Homo:

- Linea

  Listings Contract Address: 0x81D034Cf7021c25af00442fA50D3e2e413a7F1d1

  Dispute Contract Address: 0x73b821968d8161Bff524Fae22c898f0CF6E32901

  EscrowFactory Contract Address: 0xa67cFbB88b5CdC43bc7cfFA67656C9012E9F2d4b

- Polygon Mumbai

  Listings: 0x74C7d9cd90c23EDb4f95BCC1Ead374b24940f2dd

  Dispute: 0x78FebfB0c47F670Ea4E0D666a0b4865aC16420DC

  EscrowFactory: 0xd2CBB995f6C913585b6A4f4ED73B4f14595E42ad

- Mantle

  Listings Contract Address: 0x81D034Cf7021c25af00442fA50D3e2e413a7F1d1

  Dispute Contract Address: 0xab2c73bc00BE8b935c3C6D51ebEd0694Ce91c7c4

  EscrowFactory Contract Address: 0xE93464dCDfbd2b28eecD68e6f9A98dD4ce4911ee

- Taiko L2

  Listings Contract Address: 0x81D034Cf7021c25af00442fA50D3e2e413a7F1d1

  Dispute Contract Address: 0xF400AEc6e1868d075Bf458B56990FeC79Da1557b

  EscrowFactory Contract Address: 0x905979c3Bb7c4F7251A63D05c7A089cDE2828678

- Zilliqa

  Listings Contract Address: 0x78d7876A5E7CC6BB2750786d85AaD4F80266C13e

  Dispute Contract Address: 0xF400AEc6e1868d075Bf458B56990FeC79Da1557b

  EscrowFactory Contract Address: 0x905979c3Bb7c4F7251A63D05c7A089cDE2828678

#### License

This project operates under the MIT License, giving you the freedom to build upon our vision.

#### Explore

Experience a whole new peer-to-peer exchange that is decentralized and running on-chain. Simplify the peer-to-peer exchange activity between buyer and seller without the need to worry for third-party risk.

> Feel free to drop any feedbacks and comments on GitHub! All responses will be highly appreciated.
