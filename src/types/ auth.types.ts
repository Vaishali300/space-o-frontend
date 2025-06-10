import type { STATUS } from "../lib/constants";

export interface SignInPayload {
  emailAddress: string;
  password: string;
}

export interface IAuthUser {
  isUserLoggedIn: boolean;
  isAuthLoading: boolean;
  status: string;
  authState: STATUS;
}
