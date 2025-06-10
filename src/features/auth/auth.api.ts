import { API_ENDPOINTS } from "../../lib/constants";
import { axiosInstance } from "../../services/axios";
import type { SignInPayload } from "../../types/ auth.types";

export const authenticateUser = async (payload: SignInPayload) => {
  const res = await axiosInstance({
    method: "post",
    url: API_ENDPOINTS.SIGN_IN,
    data: payload,
  });
  return res.data;
};
