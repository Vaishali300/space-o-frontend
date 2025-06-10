"use client";
import SignInForm from "./SignInForm";
import { getImagePath } from "../../lib/constants";

const SignIn = () => {
  return (
    <>
      <div className="flex  w-full p-15">
        <div className="w-1/2 flex items-center justify-center p-10">
          <img
            src={getImagePath("SignIn.png")}
            alt="login image"
            width={700}
            height={700}
            className="object-contain"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center ">
          <SignInForm />
        </div>
      </div>
    </>
  );
};

export default SignIn;
