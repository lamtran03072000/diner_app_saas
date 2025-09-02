import type { LoginRequest, LoginResponse } from "../types/auth";
import { BaseAPIService } from "./index";
import { PATH_API } from "../constants/pathApi";

class OrganizationService extends BaseAPIService {
  constructor() {
    super();
  }
}

export default new OrganizationService();
