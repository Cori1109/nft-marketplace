import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Mainnet, DAppProvider } from "@usedapp/core";
import "./index.css";
import "./antd-my-theme/index";
import { Constants } from "config/constants";

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: Constants.rpcUrlEth,
  },
  multicallVersion: 2,
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
