export interface IAuth {
  token: any;
  name: string;
  email: string;
  _id: string;
  registerStatus: string;
  registerError: any | string;
  loginStatus: string;
  loginError: any | string;
  userLoaded: boolean;
}
