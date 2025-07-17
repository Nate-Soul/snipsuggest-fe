export interface User {
  email: string;
  username?: string;
  id?: number;
}

export interface UserCreate {
  id: number;
  username: string;
  email: string;
  verification_token: string;
  verification_expiry: string;
}

export interface UserLogin {
  access_token: string;
  token_type: string;
} 

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  favourite_genre_ids: number[];
  discovery_channels: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
}