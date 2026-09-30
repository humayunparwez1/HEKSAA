"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileSearch,
  FileText,
  HeartPulse,
  LockKeyhole,
  MessageCircleQuestion,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  UserRound,
  WandSparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Upload your report",
    description:
      "Upload a medical or laboratory report as a PDF or image. HEKSAA starts with the original document rather than manually entered values.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Privacy Shield",
    description:
      "Personal information is identified and prepared for privacy-aware processing before report analysis.",
    icon: LockKeyhole,
  },
  {
    number: "03",
    title: "AI reads the report",
    description:
      "AI vision and OCR identify the test names, observed numerical values, units and laboratory reference intervals contained in the report.",
    icon: ScanSearch,
  },
  {
    number: "04",
    title: "Validate the extracted data",
    description:
      "Extracted information is checked and structured so the displayed result stays tied to the source report.",
    icon: CheckCircle2,
  },
  {
    number: "05",
    title: "Understand the results",
    description:
      "HEKSAA presents the reported values with their laboratory reference intervals and provides plain-language explanations.",
    icon: WandSparkles,
  },
  {
    number: "06",
    title: "Prepare for your doctor",
    description:
      "The system turns the report into useful consultation questions and a doctor-ready summary.",
    icon: Stethoscope,
  },
];

const extractionItems = [
  "Exact test name",
  "Observed numerical value",
  "Unit",
  "Laboratory reference interval",
  "Normal / low / high comparison",
  "AI extraction confidence",
];

const safetyItems = [
  "No diagnosis from a single laboratory result",
  "No automatic medication recommendations",
  "Laboratory-specific reference intervals are preserved",
  "Unclear information should be flagged instead of guessed",
  "Results remain connected to the source report",
  "Doctor consultation remains the final clinical step",
];

export default function HowItWorksPage() {
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

          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1264e8] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
          >
            Analyze a report
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8] shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              How HEKSAA works
            </div>

            <h1 className="mt-6 font-[var(--font-jakarta)] text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              From a medical report
              <br />
              to{" "}
              <span className="text-[#1264e8]">
                understandable information.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              HEKSAA combines document understanding, structured extraction,
              validation and patient-friendly explanations to help people
              prepare for meaningful conversations with healthcare
              professionals.
            </p>
          </div>

          {/* PIPELINE */}
          <div className="mx-auto mt-14 max-w-6xl">
            <div className="hidden items-center justify-between lg:flex">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="flex items-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-lg shadow-blue-900/5">
                        <Icon className="h-6 w-6 text-[#1264e8]" />
                      </div>

                      <span className="mt-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {step.number}
                      </span>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="mx-3 h-px w-12 bg-blue-100 xl:w-20" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                      <Icon className="h-5 w-5 text-[#1264e8]" />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#1264e8]">
                        Step {step.number}
                      </p>

                      <p className="mt-1 text-xs font-extrabold">
                        {step.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SIX STEPS */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1264e8]">
              The HEKSAA pipeline
            </p>

            <h2 className="mt-2 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              Six steps from upload to consultation
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              Each stage has a specific purpose so the user can understand
              what happens to their report.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group rounded-[26px] border border-slate-200 bg-[#f8fbff] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_25px_60px_rgba(25,75,130,0.08)] sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-[#1264e8]" />
                    </div>

                    <span className="font-[var(--font-jakarta)] text-3xl font-extrabold text-blue-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 font-[var(--font-jakarta)] text-lg font-extrabold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXTRACTION SECTION */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT VISUAL */}
          <div className="relative overflow-hidden rounded-[30px] border border-blue-100 bg-[#10233f] p-6 shadow-[0_30px_80px_rgba(16,35,63,0.15)] sm:p-8">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <FileSearch className="h-5 w-5 text-blue-200" />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-blue-200">
                      AI extraction
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      Report structure
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[9px] font-bold text-emerald-300">
                  Structured
                </span>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-3 border-b border-white/10 pb-3 text-[8px] font-bold uppercase tracking-wider text-blue-200">
                  <span>Test</span>
                  <span>Observed</span>
                  <span>Unit</span>
                </div>

                {[
                  ["Hemoglobin", "11.2", "g/dL"],
                  ["RBC Count", "4.21", "million/µL"],
                  ["Hematocrit", "34.8", "%"],
                  ["Vitamin D", "21", "ng/mL"],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-3 border-b border-white/5 py-4 last:border-0"
                  >
                    <span className="text-[10px] font-semibold text-white">
                      {row[0]}
                    </span>

                    <span className="text-[10px] font-bold text-blue-100">
                      {row[1]}
                    </span>

                    <span className="text-[9px] text-slate-400">
                      {row[2]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                <p className="text-[10px] leading-5 text-slate-300">
                  Values remain structured so the interface can display the
                  source report information clearly.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1264e8]">
              What gets extracted
            </p>

            <h2 className="mt-2 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              The important data comes from the report.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              HEKSAA is designed around the actual information printed in the
              uploaded report. The final system should not restrict users to a
              predefined list of four or six tests.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {extractionItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  </div>

                  <span className="text-xs font-bold text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <LockKeyhole className="h-6 w-6 text-emerald-600" />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                Privacy Shield
              </p>

              <h2 className="mt-2 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Protect the person behind the report.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                Medical reports can contain names, dates, contact details and
                other personal information. HEKSAA's workflow is designed to
                separate privacy handling from laboratory-result extraction.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <PrivacyBadge text="PII awareness" />
                <PrivacyBadge text="Privacy-first workflow" />
                <PrivacyBadge text="Report-focused extraction" />
              </div>
            </div>

            <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8">
              <div className="space-y-4">
                <PrivacyRow
                  icon={UserRound}
                  title="Personal information"
                  description="Identify information that can directly identify a person."
                />

                <PrivacyRow
                  icon={ShieldCheck}
                  title="Privacy processing"
                  description="Prepare the report for privacy-aware analysis."
                />

                <PrivacyRow
                  icon={FileSearch}
                  title="Laboratory information"
                  description="Extract test names, values, units and reference intervals."
                />

                <PrivacyRow
                  icon={CheckCircle2}
                  title="Structured output"
                  description="Keep the extracted information organized for the results interface."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="rounded-[32px] border border-blue-100 bg-blue-50/60 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                <HeartPulse className="h-6 w-6 text-[#1264e8]" />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1264e8]">
                AI safety
              </p>

              <h2 className="mt-2 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em]">
                Explain the report.
                <br />
                Don't replace the doctor.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                HEKSAA is designed to support understanding and consultation
                preparation, not to make clinical decisions on behalf of the
                user or healthcare professional.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {safetyItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <Check className="h-3.5 w-3.5 text-[#1264e8]" />
                  </div>

                  <p className="text-xs font-semibold leading-5 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <MessageCircleQuestion className="h-7 w-7 text-[#1264e8]" />
          </div>

          <h2 className="mt-6 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Turn your report into a better conversation.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
            Upload your report and let HEKSAA organize the information before
            you discuss it with your healthcare professional.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1264e8] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
            >
              Upload a report
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-[#1264e8]"
            >
              View dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-[#f8fbff]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1264e8]">
              <Activity className="h-4 w-4 text-white" />
            </div>

            <div>
              <p className="font-[var(--font-jakarta)] text-sm font-extrabold">
                HEKSAA
              </p>

              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                AI Medical Report Intelligence
              </p>
            </div>
          </div>

          <p className="text-[10px] leading-5 text-slate-400">
            HEKSAA provides educational report explanations and consultation
            support. It does not provide a medical diagnosis.
          </p>
        </div>
      </footer>
    </main>
  );
}

function PrivacyBadge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-emerald-100 bg-white px-3 py-2 text-[9px] font-bold text-emerald-700">
      {text}
    </span>
  );
}

function PrivacyRow({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-emerald-100 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
        <Icon className="h-5 w-5 text-emerald-600" />
      </div>

      <div>
        <h3 className="text-xs font-extrabold text-[#10233f]">
          {title}
        </h3>

        <p className="mt-1 text-[10px] leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}