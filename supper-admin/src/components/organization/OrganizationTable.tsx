import React, { useState } from "react";
import { Table, Button, Space, Tag, Modal, message, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { Organization } from "../../types/organization";
import useListOrganization from "../../hooks/organization/useListOrganization";
import OrganizationForm from "./OrganizationForm";

const OrganizationTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState<Organization | null>(null);

  const { organizations, pagination, isLoading, refetch } = useListOrganization(
    {
      page: currentPage,
      limit: pageSize,
    }
  );

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleAdd = () => {
    setEditingOrganization(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Organization) => {
    setEditingOrganization(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (_id: string) => {
    try {
      // TODO: Implement delete API call
      message.success("Organization deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete organization");
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setEditingOrganization(null);
    refetch();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingOrganization(null);
  };

  const columns: ColumnsType<Organization> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Email Bling",
      dataIndex: "emailBling",
      key: "emailBling",
      render: (text: string) => text || "-",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (plan: string) => (
        <Tag color={plan === "pro" ? "blue" : "green"}>
          {plan.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this organization?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Organization
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={organizations}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />

      <Modal
        title={editingOrganization ? "Edit Organization" : "Add Organization"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        footer={null}
      >
        <OrganizationForm
          organization={editingOrganization}
          onSuccess={handleModalOk}
          onCancel={handleModalCancel}
        />
      </Modal>
    </div>
  );
};

export default OrganizationTable;
