export interface SignupData {
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

