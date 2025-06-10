import CryptoJS from "crypto-js";
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

export const encryptPassword = (password: string): string => {
  const secretKey = import.meta.env.VITE_PUBLIC_PASSWORD_ENCODED_KEY;

  const iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
  const encrypted = CryptoJS.AES.encrypt(
    password,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

export interface SessionData {
  accessToken: string;
}
export const getUserSessionData = (): SessionData => {
  const userSession = LocalStorage.getItem(LOCAL_STORAGE_KEY.USER_SESSION);
  const sessionData: SessionData = userSession ? JSON.parse(userSession) : {};
  return sessionData;
};
