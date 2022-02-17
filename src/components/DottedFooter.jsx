import React, { useState, useEffect } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Typography,
  Layout,
  Divider,
  Row,
  Col,
  Button,
} from "antd";
import {
  TwitterOutlined,
  InstagramOutlined,
  RedditOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import DiscordIcon from "./DiscordIcon";

const { Footer } = Layout;
const { Text, Title } = Typography;

function DottedFooter() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  return (
    <ConfigProvider>
      <Footer
        style={{
          // position: "fixed",
          // bottom: 0,
          background: "rgb(24 104 183)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col span={20}>
          <Row
            style={{
              paddingTop: "40px",
              paddingBottom: "40px",
              marginBottom: "20px",
            }}
          >
            <Col
              md={10}
              sm={24}
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Title level={3} style={{ color: "white" }}>
                  Stay in the loop
                </Title>
                <Text style={{ fontSize: "16px", color: "white" }}>
                  Join our mailing list to stay in the loop with our newest
                  feature releases, NFT drops, and tips and tricks for
                  navigating OpenSea.
                </Text>
              </Row>
              <Row style={{ marginTop: "8px" }}>
                <Form
                  form={form}
                  name="horizontal_login"
                  layout="inline"
                  onFinish={onFinish}
                  style={{ width: "100%" }}
                >
                  <Row style={{ width: "100%" }}>
                    <Col span={18} style={{ margin: "auto" }}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            type: "email",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Your email address"
                          style={{
                            borderRadius: "10px",
                            padding: "12px",
                            fontSize: "15px",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item shouldUpdate>
                        {() => (
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            style={{
                              borderRadius: "10px",
                              height: "auto",
                              fontWeight: "bold",
                              padding: "12px 20px",
                            }}
                          >
                            Sign Up
                          </Button>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Col>
            <Col sm={24} md={10} offset={4}>
              <Row>
                <Title level={3} style={{ color: "white" }}>
                  Join the community
                </Title>
              </Row>
              <Row>
                <Button
                  type="primary"
                  icon={<TwitterOutlined />}
                  style={styles.linkBtn}
                />
                <Button
                  type="primary"
                  icon={<InstagramOutlined />}
                  style={styles.linkBtn}
                />
                <Button
                  type="primary"
                  icon={<DiscordIcon />}
                  style={styles.linkBtn}
                />
                <Button
                  type="primary"
                  icon={<RedditOutlined />}
                  style={styles.linkBtn}
                />
                <Button
                  type="primary"
                  icon={<YoutubeOutlined />}
                  style={styles.linkBtn}
                />
                <Button
                  type="primary"
                  icon={<MailOutlined />}
                  style={styles.linkBtn}
                />
              </Row>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: "rgb(76 136 196)" }} />
          <Row style={{ paddingBottom: "40px", marginBottom: "20px" }}>
            <Col md={6} sm={24} style={{ marginBottom: "20px" }}>
              <Title level={3} style={{ color: "white" }}>
                Market
              </Title>
              <Text style={{ fontSize: "16px", color: "white" }}>
                The world’s first and largest digital marketplace for crypto
                collectibles and non-fungible tokens (NFTs). Buy, sell, and
                discover exclusive digital items.
              </Text>
            </Col>
            <Col offset={2} md={16} sm={24}>
              <Row style={{ justifyContent: "center" }}>
                <Col md={12} sm={24} style={{ marginBottom: "20px" }}>
                  <Title
                    level={4}
                    style={{ color: "white", textTransform: "uppercase" }}
                  >
                    About
                  </Title>
                  <Button type="link" style={{ color: "white" }}>
                    About Us
                  </Button>
                  <Button type="link" style={{ color: "white" }}>
                    Blog
                  </Button>
                  <Button type="link" style={{ color: "white" }}>
                    Terms of Service
                  </Button>
                  <Button type="link" style={{ color: "white" }}>
                    FAQs
                  </Button>
                </Col>
                <Col md={12} sm={24}>
                  <Title
                    level={4}
                    style={{ color: "white", textTransform: "uppercase" }}
                  >
                    Contact Us
                  </Title>
                  <Button
                    icon={<MailOutlined />}
                    type="link"
                    style={{ color: "white" }}
                  >
                    user@example.com
                  </Button>
                  <Button
                    icon={<PhoneOutlined />}
                    type="link"
                    style={{ color: "white" }}
                  >
                    (+1)2345678
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider style={{ backgroundColor: "rgb(76 136 196)" }} />
          <Row justify="space-between" style={{ marginBottom: "20px" }}>
            <Col style={{ display: "flex" }}>
              <Text
                style={{ color: "white", alignItems: "center", margin: "auto" }}
              >
                &copy; {new Date().getFullYear()} Copyright Market. All Rights
                Reserved
              </Text>
            </Col>
            <Col>
              <Button type="link" style={{ color: "white" }}>
                Powered by DottedAI
              </Button>
            </Col>
          </Row>
        </Col>
      </Footer>
    </ConfigProvider>
  );
}
export default DottedFooter;

const styles = {
  linkBtn: {
    marginTop: "8px",
    marginRight: "12px",
    borderRadius: "10px",
    width: "50px",
    height: "50px",
    ".svg": {
      width: "30px",
      height: "20px",
    },
  },
};

ConfigProvider.config({
  theme: {
    primaryColor: "#2081e2",
  },
});
