import Web3 from "web3";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import marketplaceABI from "ABI/MarketPlace-ABI";
import { config } from "config/multicall";

const MarketPlaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
const marketplaceInterface = new utils.Interface(marketplaceABI);
const web3 = new Web3(config.rpcUrl);
const uContract = new Contract(MarketPlaceAddress, marketplaceInterface);
const wContract = new web3.eth.Contract(marketplaceABI, MarketPlaceAddress);
let apprContract;

export async function FetchMarketItems() {
  let MarketItem = [];
  try {
    MarketItem = await wContract.methods.fetchMarketItems().call();
  } catch (error) {
    console.log("fetchMarketItem error:", error);
  }
  return MarketItem;
}

export function GetAppAddr(address) {
  console.log("appaddr", address);
  const approveABI = [
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "tokenId", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const approveInterface = new utils.Interface(approveABI);
  apprContract = new Contract(address, approveInterface);
}

export function ApproveMethod() {
  const { state, send } = useContractFunction(apprContract, "approve");
  return { state, send };
}

export function UseContractMethod(methodName) {
  const { state, send } = useContractFunction(uContract, methodName);
  return { state, send };
}
