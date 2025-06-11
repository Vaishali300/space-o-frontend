import { LocalStorage } from "./localstorage";
import { LOCAL_STORAGE_KEY } from "../lib/constants";

export class Utils {
  public static addAsteriskSign = (value: string) => {
    return `${value}*`;
  };

  public static handleError = (error: string | string[]) => {
    return typeof error === "string" ? error : error[0];
  };
}

export interface SessionData {
  accessToken: string;
}
export const getUserSessionData = (): SessionData => {
  const userSession = LocalStorage.getItem(LOCAL_STORAGE_KEY.USER_SESSION);
  const sessionData: SessionData = userSession ? JSON.parse(userSession) : {};
  return sessionData;
};
