import { useState } from "react";
import { TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import useAuthSlideBar from "../hooks/auth/useAuthSlideBar";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    label: "Tổ chức",
    icon: <TeamOutlined />,
    // children: [],
  },
  {
    key: "2",
    label: "Công ty",
    icon: <TeamOutlined />,
    // children: [],
  },
];
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { menuItems, keyActive } = useAuthSlideBar();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[keyActive]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
