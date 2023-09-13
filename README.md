# XCallympics Frontend

This is the frontend for the XCallympics project. It is a demonstrator dApp that uses XCalls to transfer a NFT between chains.

## Links

- [Live demo](https://xcallympics.netlify.app/)
- [Contracts repo](https://github.com/Staky-io/xcallympics-core/)

## How it works

This front-end starts by minting a new NFT on the selected chain, it will be displayed instantly on the front-end UI after the transaction goes through.

When the user is ready, it then transfers the NFT to the other chain using XCalls and a [bridge contract](https://github.com/Staky-io/xcallympics-core/blob/main/contracts/NFTBridge.sol).

The bridge contract is set as the owner of the [NFT contract](https://github.com/Staky-io/xcallympics-core/blob/main/contracts/utils/XCallympicsNFT.sol) on every chain, allowing it to burn the NFT on the original chain and mint it on the destination chain.

In addition, the bridge contract uses [XCallBase](https://github.com/Staky-io/xcallympics-core/blob/main/contracts/utils/XCallBase.sol), a custom library that facilitates the use of XCalls.

After the NFT has been transferred, the front-end listens for on-chain events to update the UI and prompts the user to execute the call on the other chain.

## Curently supported chains

- [x] Ethereum
- [x] BSC
- [ ] ICON

## Run Locally

First, install the dependencies, then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

- [ ] Fix the event listener to update the UI when the NFT is transferred on the destination chain
- [ ] Add a loading indicator when the user is waiting for a transaction to go through
