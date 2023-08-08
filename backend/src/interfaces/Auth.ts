export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
}
