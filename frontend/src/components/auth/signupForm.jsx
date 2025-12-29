"use client";
import React, { useState } from "react";
import { Input} from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { cn } from "../../../lib/utils.js";
import { IconBrandGoogle } from "@tabler/icons-react";
import { auth, googleProvider } from "../../firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      const token = await user.getIdToken();

      const res = await axios.post(
        `${API_URL}api/auth/signup`,
        { token }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          token,
          uid: user.uid,
          email: user.email,
          name: res.data.user?.name || user.displayName || "",
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      let errorMessage = "Signup failed. Please try again.";
      
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please login instead.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      // Try login first (in case user already exists)
      let res;
      try {
        res = await axios.post(`${API_URL}api/auth/login`, { token });
      } catch (loginErr) {
        // If login fails, try signup
        if (loginErr.response?.status === 404) {
          res = await axios.post(`${API_URL}api/auth/signup`, { token });
        } else {
          throw loginErr;
        }
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          token,
          uid: user.uid,
          email: user.email,
          name: res.data.user?.name || user.displayName || "",
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Google signup error:", err);
      if (err.code !== "auth/popup-closed-by-user") {
        alert(err.response?.data?.error || err.message || "Google signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Finance-Guru
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Create an account
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          
         
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" 
          placeholder="E-mail" 
          type="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" 
          placeholder="••••••••" 
          type="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
        </LabelInputContainer>
        

        <button
          className="group/btn relative block h-11 sm:h-12 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up &rarr;"}
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          
          <button
            onClick={handleGoogle}
            className="group/btn shadow-input relative flex h-11 sm:h-12 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
            type="button"
            disabled={loading}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {loading ? "Connecting..." : "Continue with Google"}
            </span>
            <BottomGradient />
          </button>
         
        </div>
         <p className="text-center text-sm mt-4 text-neutral-600 dark:text-neutral-300">
          Already have an account?{" "}
          <a href="/" className="underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
