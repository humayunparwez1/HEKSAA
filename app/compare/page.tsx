"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileText,
  Info,
  LineChart,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type Report = {
  id: string;
  date: string;
  shortDate: string;
  laboratory: string;
  fileName: string;
};

type Result = {
  name: string;
  unit: string;
  reference: string;
  values: Record<string, number>;
};

const reports: Report[] = [
  {
    id: "report-1",
    date: "30 September 2026",
    shortDate: "30 Sep 2026",
    laboratory: "Example Diagnostic Laboratory",
    fileName: "Blood_Report_30Sep.pdf",
  },
  {
    id: "report-2",
    date: "15 July 2026",
    shortDate: "15 Jul 2026",
    laboratory: "Example Diagnostic Laboratory",
    fileName: "Blood_Report_15Jul.pdf",
  },
  {
    id: "report-3",
    date: "20 April 2026",
    shortDate: "20 Apr 2026",
    laboratory: "Example Diagnostic Laboratory",
    fileName: "Blood_Report_20Apr.pdf",
  },
];

const results: Result[] = [
  {
    name: "Hemoglobin",
    unit: "g/dL",
    reference: "13.0 – 17.0 g/dL",
    values: {
      "report-1": 11.2,
      "report-2": 12.1,
      "report-3": 12.8,
    },
  },
  {
    name: "RBC Count",
    unit: "million/µL",
    reference: "4.5 – 5.5 million/µL",
    values: {
      "report-1": 4.21,
      "report-2": 4.38,
      "report-3": 4.51,
    },
  },
  {
    name: "Hematocrit",
    unit: "%",
    reference: "40 – 50 %",
    values: {
      "report-1": 34.8,
      "report-2": 37.2,
      "report-3": 39.4,
    },
  },
  {
    name: "MCH",
    unit: "pg",
    reference: "27 – 33 pg",
    values: {
      "report-1": 26.6,
      "report-2": 27.1,
      "report-3": 28.2,
    },
  },
  {
    name: "ESR",
    unit: "mm/hr",
    reference: "0 – 15 mm/hr",
    values: {
      "report-1": 24,
      "report-2": 19,
      "report-3": 16,
    },
  },
  {
    name: "Vitamin D",
    unit: "ng/mL",
    reference: "30 – 100 ng/mL",
    values: {
      "report-1": 21,
      "report-2": 24,
      "report-3": 28,
    },
  },
];

export default function ComparePage() {
  const [selectedTest, setSelectedTest] = useState("Hemoglobin");
  const [firstReport, setFirstReport] = useState("report-3");
  const [secondReport, setSecondReport] = useState("report-1");

  const selectedResult =
    results.find((item) => item.name === selectedTest) ??
    results[0];

  const firstValue =
    selectedResult.values[firstReport];

  const secondValue =
    selectedResult.values[secondReport];

  const change = secondValue - firstValue;

  const percentChange =
    firstValue !== 0
      ? ((change / firstValue) * 100)
      : 0;

  const chartValues = useMemo(() => {
    return reports
      .slice()
      .reverse()
      .map((report) => ({
        report,
        value: selectedResult.values[report.id],
      }));
  }, [selectedResult]);

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#10233f]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
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
            <LineChart className="h-4 w-4" />
            Time Machine
          </div>
        </div>
      </header>

      {/* MAIN */}
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
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_260px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1264e8]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Report comparison
                </div>

                <h1 className="mt-5 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  See how your results change over time.
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                  Compare measurements from different reports and understand
                  how individual laboratory values have changed between report
                  dates.
                </p>
              </div>

              <div className="hidden lg:flex lg:justify-center">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#1264e8] shadow-xl shadow-blue-500/20">
                    <LineChart className="h-11 w-11 text-white" />
                  </div>

                  <div className="absolute right-1 top-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg">
                    <ArrowUp className="h-5 w-5 text-emerald-500" />
                  </div>

                  <div className="absolute bottom-3 left-0 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg">
                    <CalendarDays className="h-5 w-5 text-[#1264e8]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REPORT COUNT */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={FileText}
            label="Reports available"
            value={`${reports.length}`}
          />

          <StatCard
            icon={BarChart3}
            label="Tests available"
            value={`${results.length}`}
          />

          <StatCard
            icon={ShieldCheck}
            label="Comparison mode"
            value="Report based"
            success
          />
        </section>

        {/* REPORT SELECTOR */}
        <section className="mt-8 rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_15px_45px_rgba(25,75,130,0.04)] sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <CalendarDays className="h-5 w-5 text-[#1264e8]" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
                Time machine
              </p>

              <h2 className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold">
                Choose two reports
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                HEKSAA compares the same test between the two selected reports.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ReportSelect
              label="Earlier report"
              value={firstReport}
              onChange={setFirstReport}
              exclude={secondReport}
            />

            <ReportSelect
              label="Latest report"
              value={secondReport}
              onChange={setSecondReport}
              exclude={firstReport}
            />
          </div>
        </section>

        {/* TEST SELECTOR */}
        <section className="mt-8 rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
              Biomarker
            </p>

            <h2 className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold">
              Select a test to compare
            </h2>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {results.map((result) => (
              <button
                key={result.name}
                onClick={() => setSelectedTest(result.name)}
                className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                  selectedTest === result.name
                    ? "border-[#1264e8] bg-[#1264e8] text-white shadow-md shadow-blue-500/20"
                    : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-[#1264e8]"
                }`}
              >
                {result.name}
              </button>
            ))}
          </div>
        </section>

        {/* COMPARISON */}
        <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* CHART */}
          <div className="rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
                  Trend
                </p>

                <h2 className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold">
                  {selectedResult.name}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Unit: {selectedResult.unit}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 px-3 py-2 text-right">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Reference
                </p>

                <p className="mt-1 text-xs font-bold text-slate-600">
                  {selectedResult.reference}
                </p>
              </div>
            </div>

            {/* VISUAL CHART */}
            <div className="relative mt-8 h-[300px] overflow-hidden rounded-2xl border border-slate-100 bg-[#f8fbff] p-5">
              {/* horizontal guides */}
              <div className="absolute left-5 right-5 top-[25%] border-t border-dashed border-slate-200" />
              <div className="absolute left-5 right-5 top-[50%] border-t border-dashed border-slate-200" />
              <div className="absolute left-5 right-5 top-[75%] border-t border-dashed border-slate-200" />

              {/* line */}
              <div className="absolute bottom-16 left-10 right-10 top-10">
                <svg
                  viewBox="0 0 600 220"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                >
                  <polyline
                    points="0,170 300,110 600,55"
                    fill="none"
                    stroke="#1264e8"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="0"
                    cy="170"
                    r="8"
                    fill="white"
                    stroke="#1264e8"
                    strokeWidth="5"
                  />

                  <circle
                    cx="300"
                    cy="110"
                    r="8"
                    fill="white"
                    stroke="#1264e8"
                    strokeWidth="5"
                  />

                  <circle
                    cx="600"
                    cy="55"
                    r="8"
                    fill="white"
                    stroke="#1264e8"
                    strokeWidth="5"
                  />
                </svg>
              </div>

              {/* labels */}
              <div className="absolute bottom-4 left-5 right-5 flex justify-between">
                {chartValues.map((item) => (
                  <div
                    key={item.report.id}
                    className="text-center"
                  >
                    <p className="text-[9px] font-bold text-slate-400">
                      {item.report.shortDate}
                    </p>

                    <p className="mt-1 text-xs font-extrabold text-[#10233f]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CHANGE CARD */}
          <div className="rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
              Comparison
            </p>

            <h2 className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold">
              What changed?
            </h2>

            <div className="mt-7 rounded-2xl bg-blue-50 p-5">
              <p className="text-xs font-bold text-slate-500">
                {selectedResult.name}
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="font-[var(--font-jakarta)] text-4xl font-extrabold text-[#10233f]">
                  {secondValue}
                </span>

                <span className="mb-1 text-xs font-semibold text-slate-400">
                  {selectedResult.unit}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                ) : change < 0 ? (
                  <TrendingDown className="h-4 w-4 text-amber-500" />
                ) : (
                  <Minus className="h-4 w-4 text-slate-400" />
                )}

                <span
                  className={`text-xs font-bold ${
                    change > 0
                      ? "text-emerald-600"
                      : change < 0
                        ? "text-amber-600"
                        : "text-slate-500"
                  }`}
                >
                  {change > 0 ? "+" : ""}
                  {change.toFixed(2)} {selectedResult.unit}
                </span>

                <span className="text-[10px] text-slate-400">
                  ({percentChange > 0 ? "+" : ""}
                  {percentChange.toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* EARLIER */}
            <ComparisonRow
              label="Earlier report"
              date={
                reports.find((item) => item.id === firstReport)
                  ?.shortDate ?? ""
              }
              value={`${firstValue} ${selectedResult.unit}`}
            />

            {/* LATEST */}
            <ComparisonRow
              label="Latest report"
              date={
                reports.find((item) => item.id === secondReport)
                  ?.shortDate ?? ""
              }
              value={`${secondValue} ${selectedResult.unit}`}
              latest
            />

            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1264e8]" />

                <p className="text-[10px] leading-5 text-slate-500">
                  A change in a laboratory value does not by itself establish
                  whether the change is clinically important. Your healthcare
                  professional should interpret the result in context.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ALL RESULTS COMPARISON */}
        <section className="mt-8 rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <BarChart3 className="h-5 w-5 text-[#1264e8]" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
                Overview
              </p>

              <h2 className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold">
                Compare all available tests
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Select any test above to inspect its detailed trend.
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Test
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Earlier
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Latest
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Change
                  </th>

                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Trend
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((result) => {
                  const oldValue = result.values[firstReport];
                  const newValue = result.values[secondReport];
                  const difference = newValue - oldValue;

                  return (
                    <tr
                      key={result.name}
                      onClick={() =>
                        setSelectedTest(result.name)
                      }
                      className={`cursor-pointer border-b border-slate-100 transition hover:bg-blue-50/40 ${
                        selectedTest === result.name
                          ? "bg-blue-50/30"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-5">
                        <p className="text-xs font-bold">
                          {result.name}
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                          {result.unit}
                        </p>
                      </td>

                      <td className="px-4 py-5 text-xs font-semibold text-slate-500">
                        {oldValue}
                      </td>

                      <td className="px-4 py-5 text-xs font-extrabold">
                        {newValue}
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`text-xs font-bold ${
                            difference > 0
                              ? "text-emerald-600"
                              : difference < 0
                                ? "text-amber-600"
                                : "text-slate-400"
                          }`}
                        >
                          {difference > 0 ? "+" : ""}
                          {difference.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-4 py-5">
                        {difference > 0 ? (
                          <ArrowUp className="h-4 w-4 text-emerald-500" />
                        ) : difference < 0 ? (
                          <ArrowDown className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Minus className="h-4 w-4 text-slate-400" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SAFETY */}
        <section className="mt-8 rounded-[24px] border border-amber-100 bg-amber-50/60 p-5 sm:p-6">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

            <div>
              <h3 className="text-xs font-extrabold text-amber-800">
                Important medical notice
              </h3>

              <p className="mt-1.5 text-[11px] leading-5 text-amber-700">
                HEKSAA displays changes between reported laboratory values. A
                rising or falling value does not by itself indicate a diagnosis
                or determine whether treatment is required. Discuss meaningful
                changes with your healthcare professional.
              </p>
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#1264e8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to dashboard
          </Link>

          <Link
            href="/biomarker"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1264e8] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
          >
            Explore Biomarker Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatCard({
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

function ReportSelect({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  exclude: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-xs font-bold text-slate-600 outline-none transition focus:border-[#1264e8] focus:ring-4 focus:ring-blue-500/10"
        >
          {reports
            .filter((report) => report.id !== exclude)
            .map((report) => (
              <option key={report.id} value={report.id}>
                {report.date}
              </option>
            ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <p className="mt-2 text-[10px] text-slate-400">
        {
          reports.find((report) => report.id === value)
            ?.laboratory
        }
      </p>
    </div>
  );
}

function ComparisonRow({
  label,
  date,
  value,
  latest = false,
}: {
  label: string;
  date: string;
  value: string;
  latest?: boolean;
}) {
  return (
    <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 p-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-xs font-semibold text-slate-500">
          {date}
        </p>
      </div>

      <div className="text-right">
        <p className="font-[var(--font-jakarta)] text-lg font-extrabold">
          {value}
        </p>

        {latest && (
          <span className="text-[9px] font-bold text-emerald-600">
            Latest
          </span>
        )}
      </div>
    </div>
  );
}