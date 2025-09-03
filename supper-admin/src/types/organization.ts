export interface Organization {
  _id: string;
  name: string;
  emailBling?: string;
  plan: "pro" | "basic";
  isActive: boolean;
  createdAt: string;
  createdBy?: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface OrganizationsListResponse {
  data: Organization[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateOrganizationRequest {
  name: string;
  emailBling?: string;
  plan?: "pro" | "basic";
  isActive?: boolean;
}
