import type { UserInfoResponse } from "../types/auth";
import { BaseAPIService } from "./index";
import { PATH_API } from "../constants/pathApi";

class UserService extends BaseAPIService {
  constructor() {
    super();
  }

  getUserInfo(): Promise<UserInfoResponse> {
    return this.instance.get(PATH_API.USER_INFO);
  }
}

export default new UserService();
