import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);

  // User context to know if the user is already premium
  const { isPremium, loading, setIsPremium } = useUser();
  const navigate = useNavigate();

  // If user is already premium, don't let them stay on checkout
  useEffect(() => {
    if (!loading && isPremium) {
      navigate("/dashboard");
    }
  }, [isPremium, loading, navigate]);

  const openCheckout = async () => {
    if (!window.Razorpay) {
      alert("Payment gateway not loaded yet. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount: 49 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { order } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Finance Guru",
        description: "Premium subscription",
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5000/api/payment/verify-payment",
              response,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            // Mark user as premium in frontend state so ChatBot opens directly
            setIsPremium(true);

            alert("Payment successful — premium unlocked!");

            // Redirect them back to the main experience
            navigate("/dashboard");
          } catch (err) {
            console.error(err);
            alert("Payment verification failed. Please contact support.");
          }
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // While we are checking whether the user is premium, avoid flicker
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-950 text-white">
        <span className="text-sm text-slate-200">Checking your plan...</span>
      </div>
    );
  }

  // If the user is premium, we immediately navigate away in useEffect,
  // but returning null here avoids rendering the pay UI for a frame.
  if (isPremium) {
    return null;
  }

  const perks = [
    "Unlimited expense entries & exports",
    "Smart AI spending insights",
    "Category-level alerts & reminders",
    "Priority chat & email support",
  ];

  const locked = [
    "AI-powered savings suggestions",
    "Unlimited receipt uploads",
    "Custom categories & tags",
    "Early access to new features",
  ];

  return (
    <div className="h-full w-full relative bg-gradient-to-br from-slate-950 via-slate-900 via-purple-950/20 to-slate-950 text-white overflow-y-auto">
      {/* Animated background elements - fixed position */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-full px-4 py-12 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/5 p-8 md:p-10 shadow-2xl shadow-purple-500/20 backdrop-blur-xl transition-all duration-300 hover:shadow-purple-500/30 hover:border-white/30">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 opacity-30 blur-3xl">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-500/50 to-purple-500/50 animate-pulse" />
            <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-indigo-400/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100 shadow-lg shadow-indigo-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                </span>
                Upgrade to premium
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent">
                You're on the free plan — unlock more with Premium
              </h1>
              <p className="max-w-2xl text-base text-slate-200/90 leading-relaxed">
                Keep tracking for free, or get unlimited exports, AI insights,
                and priority support. Payments are protected by Razorpay.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-slate-100 shadow-md hover:bg-white/15 transition-all duration-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  3D secure checkout
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-slate-100 shadow-md hover:bg-white/15 transition-all duration-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Cancel anytime
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-slate-100 shadow-md hover:bg-white/15 transition-all duration-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  GST invoice
                </span>
              </div>
            </div>
            <div className="min-w-[260px] rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-5 text-right shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-105">
              <p className="text-sm font-medium text-indigo-100 mb-1">Premium</p>
              <p className="text-5xl font-bold text-white leading-none">
                ₹49
                <span className="text-lg font-semibold text-indigo-100/90">
                  {" "}/ mo
                </span>
              </p>
              <p className="mt-2 text-xs text-indigo-100/80 font-medium">
                Limited-time intro pricing
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          {/* Features List */}
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/5 p-6 md:p-7 shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-white/30">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold text-white">What you get</h2>
              <span className="rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 backdrop-blur-sm border border-emerald-400/30 px-4 py-1.5 text-xs font-semibold text-emerald-200 shadow-md">
                Included in Premium
              </span>
            </div>
            <ul className="space-y-3">
              {perks.map((perk, index) => (
                <li
                  key={perk}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3.5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="mt-0.5 relative flex h-3 w-3 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                  </span>
                  <span className="text-sm font-medium text-slate-100 leading-relaxed">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Card & Locked Features */}
          <div className="flex flex-col gap-5">
            {/* Payment Card */}
            <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/5 p-6 md:p-7 shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-white/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-300/90 mb-1">Unlock Premium</p>
                  <p className="text-3xl font-bold text-white">₹49 / mo</p>
                </div>
                <span className="rounded-full bg-gradient-to-r from-orange-500/20 to-orange-400/20 backdrop-blur-sm border border-orange-400/30 px-3 py-1.5 text-xs font-semibold text-orange-200 shadow-md">
                  Limited-time
                </span>
              </div>
              <p className="text-sm text-slate-200/80 mb-6 leading-relaxed">
                Secure checkout via Razorpay. No hidden fees.
              </p>
              <button
                onClick={openCheckout}
                disabled={isProcessing}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-4 text-base font-bold text-white shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:shadow-purple-500/60 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Opening payment...
                    </>
                  ) : (
                    <>
                      <span>Pay ₹49 to unlock</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
              <p className="mt-4 text-center text-xs text-slate-300/70 font-medium">
                Powered by Razorpay • 3D secure enabled
              </p>
            </div>

            {/* Locked Features */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 via-black/30 to-black/40 p-5 md:p-6 text-sm shadow-inner shadow-black/50 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-white text-base">Currently locked</h3>
                <span className="rounded-full bg-slate-700/50 border border-slate-600/50 px-3 py-1 text-xs font-semibold text-slate-300">Free plan</span>
              </div>
              <ul className="space-y-2.5">
                {locked.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-sm px-3.5 py-2.5 text-slate-300/90 transition-all duration-200 hover:bg-white/10 hover:border-white/10"
                  >
                    <span className="text-base flex-shrink-0">🔒</span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Card */}
            <div className="rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/15 p-5 backdrop-blur-sm text-sm shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:shadow-indigo-900/40 hover:border-indigo-400/40">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold text-white text-base">Need help?</span>
                <span className="text-indigo-100/90 leading-relaxed">
                  Priority chat & email support is included with Premium.
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}