"use client";

import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Check,
  Eye,
  HeartPulse,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  Brain,
  CircleCheck,
} from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Clarity",
    text: "Complex laboratory information should be easier to understand without removing the context that makes the information meaningful.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Accuracy",
    text: "The information shown to the user should remain connected to what is actually present in the uploaded report.",
    icon: CircleCheck,
  },
  {
    number: "03",
    title: "Privacy",
    text: "Medical documents can contain personal information, so privacy must be considered throughout the analysis experience.",
    icon: LockKeyhole,
  },
  {
    number: "04",
    title: "Human guidance",
    text: "The purpose is to help people have better conversations with healthcare professionals, not replace those conversations.",
    icon: MessageCircle,
  },
];

const safetyRules = [
  "Do not turn one laboratory result into a diagnosis.",
  "Do not invent values when information cannot be reliably extracted.",
  "Keep the laboratory's own reference interval visible.",
  "Separate extracted facts from AI-generated explanations.",
  "Encourage professional medical consultation when appropriate.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#10233f]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1264e8] shadow-lg shadow-blue-500/20">
              <Activity className="h-5 w-5 text-white" />
            </div>

            <div>
              <div className="font-[var(--font-jakarta)] text-lg font-extrabold tracking-tight">
                HEKSAA
              </div>

              <div className="font-[var(--font-inter)] text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Medical Intelligence
              </div>
            </div>
          </Link>

          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1264e8] px-5 py-2.5 font-[var(--font-inter)] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
          >
            Analyze a report
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#10233f]">

        <div className="absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">

          <div className="mx-auto max-w-5xl text-center">

            <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.25em] text-blue-300">
              About HEKSAA
            </p>

            <h1 className="mx-auto mt-6 max-w-5xl font-[var(--font-jakarta)] text-5xl font-extrabold leading-[1.03] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Making medical
              <br />
              information
              <br />
              <span className="text-blue-300">
                easier to understand.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl font-[var(--font-inter)] text-sm leading-7 text-slate-300 sm:text-base">
              HEKSAA is an AI-powered medical report intelligence concept
              designed around one simple idea: people should be able to
              understand what their report actually says before they walk
              into a doctor's consultation.
            </p>

            <div className="mt-9 flex justify-center">
              <Link
                href="/upload"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-[var(--font-inter)] text-xs font-bold text-[#1264e8] shadow-xl transition hover:-translate-y-0.5"
              >
                Explore HEKSAA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>


          {/* PHILOSOPHY */}

          <div className="mx-auto mt-20 max-w-3xl border-t border-white/10 pt-12 text-center">

            <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
              Our philosophy
            </p>

            <p className="mt-5 font-[var(--font-jakarta)] text-2xl font-bold leading-9 text-white sm:text-3xl">
              Explain the information.
              <br />
              Preserve the context.
              <br />
              Respect the doctor.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <HeartPulse className="h-4 w-4 text-blue-300" />
              </div>

              <span className="font-[var(--font-inter)] text-xs font-semibold text-slate-400">
                AI-assisted understanding
              </span>

            </div>

          </div>


          {/* STATS */}

          <div className="mt-20 grid border-t border-white/10 pt-7 sm:grid-cols-3">

            <HeroStat
              value="Understand"
              label="Complex report information"
            />

            <HeroStat
              value="Protect"
              label="Personal information"
            />

            <HeroStat
              value="Prepare"
              label="For better doctor conversations"
            />

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY WE BUILT IT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1264e8]">
            The idea
          </p>

          <h2 className="mt-4 font-[var(--font-jakarta)] text-4xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl">
            A medical report is data.
            <br />
            Understanding it is different.
          </h2>

          <p className="mt-6 font-[var(--font-inter)] text-sm leading-7 text-slate-500 sm:text-base">
            Laboratory reports can contain dozens of measurements,
            abbreviations, units and reference intervals. For someone
            without a medical background, the document can be difficult
            to navigate.
          </p>

          <p className="mt-5 font-[var(--font-inter)] text-sm leading-7 text-slate-500 sm:text-base">
            HEKSAA is designed to create a bridge between the original
            report and the person reading it. The system focuses on
            extracting what is actually written, organizing it clearly
            and explaining terminology in accessible language.
          </p>

        </div>


        {/* QUOTE */}

        <div className="mx-auto mt-12 max-w-3xl border-y border-slate-200 py-8 text-center">

          <p className="font-[var(--font-jakarta)] text-lg font-bold leading-8 text-[#10233f] sm:text-xl">
            The goal is not to make the user their own doctor.
            <br />
            The goal is to help them become a better-informed participant
            in their healthcare conversation.
          </p>

        </div>

      </section>


      {/* =====================================================
          PROBLEM → PURPOSE
      ===================================================== */}

      <section className="bg-[#f5f9fd]">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

          <div className="mx-auto max-w-2xl text-center">

            <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1264e8]">
              Why it matters
            </p>

            <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              From information overload to clarity.
            </h2>

          </div>


          <div className="mt-12 grid gap-5 lg:grid-cols-2">

            {/* PROBLEM */}

            <div className="rounded-[30px] border border-slate-200 bg-white p-7 sm:p-9">

              <div className="flex items-center justify-between">

                <span className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  The problem
                </span>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Brain className="h-5 w-5 text-slate-500" />
                </div>

              </div>

              <h3 className="mt-8 font-[var(--font-jakarta)] text-2xl font-extrabold">
                Reports can feel overwhelming.
              </h3>

              <p className="mt-4 font-[var(--font-inter)] text-sm leading-7 text-slate-500">
                Important information may be distributed across tables,
                abbreviations and laboratory-specific reference ranges.
              </p>

              <div className="mt-8 space-y-4">

                <ProblemItem text="Multiple tests on one document" />

                <ProblemItem text="Unfamiliar medical terminology" />

                <ProblemItem text="Different units and reference intervals" />

                <ProblemItem text="Difficulty knowing what to ask a doctor" />

              </div>

            </div>


            {/* PURPOSE */}

            <div className="relative overflow-hidden rounded-[30px] bg-[#1264e8] p-7 text-white sm:p-9">

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <span className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">
                    The purpose
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>

                </div>

                <h3 className="mt-8 font-[var(--font-jakarta)] text-2xl font-extrabold">
                  Turn complexity into clarity.
                </h3>

                <p className="mt-4 font-[var(--font-inter)] text-sm leading-7 text-blue-100">
                  HEKSAA organizes important information and gives the user
                  a clearer starting point for understanding and discussion.
                </p>

                <div className="mt-8 space-y-4">

                  <PurposeItem text="Structured report information" />

                  <PurposeItem text="Exact observed values and units" />

                  <PurposeItem text="Laboratory-specific reference intervals" />

                  <PurposeItem text="Questions to discuss with a doctor" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">

        <div className="mx-auto max-w-2xl text-center">

          <p className="font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1264e8]">
            What guides HEKSAA
          </p>

          <h2 className="mt-3 font-[var(--font-jakarta)] text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">
            Four principles.
          </h2>

          <p className="mt-5 font-[var(--font-inter)] text-sm leading-7 text-slate-500">
            These principles shape the product experience as we move from
            frontend prototype toward the real AI analysis system.
          </p>

        </div>


        <div className="mt-12 grid gap-px overflow-hidden rounded-[30px] border border-slate-200 bg-slate-200 md:grid-cols-2">

          {principles.map((principle) => {

            const Icon = principle.icon;

            return (
              <div
                key={principle.number}
                className="bg-white p-7 transition hover:bg-[#f8fbff] sm:p-9"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="h-5 w-5 text-[#1264e8]" />
                  </div>

                  <span className="font-[var(--font-jakarta)] text-4xl font-extrabold text-slate-100">
                    {principle.number}
                  </span>

                </div>

                <h3 className="mt-8 font-[var(--font-jakarta)] text-xl font-extrabold">
                  {principle.title}
                </h3>

                <p className="mt-3 max-w-md font-[var(--font-inter)] text-sm leading-7 text-slate-500">
                  {principle.text}
                </p>

              </div>
            );

          })}

        </div>

      </section>


      {/* =====================================================
          SAFETY
      ===================================================== */}

      <section className="bg-[#10233f]">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck className="h-6 w-6 text-blue-300" />
            </div>

            <p className="mt-7 font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
              AI safety philosophy
            </p>

            <h2 className="mt-3 font-[var(--font-jakarta)] text-4xl font-extrabold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
              Helpful AI needs
              <br />
              clear boundaries.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl font-[var(--font-inter)] text-sm leading-7 text-slate-300">
              Medical information requires a different standard from
              ordinary conversational AI. HEKSAA is therefore designed
              with explicit safety boundaries.
            </p>

          </div>


          <div className="mx-auto mt-12 max-w-3xl">

            {safetyRules.map((rule, index) => (

              <div
                key={rule}
                className="flex items-start gap-5 border-b border-white/10 py-5 first:pt-0 last:border-0"
              >

                <span className="font-[var(--font-jakarta)] text-sm font-extrabold text-blue-300">
                  0{index + 1}
                </span>

                <p className="font-[var(--font-inter)] text-sm leading-6 text-slate-200">
                  {rule}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PRIVACY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
            <LockKeyhole className="h-6 w-6 text-emerald-600" />
          </div>

          <p className="mt-6 font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            Privacy matters
          </p>

          <h2 className="mt-3 font-[var(--font-jakarta)] text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">
            A medical report is personal.
          </h2>

          <p className="mt-5 font-[var(--font-inter)] text-sm leading-7 text-slate-500 sm:text-base">
            HEKSAA includes a dedicated Privacy Shield concept because
            reports may contain names, dates, contact information and
            other identifying details alongside laboratory results.
          </p>

        </div>


        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">

          <TrustCard
            icon={UserRound}
            title="Personal information"
            text="Identify information associated with the person."
          />

          <TrustCard
            icon={LockKeyhole}
            title="Privacy Shield"
            text="Prepare information for privacy-aware processing."
          />

          <TrustCard
            icon={ShieldCheck}
            title="Safety layer"
            text="Separate report explanation from medical diagnosis."
          />

          <TrustCard
            icon={Stethoscope}
            title="Doctor connection"
            text="Guide users toward professional consultation."
          />

        </div>

      </section>


      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      <section className="border-y border-amber-200 bg-amber-50">

        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-20">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <AlertTriangle className="h-7 w-7 text-amber-600" />
          </div>

          <p className="mt-7 font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">
            Medical disclaimer
          </p>

          <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-extrabold sm:text-4xl">
            HEKSAA is an information tool,
            <br />
            not a medical professional.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl font-[var(--font-inter)] text-sm leading-7 text-amber-900/70">
            Information provided through HEKSAA is intended for educational
            and report-understanding purposes. It should not be used as a
            substitute for professional medical advice, diagnosis or
            treatment. Users should discuss their medical results and
            concerns with a qualified healthcare professional.
          </p>

        </div>

      </section>


      {/* =====================================================
          VISION
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#f5f9fd]">

        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Sparkles className="h-7 w-7 text-[#1264e8]" />
          </div>

          <p className="mt-7 font-[var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#1264e8]">
            Our vision
          </p>

          <h2 className="mt-3 font-[var(--font-jakarta)] text-4xl font-extrabold leading-tight tracking-[-0.05em] sm:text-5xl">
            Better understanding.
            <br />
            Better questions.
            <br />
            Better conversations.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-[var(--font-inter)] text-sm leading-7 text-slate-500">
            HEKSAA aims to give people a clearer starting point when
            reading their medical reports while keeping professional
            healthcare guidance at the center of the experience.
          </p>

          <div className="mt-8 flex justify-center">

            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1264e8] px-6 py-3.5 font-[var(--font-inter)] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
            >
              Analyze a report
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1264e8]">
              <Activity className="h-4 w-4 text-white" />
            </div>

            <div>

              <p className="font-[var(--font-jakarta)] text-sm font-extrabold">
                HEKSAA
              </p>

              <p className="font-[var(--font-inter)] text-[9px] font-bold uppercase tracking-wider text-slate-400">
                AI Medical Report Intelligence
              </p>

            </div>

          </div>


          <div className="flex flex-wrap gap-5 font-[var(--font-inter)] text-[10px] font-semibold text-slate-400">

            <Link
              href="/how-it-works"
              className="transition hover:text-[#1264e8]"
            >
              How it works
            </Link>

            <Link
              href="/about"
              className="text-[#1264e8]"
            >
              About
            </Link>

            <Link
              href="/upload"
              className="transition hover:text-[#1264e8]"
            >
              Analyze report
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}


/* =========================================================
   COMPONENTS
========================================================= */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border-b border-white/10 py-5 sm:border-b-0 sm:border-r sm:px-8 first:pl-0 last:border-r-0">

      <p className="font-[var(--font-jakarta)] text-lg font-extrabold text-white">
        {value}
      </p>

      <p className="mt-1 font-[var(--font-inter)] text-[10px] text-slate-400">
        {label}
      </p>

    </div>
  );
}


function ProblemItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      </div>

      <span className="font-[var(--font-inter)] text-xs font-semibold text-slate-600">
        {text}
      </span>

    </div>
  );
}


function PurposeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
        <Check className="h-3.5 w-3.5 text-white" />
      </div>

      <span className="font-[var(--font-inter)] text-xs font-semibold text-blue-50">
        {text}
      </span>

    </div>
  );
}


function TrustCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(25,75,130,0.07)]">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
        <Icon className="h-5 w-5 text-emerald-600" />
      </div>

      <h3 className="mt-4 font-[var(--font-jakarta)] text-xs font-extrabold">
        {title}
      </h3>

      <p className="mt-2 font-[var(--font-inter)] text-[10px] leading-5 text-slate-500">
        {text}
      </p>

    </div>
  );
}