import React from "react";
import { LoginForm } from "../components/auth/loginForm.jsx";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-4">
      <LoginForm />
    </div>
  );
}
