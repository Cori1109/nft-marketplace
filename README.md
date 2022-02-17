# `NFT-Marketplace`

This project of course work on any EVM-compatible blockchain such as Polygon, Avalanche, Binance Smart Chain and other such chains.

# ⭐️ `Star us`

If this project helps you build Ethereum dapps faster - please star this project, every star makes us very happy!

# 🚀 Quick Start

📄 Clone or fork `nft-marketplace`:

```sh
git clone https://github.com/Cori1109/nft-marketplace.git
```

💿 Install all dependencies:

```sh
cd nft-marketplace
yarn install
```

```jsx
const [contractABI, setContractABI] = useState();
const [marketAddress, setMarketAddress] = useState();
```

🔃 Sync the `MarketItemCreated` event `/src/contracts/marketplace.sol` contract with your Moralis Server, making the tableName `MarketItems`

```jsx
event MarketItemCreated (
  uint indexed itemId,
  address indexed nftContract,
  uint256 indexed tokenId,
  address seller,
  address owner,
  uint256 price,
  bool sold
);
```

🚴‍♂️ Run your App:

```sh
yarn start
```
