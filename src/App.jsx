import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect,
} from "react-router-dom";
import { Menu, Layout } from "antd";
import Account from "components/Account";
import Chains from "components/Chains";
import NativeBalance from "components/NativeBalance";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import MobileDrawer from "components/mobileDrawer";
import SearchCollections from "components/SearchCollections";
import DottedFooter from "components/DottedFooter";
// import NFTMarketTransactions from "components/NFTMarketTransactions";
import "antd/dist/antd.css";
import "./style.css";

const { Header } = Layout;

// export const Logo = () => (
//   <a href="https://dotted.ai" style={{ display: "flex" }}>
//     <img src={LogoImg} style={{ maxWidth: "none", width: "50px" }} />
//   </a>
// );

const styles = {
  layout: {
    height: "100vh",
    overflow: "auto",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
};

const App = () => {
  const { account } = useEthers();

  const [inputValue, setInputValue] = useState("explore");

  return (
    <Layout style={styles.layout}>
      <Router>
        <Header>
          <MobileDrawer />
          <SearchCollections setInputValue={setInputValue} />
          <Menu
            theme="light"
            mode="horizontal"
            className="headerMenu"
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")}>
              <NavLink to="/NFTMarketPlace">🛒 Explore Market</NavLink>
            </Menu.Item>
            <Menu.Item key="nft">
              <NavLink to="/nftBalance">🖼 My Collections</NavLink>
            </Menu.Item>
            <Menu.Item key="create">
              <NavLink to="/createNFT">📑 Create an NFT</NavLink>
            </Menu.Item>
          </Menu>
          <div className="headerRight">
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={{ display: "grid", height: "inherit" }}>
          <div style={styles.content}>
            <Switch>
              <Route path="/nftBalance">
                <NFTBalance />
              </Route>
              <Route path="/NFTMarketPlace">
                <NFTTokenIds
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              </Route>
              <Route path="/createNFT">{/* <NFTMarketTransactions /> */}</Route>
            </Switch>
            <Redirect to="/NFTMarketPlace" />
          </div>
          <DottedFooter />
        </div>
      </Router>
    </Layout>
  );
};

export default App;
