import React, { useEffect } from "react";
import { Form, Input, Select, Switch, Button, message, Space } from "antd";
import type {
  Organization,
  CreateOrganizationRequest,
} from "../../types/organization";
import useCreateOrganization from "../../hooks/organization/useCreateOrganization";

interface OrganizationFormProps {
  organization?: Organization | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  organization,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { createOrganization, isLoading, error } = useCreateOrganization();

  const isEditing = !!organization;

  useEffect(() => {
    if (organization) {
      form.setFieldsValue({
        name: organization.name,
        emailBling: organization.emailBling,
        plan: organization.plan,
        isActive: organization.isActive,
      });
    }
  }, [organization, form]);

  useEffect(() => {
    if (error) {
      message.error("Failed to save organization");
    }
  }, [error]);

  const handleSubmit = async (values: CreateOrganizationRequest) => {
    try {
      if (isEditing) {
        // TODO: Implement update API call
        message.success("Organization updated successfully");
        onSuccess();
      } else {
        await createOrganization(values);
        message.success("Organization created successfully");
        // Reset form sau khi tạo thành công
        form.resetFields();
        onSuccess();
      }
    } catch (error) {
      message.error("Failed to save organization");
    }
  };

  // Reset form khi organization thay đổi
  useEffect(() => {
    if (!organization) {
      form.resetFields();
    }
  }, [organization, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        plan: "basic",
        isActive: true,
      }}
    >
      <Form.Item
        name="name"
        label="Organization Name"
        rules={[
          { required: true, message: "Please enter organization name" },
          { min: 2, message: "Name must be at least 2 characters" },
        ]}
      >
        <Input placeholder="Enter organization name" />
      </Form.Item>

      <Form.Item
        name="emailBling"
        label="Email Bling"
        rules={[{ type: "email", message: "Please enter a valid email" }]}
      >
        <Input placeholder="Enter Bling email address" />
      </Form.Item>

      <Form.Item
        name="plan"
        label="Subscription Plan"
        rules={[{ required: true, message: "Please select a plan" }]}
      >
        <Select>
          <Select.Option value="basic">Basic</Select.Option>
          <Select.Option value="pro">Pro</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="isActive" label="Status" valuePropName="checked">
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default OrganizationForm;
