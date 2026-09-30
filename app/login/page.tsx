"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f9fd] text-[#10233f]">

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/70 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-100/60 blur-3xl" />

      </div>

      {/* HEADER */}

      <header className="relative z-20 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">

        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6">

          <Link href="/" className="flex items-center gap-3">

            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: 5,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1264e8] text-white shadow-lg shadow-blue-200"
            >
              <Activity size={21} strokeWidth={2.5} />
            </motion.div>

            <div>

              <div className="font-[var(--font-jakarta)] text-[19px] font-bold tracking-tight">
                HEK<span className="text-[#1264e8]">SAA</span>
              </div>

              <div className="text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Medical Intelligence
              </div>

            </div>

          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-[12px] font-medium text-slate-500 transition hover:text-[#1264e8]"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>

        </div>

      </header>

      {/* CONTENT */}

      <section className="relative flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-12">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative z-10 w-full max-w-[460px]"
        >

          {/* ICON */}

          <div className="mb-6 text-center">

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.4,
              }}
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1264e8]"
            >
              <ShieldCheck size={23} />
            </motion.div>

            <h1 className="mt-5 font-[var(--font-jakarta)] text-3xl font-bold tracking-tight">
              {mode === "login"
                ? "Welcome Back"
                : "Create Your Account"}
            </h1>

            <p className="mt-2 text-[13px] text-slate-400">
              {mode === "login"
                ? "Continue to understand your medical reports."
                : "Create your secure HEKSAA account."}
            </p>

          </div>

          {/* CARD */}

          <div className="rounded-[28px] border border-white bg-white p-6 shadow-[0_30px_80px_rgba(25,75,130,0.12)] sm:p-8">

            {/* MODE SWITCH */}

            <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-50 p-1">

              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-lg py-2.5 text-[12px] font-semibold transition ${
                  mode === "login"
                    ? "bg-white text-[#1264e8] shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`rounded-lg py-2.5 text-[12px] font-semibold transition ${
                  mode === "signup"
                    ? "bg-white text-[#1264e8] shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Create Account
              </button>

            </div>

            <AnimatePresence mode="wait">

              <motion.div
                key={mode}
                initial={{
                  opacity: 0,
                  x: mode === "login" ? -10 : 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: mode === "login" ? 10 : -10,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                {/* NAME */}

                {mode === "signup" && (
                  <div className="mb-5">

                    <label className="mb-2 block text-[11px] font-semibold text-slate-600">
                      Full name
                    </label>

                    <div className="relative">

                      <UserRound
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                      />

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-[13px] outline-none transition placeholder:text-slate-300 focus:border-[#1264e8] focus:ring-4 focus:ring-blue-50"
                      />

                    </div>

                  </div>
                )}

                {/* EMAIL */}

                <div className="mb-5">

                  <label className="mb-2 block text-[11px] font-semibold text-slate-600">
                    Email address
                  </label>

                  <div className="relative">

                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-[13px] outline-none transition placeholder:text-slate-300 focus:border-[#1264e8] focus:ring-4 focus:ring-blue-50"
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div className="mb-4">

                  <label className="mb-2 block text-[11px] font-semibold text-slate-600">
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-[13px] outline-none transition placeholder:text-slate-300 focus:border-[#1264e8] focus:ring-4 focus:ring-blue-50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-[#1264e8]"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                  </div>

                </div>

                {/* REMEMBER */}

                {mode === "login" && (
                  <div className="mb-6 flex items-center justify-between">

                    <button
                      type="button"
                      onClick={() => setRemember(!remember)}
                      className="flex items-center gap-2 text-[11px] text-slate-500"
                    >

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          remember
                            ? "border-[#1264e8] bg-[#1264e8] text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {remember && <Check size={11} />}
                      </span>

                      Remember me

                    </button>

                    <button
                      type="button"
                      className="text-[11px] font-semibold text-[#1264e8]"
                    >
                      Forgot password?
                    </button>

                  </div>
                )}

                {/* SUBMIT */}

                <button
                  type="button"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1264e8] text-[13px] font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
                >

                  {mode === "login"
                    ? "Sign In"
                    : "Create Account"}

                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />

                </button>

                {/* DIVIDER */}

                <div className="my-6 flex items-center gap-3">

                  <div className="h-px flex-1 bg-slate-100" />

                  <span className="text-[10px] text-slate-300">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-slate-100" />

                </div>

                {/* GOOGLE */}

                <button
                  type="button"
                  className="mb-3 flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[12px] font-semibold text-slate-600 transition hover:border-blue-100 hover:bg-slate-50"
                >

                  <span className="font-bold text-[#4285F4]">
                    G
                  </span>

                  Continue with Google

                </button>

                {/* GITHUB */}

                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-[12px] font-semibold text-slate-600 transition hover:border-blue-100 hover:bg-slate-50"
                >

                  <span className="font-bold text-slate-800">
                    Git
                  </span>

                  Continue with GitHub

                </button>

              </motion.div>

            </AnimatePresence>

            {/* BOTTOM */}

            <div className="mt-7 text-center text-[10px] leading-5 text-slate-400">

              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-semibold text-[#1264e8]"
                  >
                    Create account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-semibold text-[#1264e8]"
                  >
                    Sign in
                  </button>
                </>
              )}

            </div>

          </div>

          {/* SECURITY */}

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] text-slate-400">

            <ShieldCheck
              size={14}
              className="text-emerald-500"
            />

            Your account and medical information are designed with privacy in mind.

          </div>

        </motion.div>

      </section>

    </main>
  );
}