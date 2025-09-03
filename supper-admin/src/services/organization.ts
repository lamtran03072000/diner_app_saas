import type {
  OrganizationsListResponse,
  CreateOrganizationRequest,
  Organization,
} from "../types/organization";
import { BaseAPIService } from "./index";
import { PATH_API } from "../constants/pathApi";

class OrganizationService extends BaseAPIService {
  constructor() {
    super();
  }

  async getOrganizations(
    page: number = 1,
    limit: number = 20
  ): Promise<OrganizationsListResponse> {
    return this.instance.get(PATH_API.ORGANIZATIONS, {
      params: { page, limit },
    });
  }

  async createOrganization(
    data: CreateOrganizationRequest
  ): Promise<Organization> {
    return this.instance.post(PATH_API.ORGANIZATIONS, data);
  }
}

export default new OrganizationService();
