"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  FileText,
  Info,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const attentionResults = [
  {
    name: "Hemoglobin",
    value: "11.2",
    unit: "g/dL",
    range: "13.0 – 17.0",
    status: "Low",
  },
  {
    name: "RBC Count",
    value: "4.21",
    unit: "million/µL",
    range: "4.5 – 5.5",
    status: "Low",
  },
  {
    name: "Hematocrit",
    value: "34.8",
    unit: "%",
    range: "40 – 50",
    status: "Low",
  },
  {
    name: "MCH",
    value: "26.6",
    unit: "pg",
    range: "27 – 33",
    status: "Low",
  },
  {
    name: "ESR",
    value: "24",
    unit: "mm/hr",
    range: "0 – 15",
    status: "High",
  },
  {
    name: "Vitamin D",
    value: "21",
    unit: "ng/mL",
    range: "30 – 100",
    status: "Low",
  },
];

const questions = [
  {
    id: 1,
    type: "Important",
    question:
      "Could you help me understand the results that are outside the laboratory reference intervals?",
    reason:
      "Several measurements in the report are outside the reference intervals printed by the laboratory.",
  },
  {
    id: 2,
    type: "Important",
    question:
      "Do the hemoglobin, RBC count and hematocrit results need further evaluation?",
    reason:
      "These measurements are below the laboratory reference intervals shown in the report.",
  },
  {
    id: 3,
    type: "Important",
    question:
      "Should I discuss the Vitamin D result with you, and would you recommend any follow-up testing?",
    reason:
      "The reported Vitamin D value is below the laboratory reference interval.",
  },
  {
    id: 4,
    type: "Follow-up",
    question:
      "What would be useful to discuss regarding the ESR result being above the laboratory reference interval?",
    reason:
      "The reported ESR value is above the laboratory reference interval.",
  },
  {
    id: 5,
    type: "Follow-up",
    question:
      "Are there any results in this report that you would recommend monitoring over time?",
    reason:
      "Your doctor can determine whether monitoring or repeat testing is appropriate.",
  },
];

export default function DoctorPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(1);
  const [copied, setCopied] = useState(false);

  function copyQuestions() {
    const text = questions
      .map((item, index) => `${index + 1}. ${item.question}`)
      .join("\n");

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {});
  }

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#10233f]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1264e8] shadow-lg shadow-blue-500/20">
              <Activity className="h-5 w-5 text-white" />
            </div>

            <div>
              <div className="font-[var(--font-jakarta)] text-lg font-extrabold">
                HEKSAA
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Medical Intelligence
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-[#1264e8]">
            <Stethoscope className="h-4 w-4" />
            Doctor Guide
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {/* BACK */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-[#1264e8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to report
        </Link>

        {/* HERO */}
        <section className="relative mt-7 overflow-hidden rounded-[30px] border border-blue-100 bg-white shadow-[0_25px_80px_rgba(25,75,130,0.07)]">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1264e8]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Consultation preparation
                </div>

                <h1 className="mt-5 max-w-3xl font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  Prepare better questions for your doctor.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                  HEKSAA organizes questions around the information detected
                  in your report so you can have a more focused conversation
                  with your healthcare professional.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={copyQuestions}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1264e8] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Questions copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy questions
                      </>
                    )}
                  </button>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-[#1264e8]"
                  >
                    Review report
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* HERO ICON */}
              <div className="mx-auto hidden h-56 w-56 items-center justify-center lg:flex">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#1264e8] shadow-xl shadow-blue-500/20">
                    <MessageCircleQuestion className="h-11 w-11 text-white" />
                  </div>

                  <div className="absolute right-0 top-3 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg">
                    <FileText className="h-5 w-5 text-[#1264e8]" />
                  </div>

                  <div className="absolute bottom-2 left-0 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg">
                    <Stethoscope className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REPORT SUMMARY */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={FileText}
            title="Report"
            value="Complete Blood Count"
          />

          <SummaryCard
            icon={ClipboardList}
            title="Tests reviewed"
            value="18 detected"
          />

          <SummaryCard
            icon={TrendingDown}
            title="Needs attention"
            value="6 results"
            warning
          />

          <SummaryCard
            icon={ShieldCheck}
            title="Extraction confidence"
            value="97%"
            success
          />
        </section>

        {/* RESULTS */}
        <section className="mt-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-amber-600">
              Report context
            </p>

            <h2 className="mt-1 font-[var(--font-jakarta)] text-2xl font-extrabold">
              Results to discuss
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              These results are outside the laboratory reference intervals
              shown in the report.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attentionResults.map((result) => (
              <div
                key={result.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_15px_45px_rgba(25,75,130,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-400">
                      {result.name}
                    </p>

                    <p className="mt-2 font-[var(--font-jakarta)] text-xl font-extrabold">
                      {result.value}
                      <span className="ml-1 text-xs font-semibold text-slate-400">
                        {result.unit}
                      </span>
                    </p>
                  </div>

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      result.status === "High"
                        ? "bg-red-50"
                        : "bg-amber-50"
                    }`}
                  >
                    {result.status === "High" ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Laboratory reference interval
                  </p>

                  <p className="mt-1 text-xs font-bold text-slate-600">
                    {result.range} {result.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
                Consultation guide
              </p>

              <h2 className="mt-1 font-[var(--font-jakarta)] text-2xl font-extrabold">
                Questions to ask your doctor
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                These are conversation starters, not diagnoses or treatment
                instructions.
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5">
              <span className="text-xs font-bold text-[#1264e8]">
                5 suggested questions
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {questions.map((item, index) => {
              const isOpen = openQuestion === item.id;

              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border bg-white transition ${
                    isOpen
                      ? "border-blue-200 shadow-[0_15px_45px_rgba(18,100,232,0.06)]"
                      : "border-slate-200"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : item.id)
                    }
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold text-[#1264e8]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                          item.type === "Important"
                            ? "border border-amber-200 bg-amber-50 text-amber-700"
                            : "border border-blue-200 bg-blue-50 text-[#1264e8]"
                        }`}
                      >
                        {item.type}
                      </span>

                      <p className="mt-2 text-sm font-bold leading-6 text-[#10233f]">
                        {item.question}
                      </p>
                    </div>

                    <span className="text-xl text-slate-300">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/60 px-5 pb-5 pt-4 sm:pl-[76px]">
                      <div className="flex gap-3">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#1264e8]" />

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1264e8]">
                            Why this question?
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* PREPARATION */}
        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <ClipboardList className="h-5 w-5 text-[#1264e8]" />
            </div>

            <h3 className="mt-5 font-[var(--font-jakarta)] text-xl font-extrabold">
              Before your appointment
            </h3>

            <div className="mt-5 space-y-4">
              <Checklist text="Keep the original laboratory report available." />
              <Checklist text="Write down symptoms or concerns you want to discuss." />
              <Checklist text="Bring previous reports if comparison is relevant." />
              <Checklist text="Tell your doctor about medicines or supplements you take." />
            </div>
          </div>

          <div className="rounded-[26px] border border-blue-100 bg-blue-50/50 p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
              <Stethoscope className="h-5 w-5 text-[#1264e8]" />
            </div>

            <h3 className="mt-5 font-[var(--font-jakarta)] text-xl font-extrabold">
              What HEKSAA provides
            </h3>

            <div className="mt-5 space-y-4">
              <Checklist text="Organizes information extracted from your report." />
              <Checklist text="Highlights measurements outside the laboratory interval." />
              <Checklist text="Creates questions for discussion with your doctor." />
              <Checklist text="Keeps the explanation educational and non-diagnostic." />
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="mt-8 rounded-[24px] border border-amber-100 bg-amber-50/60 p-5 sm:p-6">
          <div className="flex gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <h3 className="text-xs font-extrabold text-amber-800">
                Important medical notice
              </h3>

              <p className="mt-1.5 text-[11px] leading-5 text-amber-700">
                HEKSAA's questions are intended to help you communicate with a
                healthcare professional. A laboratory result outside a
                reference interval does not by itself establish a diagnosis.
                Your doctor should interpret the report in the context of your
                symptoms, history and examination.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER NAVIGATION */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#1264e8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to dashboard
          </Link>

          <Link
            href="/summary"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1264e8] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
          >
            Doctor-Ready Summary
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  warning = false,
  success = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  warning?: boolean;
  success?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          warning
            ? "bg-amber-50"
            : success
              ? "bg-emerald-50"
              : "bg-blue-50"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            warning
              ? "text-amber-600"
              : success
                ? "text-emerald-600"
                : "text-[#1264e8]"
          }`}
        />
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-1 font-[var(--font-jakarta)] text-sm font-extrabold">
        {value}
      </p>
    </div>
  );
}

function Checklist({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
      </div>

      <p className="text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}