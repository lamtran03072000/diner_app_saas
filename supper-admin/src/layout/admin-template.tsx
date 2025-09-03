import { useState } from "react";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import useAuthSlideBar from "../hooks/auth/useAuthSlideBar";
const { Sider } = Layout;

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
