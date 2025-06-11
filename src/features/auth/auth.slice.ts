/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticateUser } from "./auth.api";
import { CONSTANTS, STATUS } from "../../lib/constants";
import type { IAuthUser, SignInPayload } from "../../types/ auth.types";
import type { IAxiosError } from "../../types/error.types";
import { Utils } from "../../utils/utils";
import { Toast } from "../../components";
import type { AppState } from "../../store/store";
import { LocalStorage } from "../../utils/localstorage";

const initialState: IAuthUser = {
  authState: STATUS.IDEL,
  isAuthLoading: true,
  isUserLoggedIn: false,
  status: "",
};
export const signInAsync = createAsyncThunk(
  "auth/signin",
  async (payload: SignInPayload) => {
    try {
      const response = await authenticateUser(payload);
      return response;
    } catch (err: unknown) {
      const errorMessage = err as IAxiosError;
      const errMsg = Utils.handleError(errorMessage.response.data.message);
      Toast(errMsg, { type: "error" });
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state) => {
      return state;
    },
    updateIsLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
      state.isAuthLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.authState = STATUS.PENDING;
      })
      .addCase(signInAsync.rejected, (state, action: any) => {
        state.authState = STATUS.REJECTED;
        Toast(action?.payload?.message, { type: "error" });
      })
      .addCase(signInAsync.fulfilled, (state, action: any) => {
        const jwtAccessToken = action?.payload?.data?.access_token;
        state.authState = STATUS.FULFILLED;
        state.isUserLoggedIn = true;
        LocalStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY.JWT, jwtAccessToken);
        Toast(CONSTANTS.SUCCESS_MESSAGE.SIGNIN, { type: "success" });
      });
  },
});

export default authSlice.reducer;
export const authState = (state: AppState) => state;
export const authAction = authSlice.actions;
