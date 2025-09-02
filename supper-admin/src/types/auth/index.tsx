export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface UserInfoResponse {
  id: string;
  email: string;
  role: string;
}
