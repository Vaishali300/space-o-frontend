export const getImagePath = (filename: string) => `/src/assets/${filename}`;

export const ROUTING = {
  EVENT: "/events",
  SIGNIN: "/signIn",
  FORGOT_PASSWORD: "forgotPassword",
  RESET_PASSWORD: "/reset-password",
  USER: "/user",
};

export const API_ENDPOINTS = {
  SIGN_IN: "/auth/admin/login",
  CATEGORIES: "/category/list",
  GET_RECIPES: "recipe/list",
  ADD_RECIPE: "recipe/create",
};
export const SIDEBAR_ITEMS = [
  {
    id: 1,
    label: "recipe",
    path: "/recipe",
    isDiabled: false,
  },
  {
    id: 2,
    label: "user",
    path: "/user",
    isDiabled: false,
  },
];

export const CONSTANTS = {
  SUCCESS_MESSAGE: {
    SIGNIN: "Successfully Signed In",
    LOGOUT: "Successfully Logout",
  },
  ERROR_MESSAGE: {
    REQUIRED: "This field is required!",
    SIGNIN: "Invalid login credential",
  },
  LOCAL_STORAGE_KEY: {
    USER: "user",
    JWT: "accessToken",
  },
  REGEX: {
    PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  },
};

export const STATUS = {
  IDEL: "idle",
  LOADING: "loading",
  FAILED: "failed",
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
} as const;

export type STATUS = (typeof STATUS)[keyof typeof STATUS];

export const LOCAL_STORAGE_KEY = {
  USER_SESSION: "UserSession",
  TEST_SCENARIO: "scenarios",
};
