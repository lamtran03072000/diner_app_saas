import { Button, Form, Input } from "antd";
import { useAuth } from "../../../hooks/auth/useAuth";
import type { LoginRequest } from "../../../types/auth";

const LoginPage = () => {
  const { loginAccount } = useAuth();

  const handleLogin = (values: LoginRequest) => {
    loginAccount({
      email: values.email || "",
      password: values.password || "",
    });
  };

  return (
    <div className="rounded-2xl p-5 border">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item<LoginRequest>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginRequest>
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
