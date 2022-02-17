import Blockies from "react-blockies";
import { useEthers } from "@usedapp/core";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const { account } = useEthers();
  if ((!props.address && !props.currentWallet) || !account) return null;

  return (
    <Blockies
      seed={
        props.currentWallet
          ? account.toLowerCase()
          : props.address.toLowerCase()
      }
      className="identicon"
      {...props}
    />
  );
}

export default Blockie;
