import type { LoginRequest, LoginResponse } from "../types/auth";
import { BaseAPIService } from "./index";
import { PATH_API } from "../constants/pathApi";

class AuthService extends BaseAPIService {
  constructor() {
    super();
  }

  login(data: LoginRequest): Promise<LoginResponse> {
    return this.instance.post(PATH_API.LOGIN, data);
  }
}

export default new AuthService();
