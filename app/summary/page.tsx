"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Copy,
  FileText,
  Info,
  MessageCircleQuestion,
  Printer,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const reportInfo = {
  fileName: "Complete_Blood_Count.pdf",
  reportType: "Complete Blood Count",
  reportDate: "30 September 2026",
  laboratory: "Example Diagnostic Laboratory",
};

const results = [
  {
    name: "Hemoglobin",
    value: "11.2",
    unit: "g/dL",
    reference: "13.0 – 17.0 g/dL",
    status: "Low",
  },
  {
    name: "RBC Count",
    value: "4.21",
    unit: "million/µL",
    reference: "4.5 – 5.5 million/µL",
    status: "Low",
  },
  {
    name: "Hematocrit",
    value: "34.8",
    unit: "%",
    reference: "40 – 50 %",
    status: "Low",
  },
  {
    name: "MCH",
    value: "26.6",
    unit: "pg",
    reference: "27 – 33 pg",
    status: "Low",
  },
  {
    name: "ESR",
    value: "24",
    unit: "mm/hr",
    reference: "0 – 15 mm/hr",
    status: "High",
  },
  {
    name: "Vitamin D",
    value: "21",
    unit: "ng/mL",
    reference: "30 – 100 ng/mL",
    status: "Low",
  },
];

const questions = [
  "Could you help me understand the results that are outside the laboratory reference intervals?",
  "Do the hemoglobin, RBC count and hematocrit results need further evaluation?",
  "Should I discuss the Vitamin D result with you?",
  "What would be useful to discuss regarding the ESR result?",
  "Are there any results that you recommend monitoring over time?",
];

export default function SummaryPage() {
  const [copied, setCopied] = useState(false);

  function copySummary() {
    const text = `
HEKSAA — DOCTOR-READY SUMMARY

Report: ${reportInfo.reportType}
Date: ${reportInfo.reportDate}
Laboratory: ${reportInfo.laboratory}

RESULTS REQUIRING DISCUSSION

${results
  .map(
    (item) =>
      `${item.name}: ${item.value} ${item.unit} | Reference: ${item.reference} | Status: ${item.status}`
  )
  .join("\n")}

QUESTIONS FOR DOCTOR

${questions.map((question, i) => `${i + 1}. ${question}`).join("\n")}

This summary is generated for educational and consultation-preparation purposes. It does not constitute a diagnosis.
`;

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

  function printSummary() {
    window.print();
  }

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#10233f]">
      {/* NAVBAR */}
      <header className="no-print sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
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

          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600">
            <ShieldCheck className="h-4 w-4" />
            Doctor-Ready
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
        {/* BACK */}
        <div className="no-print">
          <Link
            href="/doctor"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-[#1264e8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to consultation guide
          </Link>
        </div>

        {/* HEADER */}
        <section className="mt-7 rounded-[30px] border border-blue-100 bg-white p-6 shadow-[0_25px_80px_rgba(25,75,130,0.07)] sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1264e8]">
                <Stethoscope className="h-3.5 w-3.5" />
                Doctor consultation summary
              </div>

              <h1 className="mt-5 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Your report, ready for discussion.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                A concise overview of the laboratory information detected from
                your report and the questions prepared for your consultation.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="no-print flex flex-wrap gap-2">
              <button
                onClick={copySummary}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-[#1264e8]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={printSummary}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1264e8] px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
              >
                <Printer className="h-4 w-4" />
                Print summary
              </button>
            </div>
          </div>
        </section>

        {/* REPORT INFORMATION */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            icon={FileText}
            label="Report"
            value={reportInfo.reportType}
          />

          <InfoCard
            icon={ClipboardList}
            label="Report date"
            value={reportInfo.reportDate}
          />

          <InfoCard
            icon={Activity}
            label="Laboratory"
            value={reportInfo.laboratory}
          />

          <InfoCard
            icon={ShieldCheck}
            label="Analysis status"
            value="Prepared"
            success
          />
        </section>

        {/* ATTENTION SUMMARY */}
        <section className="mt-8 rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-amber-600">
                Attention summary
              </p>

              <h2 className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold">
                6 measurements are outside the displayed reference intervals
              </h2>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                This section identifies measurements that differ from the
                laboratory reference intervals displayed in the report. It
                does not determine the cause or provide a diagnosis.
              </p>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="mt-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
              Laboratory results
            </p>

            <h2 className="mt-1 font-[var(--font-jakarta)] text-2xl font-extrabold">
              Results to discuss
            </h2>
          </div>

          <div className="mt-5 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_15px_45px_rgba(25,75,130,0.04)]">
            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Test name
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Observed value
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Unit
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Laboratory reference interval
                    </th>

                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((result) => (
                    <tr
                      key={result.name}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-[#10233f]">
                          {result.name}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-[var(--font-jakarta)] text-sm font-extrabold">
                          {result.value}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-xs text-slate-500">
                        {result.unit}
                      </td>

                      <td className="px-6 py-5 text-xs font-semibold text-slate-600">
                        {result.reference}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={result.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE */}
            <div className="divide-y divide-slate-100 md:hidden">
              {results.map((result) => (
                <div key={result.name} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold">{result.name}</p>

                      <p className="mt-2 font-[var(--font-jakarta)] text-xl font-extrabold">
                        {result.value}

                        <span className="ml-1 text-xs font-semibold text-slate-400">
                          {result.unit}
                        </span>
                      </p>
                    </div>

                    <StatusBadge status={result.status} />
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Laboratory reference interval
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-600">
                      {result.reference}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="mt-8 rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <MessageCircleQuestion className="h-5 w-5 text-[#1264e8]" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
                Consultation questions
              </p>

              <h2 className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold">
                Questions prepared for your doctor
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {questions.map((question, index) => (
              <div
                key={question}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-extrabold text-[#1264e8] shadow-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="text-xs font-semibold leading-6 text-slate-600">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCTOR NOTES */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <h3 className="mt-5 font-[var(--font-jakarta)] text-lg font-extrabold">
              Helpful information to bring
            </h3>

            <div className="mt-5 space-y-3">
              <ChecklistItem text="Original laboratory report" />
              <ChecklistItem text="Previous relevant reports" />
              <ChecklistItem text="Current medicines and supplements" />
              <ChecklistItem text="Relevant symptoms or concerns" />
            </div>
          </div>

          <div className="rounded-[26px] border border-blue-100 bg-blue-50/50 p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
              <Sparkles className="h-5 w-5 text-[#1264e8]" />
            </div>

            <h3 className="mt-5 font-[var(--font-jakarta)] text-lg font-extrabold">
              HEKSAA safety approach
            </h3>

            <div className="mt-5 space-y-3">
              <ChecklistItem text="Uses the laboratory reference interval shown in the report." />
              <ChecklistItem text="Separates observed values from interpretation." />
              <ChecklistItem text="Creates questions rather than diagnoses." />
              <ChecklistItem text="Encourages professional medical review." />
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
                This summary is intended to help organize information for a
                conversation with a healthcare professional. It does not
                diagnose disease, determine the cause of an abnormal result,
                or provide treatment recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM NAVIGATION */}
        <div className="no-print mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/doctor"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#1264e8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Consultation guide
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1264e8] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
          >
            Back to dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* PRINT FOOTER */}
      <div className="print-only">
        <p>Generated by HEKSAA — AI Medical Report Intelligence</p>

        <p>
          Educational summary only. Please discuss the report with a qualified
          healthcare professional.
        </p>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          main {
            background: white !important;
          }

          section,
          div {
            box-shadow: none !important;
          }
        }

        .print-only {
          display: none;
        }
      `}</style>
    </main>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  success = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          success ? "bg-emerald-50" : "bg-blue-50"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            success ? "text-emerald-600" : "text-[#1264e8]"
          }`}
        />
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-[var(--font-jakarta)] text-sm font-extrabold">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isHigh = status === "High";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider ${
        isHigh
          ? "border border-red-100 bg-red-50 text-red-600"
          : "border border-amber-100 bg-amber-50 text-amber-600"
      }`}
    >
      {isHigh ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}

      {status}
    </span>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
        <Check className="h-3 w-3 text-emerald-600" />
      </div>

      <p className="text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}