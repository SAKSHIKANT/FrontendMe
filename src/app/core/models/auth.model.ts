export interface LoginRequest {
  username: string;
  password?: string;
}

export interface RegisterRequest {
  username: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  isCustomer?: boolean;
  isDistributor?: boolean;
}

export interface AuthResponse {
  status: number;
  message: string;
  token?: string;
}
