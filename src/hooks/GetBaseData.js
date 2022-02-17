import Web3 from "web3";
import ERC721ABI from "ABI/ERC721-ABI";
import { Constants } from "config/constants";

const web3 = new Web3(Constants.rpcURL[4]);

export const GetBaseData = async (waddresss) => {
  const wcontract = new web3.eth.Contract(ERC721ABI, waddresss);
  const totalSup = await wcontract.methods
    .totalSupply()
    .call()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return null;
    });
  const cname = await wcontract.methods
    .name()
    .call()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return null;
    });
  const csymbol = await wcontract.methods
    .symbol()
    .call()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return null;
    });
  const baseData = { totalSupply: totalSup, name: cname, symbol: csymbol };
  return baseData;
};
