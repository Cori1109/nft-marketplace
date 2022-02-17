import { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "./Blockie";
import { Button, Card, Modal } from "antd";
import Address from "./Address/Address";
import { SelectOutlined, WalletOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
};

function Account() {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobiled = window.innerWidth > 700 ? false : true;
    setIsMobile(mobiled);
  }, [window.innerWidth]);

  if (!account) {
    return (
      <div style={styles.account} onClick={activateBrowserWallet}>
        <p style={styles.text}>Authenticate</p>
      </div>
    );
  }
  console.log("account: ", account, "chainId: ", chainId);

  return (
    <>
      {!isMobile ? (
        <div style={styles.account} onClick={() => setIsModalVisible(true)}>
          <p style={{ marginRight: "5px", ...styles.text }}>
            {getEllipsisTxt(account, 6)}
          </p>
          <Blockie currentWallet scale={3} />
        </div>
      ) : (
        <Button
          type="primary"
          icon={<WalletOutlined />}
          onClick={() => setIsModalVisible(true)}
        />
      )}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={() => {
            deactivate();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
