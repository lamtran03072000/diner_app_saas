import { Card, Typography } from "antd";
import OrganizationTable from "../../components/organization/OrganizationTable";

const { Title } = Typography;

const OrganizationPage = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2} style={{ marginBottom: "24px" }}>
          Organizations Management
        </Title>
        <OrganizationTable />
      </Card>
    </div>
  );
};

export default OrganizationPage;
