import React from "react";
import { SignupForm } from "../components/auth/signupForm.jsx";

export default function Signup() {
  return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">

      <SignupForm />
    </div>
  );
}
