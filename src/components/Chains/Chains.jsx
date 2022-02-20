import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
};

const menuItems = [
  // {
  //   id: 1,
  //   key: "0x1",
  //   value: "Ethereum",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x539",
  //   value: "Local Chain",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x3",
  //   value: "Ropsten Testnet",
  //   icon: <ETHLogo />,
  // },
  {
    id: 4,
    key: "0x4",
    value: "Rinkeby Testnet",
    icon: <ETHLogo />,
  },
  // {
  //   key: "0x2a",
  //   value: "Kovan Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x5",
  //   value: "Goerli Testnet",
  //   icon: <ETHLogo />,
  // },
  // {
  //   key: "0x38",
  //   value: "Binance",
  //   icon: <BSCLogo />,
  // },
  // {
  //   key: "0x61",
  //   value: "Smart Chain Testnet",
  //   icon: <BSCLogo />,
  // },
  // {
  //   key: "0x89",
  //   value: "Polygon",
  //   icon: <PolygonLogo />,
  // },
  // {
  //   id: 80001,
  //   key: "0x13881",
  //   value: "Mumbai",
  //   icon: <PolygonLogo />,
  // },
  // {
  //   key: "0xa86a",
  //   value: "Avalanche",
  //   icon: <AvaxLogo />,
  // },
];

function Chains() {
  const { account, chainId } = useEthers();
  const [chain, setChain] = useState(chainId);
  const [selected, setSelected] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!chainId) return null;
    setIsVisible(true);
    console.log("current chainId: ", chainId);
    const newSelected = menuItems.find((item) => item.id === chainId);
    setSelected(newSelected);
  }, [account, chainId]);

  useEffect(() => {
    const isM = window.innerWidth > 700 ? false : true;
    setIsMobile(isM);
  }, [window.innerWidth]);

  const handleMenuClick = async (e) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  const switchNetwork = async (chain) => {
    console.log("window.ethereum", window.ethereum);
    if (window.ethereum) {
      await window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chain }],
        })
        .then((res) => {
          console.log("switch network success!");
          setChain(chain);
        })
        .catch((err) => {
          console.log("switch network error: ", err.message);
        });
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    isVisible && (
      <div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            key={selected?.key}
            icon={selected?.icon}
            style={{ ...styles.button, ...styles.item }}
          >
            {!isMobile && (
              <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
            )}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    )
  );
}

export default Chains;
