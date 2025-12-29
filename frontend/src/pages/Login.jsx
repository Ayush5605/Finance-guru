import React from "react";
import { LoginForm } from "../components/auth/loginForm.jsx";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision.jsx";

export default function Login() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <BackgroundBeamsWithCollision 
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
      />
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
