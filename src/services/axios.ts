import axios from "axios";
import { CONSTANTS, ROUTING } from "../lib/constants";
import { LocalStorage } from "../utils/localstorage";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const noAuthRoutes = [ROUTING.SIGNIN];

axiosInstance.interceptors.request.use(
  (config) => {
    const isNoAuthRoute = noAuthRoutes.some((route) =>
      config.url?.startsWith(route)
    );
    if (!isNoAuthRoute) {
      const accessToken = LocalStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY.JWT);
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      if (config.data instanceof FormData) {
        config.headers = config.headers || {};
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers = config.headers || {};
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
