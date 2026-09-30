"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Privacy Protected",
    text: "Personal information is detected and protected before analysis.",
  },
  {
    icon: Brain,
    title: "AI Explanation",
    text: "Complex laboratory terminology becomes easier to understand.",
  },
  {
    icon: BarChart3,
    title: "Visual Insights",
    text: "See your results through clear visual indicators and charts.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Ready",
    text: "Prepare meaningful questions before your consultation.",
  },
];

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Report",
    text: "Upload your laboratory report as a PDF or image.",
  },
  {
    number: "02",
    icon: LockKeyhole,
    title: "Privacy Shield",
    text: "Personal identifiers are detected and protected.",
  },
  {
    number: "03",
    icon: Brain,
    title: "AI Extraction",
    text: "Biomarkers, values and reference ranges are extracted.",
  },
  {
    number: "04",
    icon: Stethoscope,
    title: "Doctor Guide",
    text: "Get useful questions to discuss with your doctor.",
  },
];

const biomarkers = [
  {
    name: "Hemoglobin",
    value: "12.4",
    unit: "g/dL",
    status: "Below range",
    type: "warning",
  },
  {
    name: "White Blood Cells",
    value: "7,800",
    unit: "/µL",
    status: "Normal",
    type: "success",
  },
  {
    name: "Platelets",
    value: "180,000",
    unit: "/µL",
    status: "Normal",
    type: "success",
  },
  {
    name: "HbA1c",
    value: "5.8",
    unit: "%",
    status: "Discuss",
    type: "attention",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f5f9fd] text-[#10233f]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="fixed inset-x-0 top-0 z-[100] border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">

        <div className="relative z-[101] mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6">

          {/* LOGO */}

          <Link href="/" className="flex items-center gap-3">

            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
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

          {/* NAVIGATION */}

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-slate-600 lg:flex">

            <Link href="/" className="text-[#1264e8]">
              Home
            </Link>

            <Link
              href="#features"
              className="transition-colors hover:text-[#1264e8]"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="transition-colors hover:text-[#1264e8]"
            >
              How It Works
            </Link>

            <Link
              href="#about"
              className="transition-colors hover:text-[#1264e8]"
            >
              About
            </Link>

            <Link
              href="#faq"
              className="transition-colors hover:text-[#1264e8]"
            >
              FAQ
            </Link>

          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">

           <Link
  href="/login"
  prefetch={true}
  className="relative z-50 hidden cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:text-[#1264e8] hover:shadow-md sm:block"
>
  Login
</Link>

            <Link
              href="/upload"
              className="group flex items-center gap-2 rounded-xl bg-[#1264e8] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
            >
              Get Started

              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="heksaa-gradient relative min-h-[760px] overflow-hidden pt-[76px]">

        <div className="pointer-events-none absolute -right-40 top-10 h-[550px] w-[550px] rounded-full bg-blue-100/50 blur-3xl" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="heksaa-grid absolute inset-0 opacity-50" />

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-[11px] font-semibold text-[#1264e8] shadow-sm"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              AI POWERED
              <span className="text-slate-300">•</span>
              SECURE
              <span className="text-slate-300">•</span>
              DOCTOR READY
            </motion.div>

            <h1 className="max-w-[650px] font-[var(--font-jakarta)] text-[48px] font-bold leading-[1.05] tracking-[-0.045em] text-[#10233f] sm:text-[58px] lg:text-[62px]">
              Understand Your
              <span className="block text-[#1264e8]">
                Medical Reports.
              </span>
            </h1>

            <p className="mt-7 max-w-[570px] text-[16px] leading-8 text-slate-500 sm:text-[18px]">
              Turn complex laboratory reports into clear, understandable
              information and prepare meaningful questions for your doctor.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                href="/upload"
                className="group flex items-center gap-3 rounded-xl bg-[#1264e8] px-6 py-3.5 text-[13px] font-semibold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-1 hover:bg-[#0958d5]"
              >
                Analyze a Report

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#how-it-works"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-200"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[10px] text-[#1264e8]">
                  ▶
                </span>

                See How It Works
              </Link>

            </div>

            <div className="mt-7 flex items-center gap-2 text-[11px] text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-500" />

              Informational tool — not a medical diagnosis
            </div>

          </motion.div>

          {/* RIGHT VISUAL */}

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >

            {/* CONFIDENCE CARD */}

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-1 -top-8 z-30 rounded-2xl border border-white bg-white px-5 py-4 shadow-xl sm:-right-4"
            >

              <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                AI Confidence
              </div>

              <div className="mt-2 flex items-center gap-2">

                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "96%" }}
                    transition={{ delay: 1, duration: 1.3 }}
                    className="h-full rounded-full bg-emerald-500"
                  />

                </div>

                <span className="text-[13px] font-bold text-emerald-600">
                  96%
                </span>

              </div>

            </motion.div>

            {/* REPORT VISUAL */}

            <div className="relative mx-auto max-w-[570px]">

              <div className="absolute inset-5 rounded-[38px] bg-blue-200/50 blur-3xl" />

              <div className="relative min-h-[520px] overflow-hidden rounded-[38px] border border-white bg-gradient-to-br from-[#eaf5ff] via-white to-[#dcefff] p-5 shadow-[0_35px_90px_rgba(25,75,130,0.15)]">

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-blue-100/70" />

                <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border-[45px] border-cyan-100/50" />

                <div className="absolute right-10 top-10 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_20px_#1264e8]" />

                <div className="absolute bottom-24 left-12 h-2 w-2 rounded-full bg-cyan-400" />

                {/* REPORT */}

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-[7%] top-[8%] w-[86%] rounded-[25px] border border-white bg-white/95 p-6 shadow-2xl backdrop-blur"
                >

                  <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                    <div>

                      <div className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Laboratory Report
                      </div>

                      <div className="mt-1 font-[var(--font-jakarta)] text-[17px] font-bold">
                        Complete Blood Count
                      </div>

                    </div>

                    <div className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[8px] font-bold text-emerald-600">
                      VERIFIED
                    </div>

                  </div>

                  <div className="mt-5 space-y-2.5">

                    {biomarkers.map((item, index) => (

                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.12,
                        }}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                      >

                        <div>

                          <div className="text-[11px] font-semibold">
                            {item.name}
                          </div>

                          <div className="mt-0.5 text-[8px] text-slate-400">
                            Reference range available
                          </div>

                        </div>

                        <div className="text-right">

                          <div className="text-[12px] font-bold">
                            {item.value}

                            <span className="ml-1 text-[8px] font-medium text-slate-400">
                              {item.unit}
                            </span>
                          </div>

                          <div
                            className={`mt-0.5 text-[8px] font-bold ${
                              item.type === "success"
                                ? "text-emerald-500"
                                : item.type === "warning"
                                  ? "text-amber-500"
                                  : "text-orange-500"
                            }`}
                          >
                            {item.status}
                          </div>

                        </div>

                      </motion.div>

                    ))}

                  </div>

                  {/* EXPLANATION */}

                  <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                    <div className="flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#1264e8] shadow-sm">
                        <Sparkles size={14} />
                      </div>

                      <div className="text-[10px] font-bold">
                        Plain-Language Explanation
                      </div>

                    </div>

                    <p className="mt-2 text-[9px] leading-4 text-slate-500">
                      Your result is outside the reference range displayed
                      on this report. Laboratory results should be interpreted
                      together with your medical history and discussed with
                      your doctor.
                    </p>

                  </div>

                </motion.div>

                {/* FLOATING BIOMARKER CARD */}

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-7 right-5 z-20 rounded-2xl border border-white bg-white px-5 py-4 shadow-xl"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#1264e8]">
                      <BarChart3 size={17} />
                    </div>

                    <div>

                      <div className="text-[8px] font-semibold uppercase tracking-wider text-slate-400">
                        Biomarkers
                      </div>

                      <div className="text-[16px] font-bold">
                        18
                      </div>

                    </div>

                  </div>

                </motion.div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="border-y border-slate-100 bg-white"
      >

        <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className="border-r border-slate-100 p-7 last:border-r-0"
              >

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#1264e8]">
                  <Icon size={19} />
                </div>

                <h3 className="font-[var(--font-jakarta)] text-[14px] font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-slate-400">
                  {feature.text}
                </p>

              </motion.div>
            );

          })}

        </div>

      </section>

      {/* STATS */}

      <section className="bg-[#10233f] py-12">

        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-8 px-6 md:grid-cols-4">

          {[
            ["95%+", "Target OCR Accuracy"],
            ["PII", "Privacy Protection"],
            ["18+", "Biomarkers"],
            ["5", "Doctor Questions"],
          ].map(([number, label], index) => (

            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >

              <div className="font-[var(--font-jakarta)] text-3xl font-bold text-white">
                {number}
              </div>

              <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-200">
                {label}
              </div>

            </motion.div>

          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section
        id="how-it-works"
        className="relative py-24"
      >

        <div className="mx-auto max-w-[1150px] px-6">

          <div className="mx-auto max-w-2xl text-center">

            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#1264e8]">
              SIMPLE BY DESIGN
            </div>

            <h2 className="mt-4 font-[var(--font-jakarta)] text-3xl font-bold tracking-tight sm:text-4xl">
              From report to understanding
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              A guided workflow designed around clarity, privacy and
              meaningful doctor conversations.
            </p>

          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-4">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -7 }}
                  className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1264e8]">
                    <Icon size={19} />
                  </div>

                  <div className="mt-5 text-[9px] font-bold tracking-widest text-blue-300">
                    STEP {step.number}
                  </div>

                  <h3 className="mt-2 font-[var(--font-jakarta)] text-[16px] font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-6 text-slate-400">
                    {step.text}
                  </p>

                </motion.div>
              );

            })}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section id="about" className="px-6 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-[1150px] overflow-hidden rounded-[32px] bg-[#1264e8] px-8 py-16 text-center text-white shadow-2xl shadow-blue-200 md:px-20"
        >

          <div className="mx-auto max-w-2xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Stethoscope size={25} />
            </div>

            <h2 className="mt-6 font-[var(--font-jakarta)] text-3xl font-bold sm:text-4xl">
              Make your next doctor visit more informed.
            </h2>

            <p className="mt-5 text-sm leading-7 text-blue-100">
              Upload a laboratory report and turn complicated numbers into
              understandable information and useful questions.
            </p>

            <Link
              href="/upload"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-[13px] font-bold text-[#1264e8] shadow-xl transition hover:-translate-y-1"
            >
              Analyze Your Report
              <ArrowRight size={16} />
            </Link>

          </div>

        </motion.div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-100 bg-white">

        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="font-[var(--font-jakarta)] text-[17px] font-bold">
              HEK<span className="text-[#1264e8]">SAA</span>
            </div>

            <p className="mt-2 text-[10px] text-slate-400">
              AI-powered medical report intelligence.
            </p>

          </div>

          <div className="flex flex-wrap gap-5 text-[10px] text-slate-400">

            <Link href="/privacy" className="hover:text-[#1264e8]">
              Privacy
            </Link>

            <Link href="#how-it-works" className="hover:text-[#1264e8]">
              How It Works
            </Link>

            <Link href="#about" className="hover:text-[#1264e8]">
              About
            </Link>

          </div>

          <div className="text-[10px] text-slate-400">
            © 2026 HEKSAA · Informational tool, not medical diagnosis.
          </div>

        </div>

      </footer>

    </main>
  );
}