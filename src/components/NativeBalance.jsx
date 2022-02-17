import { useState, useEffect } from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { tokenValueTxt } from "helpers/formatters";
import { networkConfigs } from "helpers/networks";

function NativeBalance() {
  const { account, chainId } = useEthers();
  const [nativeName, setNativeName] = useState();

  useEffect(() => {
    if (account && chainId) {
      console.log("nativebalance", account, chainId);
      setNativeName(networkConfigs[chainId]?.currencySymbol);
    }
  }, [account, chainId]);

  const balance = useEtherBalance(account);
  console.log("balance", balance);

  return (
    balance > 0 && (
      <div
        style={{ textAlign: "center", whiteSpace: "nowrap" }}
      >{`${tokenValueTxt(balance, 18, nativeName)}`}</div>
    )
  );
}

export default NativeBalance;
