export interface User {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface UserRegisterForm {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface UserLoginForm {
  email: string;
  password: string;
}
