export interface UserDTO {
  id: string;
  email: string;
  authProvider: 'local' | 'google' | 'github';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  email: string;
  password?: string;
  authProvider?: 'local' | 'google' | 'github';
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: UserDTO;
}
