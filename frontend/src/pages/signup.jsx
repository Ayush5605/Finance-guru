import React from "react";
import { SignupForm } from "../components/auth/signupForm.jsx";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision.jsx";

export default function Signup() {
  return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
          <BackgroundBeamsWithCollision 
                     className="absolute inset-0 opacity-[0.5] pointer-events-none"
          />

      <SignupForm />
    </div>
  );
}
