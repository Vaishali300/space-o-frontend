import { ErrorMessage, Form, Formik, type FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import * as Yup from "yup";
import { signInAsync } from "./auth.slice";
import {
  useAppDispatch,
  useAppSelector,
  type AppState,
} from "../../store/store";
import { STATUS } from "../../lib/constants";
import type { SignInPayload } from "../../types/ auth.types";
import { encryptPassword } from "../../utils/utils";
import { Button, Input, Label } from "../../components";
export const LOGIN_TEXTS = {
  header: "Sign in to Admin",
  subHeader:
    "To access your admin account and continue with KGO, please enter your credentials.",
  email: {
    label: "Email*",
    placeholder: "Enter your email here",
    error: "Please enter a valid email address!",
  },
  password: {
    label: "Password*",
    placeholder: "Type your password here",
    error: "Please enter a valid password!",
  },
  forgotPassword: "Forgot Password?",
  signInButton: "Sign In",
};

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { authState } = useAppSelector((state: AppState) => state.auth);

  useEffect(() => {
    setIsLoading(authState === STATUS.PENDING);
  }, [authState]);

  const initialValues: SignInPayload = {
    emailAddress: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .email(LOGIN_TEXTS.email.error)
      .trim()
      .required(LOGIN_TEXTS.email.error),
    password: Yup.string().trim().required(LOGIN_TEXTS.password.error).trim(),
  });

  const handleLogin = async (
    values: SignInPayload,
    { resetForm }: FormikHelpers<SignInPayload>
  ) => {
    const encrptedPassword = encryptPassword(values.password);
    const payload: SignInPayload = {
      emailAddress: values.emailAddress,
      password: encrptedPassword,
    };

    try {
      const response = await dispatch(signInAsync(payload));
      const result = response.payload as { success: boolean };
      if (result.success) {
        resetForm();
      }
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };
  const isDisable = (
    isInvalid: boolean,
    values: { emailAddress: string; password: string },
    isLoading: boolean
  ): boolean => {
    return !isInvalid || !values.emailAddress || !values.password || isLoading;
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center font-open-sans text-2xl/9 font-bold tracking-tight text-primary sm:text-3xl/9">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              errors,
              touched,
              setValues,
              handleBlur,
              handleSubmit,
              values,
              isValid,
            }) => (
              <Form
                className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-lg bg-white"
                onSubmit={handleSubmit}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="font-open-sans">Email address</Label>
                  </div>

                  <div className="mt-2">
                    <Input
                      name="emailAddress"
                      placeholder={LOGIN_TEXTS.email.placeholder}
                      type="text"
                      onChange={(e) => {
                        setValues({ ...values, emailAddress: e.target.value });
                      }}
                      handelBlur={handleBlur}
                      error={!!(touched.emailAddress && errors.emailAddress)}
                      value={values.emailAddress}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                    />
                    <ErrorMessage
                      name="emailAddress"
                      component="div"
                      className="text-red-600 font-medium text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <Label className="font-open-sans">Password</Label>
                  </div>
                  <div className="mt-2 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={LOGIN_TEXTS.password.placeholder}
                      onChange={(e) => {
                        setValues({ ...values, password: e.target.value });
                      }}
                      handelBlur={handleBlur}
                      error={!!(touched.password && errors.password)}
                      value={values.password}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        style={{ width: "20px" }}
                        color="grey"
                      />
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 font-medium text-sm mt-1"
                  />
                </div>

                <div>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isDisable(isValid, values, isLoading)}
                    className="bg-[#8e002e] flex w-full mt-7 font-[600] text-[16px] cursor-pointer justify-center rounded-md  text-sm/6 font-open-sans text-white shadow-xs "
                  >
                    {isLoading ? "Loading..." : LOGIN_TEXTS.signInButton}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
