"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  Filter,
  Gauge,
  HeartPulse,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Upload,
  XCircle,
} from "lucide-react";

import { getReport } from "../lib/report-storage";
import type {
  Biomarker,
  BiomarkerStatus,
  ReportData,
} from "../lib/report";

const STATUS_OPTIONS: {
  label: string;
  value: BiomarkerStatus | "all";
}[] = [
  { label: "All results", value: "all" },
  { label: "Normal", value: "normal" },
  { label: "Low", value: "low" },
  { label: "High", value: "high" },
  { label: "Unknown", value: "unknown" },
];

function statusConfig(status: BiomarkerStatus) {
  switch (status) {
    case "normal":
      return {
        label: "Normal",
        icon: CheckCircle2,
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-100",
        dot: "bg-emerald-500",
      };

    case "low":
      return {
        label: "Low",
        icon: XCircle,
        className: "bg-amber-50 text-amber-700 border-amber-100",
        dot: "bg-amber-500",
      };

    case "high":
      return {
        label: "High",
        icon: AlertCircle,
        className: "bg-red-50 text-red-700 border-red-100",
        dot: "bg-red-500",
      };

    default:
      return {
        label: "Unknown",
        icon: AlertCircle,
        className:
          "bg-slate-50 text-slate-600 border-slate-200",
        dot: "bg-slate-400",
      };
  }
}

function confidenceConfig(confidence: number) {
  if (confidence >= 90) {
    return {
      label: "High confidence",
      className: "text-emerald-700 bg-emerald-50",
      bar: "bg-emerald-500",
    };
  }

  if (confidence >= 75) {
    return {
      label: "Moderate confidence",
      className: "text-amber-700 bg-amber-50",
      bar: "bg-amber-500",
    };
  }

  return {
    label: "Review needed",
    className: "text-red-700 bg-red-50",
    bar: "bg-red-500",
  };
}

function formatValue(value: number | string) {
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? value.toString()
      : value.toString();
  }

  return value;
}

export default function DashboardPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<BiomarkerStatus | "all">("all");

  useEffect(() => {
    const storedReport = getReport();

    setReport(storedReport);
    setLoading(false);
  }, []);

  const biomarkers = report?.biomarkers ?? [];

  const counts = useMemo(() => {
    return {
      total: biomarkers.length,
      normal: biomarkers.filter(
        (item) => item.status === "normal"
      ).length,
      low: biomarkers.filter(
        (item) => item.status === "low"
      ).length,
      high: biomarkers.filter(
        (item) => item.status === "high"
      ).length,
      unknown: biomarkers.filter(
        (item) => item.status === "unknown"
      ).length,
    };
  }, [biomarkers]);

  const filteredBiomarkers = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return biomarkers.filter((biomarker) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        biomarker.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        biomarker.unit
          .toLowerCase()
          .includes(normalizedSearch) ||
        biomarker.referenceText
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        biomarker.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [biomarkers, search, statusFilter]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f9fd]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="h-16 animate-pulse rounded-2xl bg-white" />

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-3xl bg-white"
              />
            ))}
          </div>

          <div className="mt-8 h-96 animate-pulse rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="min-h-screen bg-[#f5f9fd]">
        <header className="border-b border-[#e5edf5] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1264e8] text-white shadow-lg shadow-blue-500/20">
                <HeartPulse size={21} />
              </div>

              <div>
                <div className="font-[var(--font-jakarta)] text-xl font-extrabold tracking-tight text-[#10233f]">
                  HEKSAA
                </div>

                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#718096]">
                  Medical Intelligence
                </div>
              </div>
            </Link>
          </div>
        </header>

        <section className="mx-auto flex min-h-[75vh] max-w-4xl items-center justify-center px-6 py-20">
          <div className="w-full rounded-[32px] border border-[#e5edf5] bg-white p-10 text-center shadow-[0_25px_70px_rgba(25,75,130,0.08)] md:p-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eaf4ff] text-[#1264e8]">
              <FileText size={36} />
            </div>

            <h1 className="mt-7 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#10233f] md:text-4xl">
              No medical report yet
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#718096]">
              Upload a medical or laboratory report and HEKSAA
              will extract the available test names, observed
              values, units, laboratory reference intervals and
              extraction confidence.
            </p>

            <Link
              href="/upload"
              className="mx-auto mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1264e8] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
            >
              <Upload size={18} />
              Upload report
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9fd]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#e5edf5] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1264e8] text-white shadow-lg shadow-blue-500/20">
              <HeartPulse size={21} />
            </div>

            <div>
              <div className="font-[var(--font-jakarta)] text-xl font-extrabold tracking-tight text-[#10233f]">
                HEKSAA
              </div>

              <div className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[#718096] sm:block">
                Medical Intelligence
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e5edf5] bg-white px-4 py-2.5 text-sm font-bold text-[#10233f] transition hover:border-[#1264e8] hover:text-[#1264e8]"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">
                New report
              </span>
            </Link>

            <Link
              href="/doctor"
              className="hidden items-center gap-2 rounded-xl bg-[#1264e8] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0958d5] sm:inline-flex"
            >
              <Stethoscope size={16} />
              Doctor Guide
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">
        {/* PAGE INTRO */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dceaff] bg-[#eaf4ff] px-3 py-1.5 text-xs font-bold text-[#1264e8]">
                <Sparkles size={14} />
                AI ANALYZED REPORT
              </div>

              <h1 className="font-[var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#10233f] md:text-4xl">
                Report Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096] md:text-base">
                Review the exact information extracted from your
                laboratory report. HEKSAA uses the reference
                interval provided by the laboratory whenever it
                is available.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl border border-[#e5edf5] bg-white px-4 py-2.5 text-sm font-bold text-[#10233f] transition hover:border-[#1264e8] hover:text-[#1264e8]"
              >
                <Activity size={17} />
                Compare reports
              </Link>

              <Link
                href="/summary"
                className="inline-flex items-center gap-2 rounded-xl bg-[#10233f] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#19365d]"
              >
                <ClipboardList size={17} />
                Summary
              </Link>
            </div>
          </div>
        </section>

        {/* REPORT META */}
        <section className="mb-7 rounded-3xl border border-[#e5edf5] bg-white p-5 shadow-[0_15px_45px_rgba(25,75,130,0.05)] md:p-6">
          <div className="grid gap-5 md:grid-cols-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9aa9ba]">
                Report
              </p>

              <p
                className="mt-1 truncate text-sm font-bold text-[#10233f]"
                title={report.fileName}
              >
                {report.fileName}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9aa9ba]">
                Laboratory
              </p>

              <p className="mt-1 text-sm font-bold text-[#10233f]">
                {report.laboratory || "Not detected"}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9aa9ba]">
                Report date
              </p>

              <p className="mt-1 text-sm font-bold text-[#10233f]">
                {report.reportDate || "Not detected"}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9aa9ba]">
                Overall extraction
              </p>

              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#edf2f7]">
                  <div
                    className="h-full rounded-full bg-[#1264e8]"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          report.extractionConfidence
                        )
                      )}%`,
                    }}
                  />
                </div>

                <span className="text-sm font-extrabold text-[#1264e8]">
                  {report.extractionConfidence}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={Gauge}
            title="Total results"
            value={counts.total}
            description="Tests extracted"
            iconClass="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            icon={CheckCircle2}
            title="Normal"
            value={counts.normal}
            description="Within laboratory range"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <SummaryCard
            icon={AlertCircle}
            title="Needs attention"
            value={counts.low + counts.high}
            description="Outside reference range"
            iconClass="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            icon={ShieldCheck}
            title="Extraction confidence"
            value={`${report.extractionConfidence}%`}
            description="AI extraction confidence"
            iconClass="bg-violet-50 text-violet-600"
          />
        </section>

        {/* SAFETY NOTICE */}
        <section className="mb-8 flex gap-4 rounded-3xl border border-blue-100 bg-blue-50/70 p-5">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1264e8] shadow-sm">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="font-[var(--font-jakarta)] text-sm font-extrabold text-[#10233f]">
              Information, not diagnosis
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#5f7188] md:text-sm">
              HEKSAA explains and organizes information found
              in your report. A result marked low or high does
              not by itself establish a diagnosis or determine
              treatment. Discuss your results with a qualified
              healthcare professional.
            </p>
          </div>
        </section>

        {/* RESULTS SECTION */}
        <section className="overflow-hidden rounded-3xl border border-[#e5edf5] bg-white shadow-[0_20px_60px_rgba(25,75,130,0.06)]">
          {/* TABLE HEADER */}
          <div className="border-b border-[#e5edf5] p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1264e8]">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h2 className="font-[var(--font-jakarta)] text-lg font-extrabold text-[#10233f]">
                      Extracted test results
                    </h2>

                    <p className="text-xs text-[#718096]">
                      {filteredBiomarkers.length} of{" "}
                      {biomarkers.length} results shown
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* SEARCH */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa9ba]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search tests..."
                    className="h-11 w-full rounded-xl border border-[#e5edf5] bg-[#f9fbfd] pl-10 pr-4 text-sm text-[#10233f] outline-none transition placeholder:text-[#9aa9ba] focus:border-[#1264e8] focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:w-64"
                  />
                </div>

                {/* FILTER */}
                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa9ba]"
                  />

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(
                        event.target
                          .value as BiomarkerStatus | "all"
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-[#e5edf5] bg-[#f9fbfd] pl-9 pr-9 text-sm font-semibold text-[#10233f] outline-none focus:border-[#1264e8] focus:ring-4 focus:ring-blue-500/10 sm:w-44"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronRight
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#9aa9ba]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto lg:block">
            {filteredBiomarkers.length > 0 ? (
              <table className="w-full min-w-[950px] border-collapse">
                <thead>
                  <tr className="border-b border-[#e5edf5] bg-[#f9fbfd]">
                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#718096]">
                      Test name
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#718096]">
                      Observed value
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#718096]">
                      Unit
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#718096]">
                      Laboratory reference interval
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#718096]">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-wider text-[#718096]">
                      AI confidence
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBiomarkers.map(
                    (biomarker, index) => (
                      <BiomarkerTableRow
                        key={
                          biomarker.id ||
                          `${biomarker.name}-${index}`
                        }
                        biomarker={biomarker}
                      />
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <EmptyResults
                search={search}
                onClear={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              />
            )}
          </div>

          {/* MOBILE/TABLET CARDS */}
          <div className="p-4 lg:hidden">
            {filteredBiomarkers.length > 0 ? (
              <div className="space-y-4">
                {filteredBiomarkers.map(
                  (biomarker, index) => (
                    <BiomarkerCard
                      key={
                        biomarker.id ||
                        `${biomarker.name}-${index}`
                      }
                      biomarker={biomarker}
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyResults
                search={search}
                onClear={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              />
            )}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <ActionCard
            href="/biomarker"
            icon={Activity}
            title="Explore biomarkers"
            description="Understand individual test results and their context."
          />

          <ActionCard
            href="/compare"
            icon={Gauge}
            title="Compare reports"
            description="Review how extracted values change across reports."
          />

          <ActionCard
            href="/doctor"
            icon={Stethoscope}
            title="Prepare for your doctor"
            description="Generate focused questions based on your report."
          />
        </section>

        {/* FOOTER DISCLAIMER */}
        <div className="py-10 text-center">
          <p className="mx-auto max-w-3xl text-xs leading-5 text-[#8a99aa]">
            HEKSAA is an informational tool. It does not
            replace professional medical advice, diagnosis,
            treatment, or emergency care. Always verify
            important results against the original laboratory
            report.
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-3xl border border-[#e5edf5] bg-white p-5 shadow-[0_15px_45px_rgba(25,75,130,0.05)] transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-[#718096]">
            {title}
          </p>

          <p className="mt-2 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-tight text-[#10233f]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#9aa9ba]">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP TABLE ROW
========================================================= */

function BiomarkerTableRow({
  biomarker,
}: {
  biomarker: Biomarker;
}) {
  const status = statusConfig(biomarker.status);
  const confidence = confidenceConfig(
    biomarker.confidence
  );

  const StatusIcon = status.icon;

  return (
    <tr className="group border-b border-[#edf2f7] transition last:border-0 hover:bg-[#f9fbfd]">
      {/* TEST NAME */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1264e8]">
            <Activity size={17} />
          </div>

          <div>
            <p className="font-[var(--font-jakarta)] text-sm font-extrabold text-[#10233f]">
              {biomarker.name}
            </p>

            {biomarker.explanation && (
              <p className="mt-0.5 max-w-[230px] truncate text-xs text-[#8a99aa]">
                {biomarker.explanation}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* VALUE */}
      <td className="px-6 py-5">
        <span className="font-[var(--font-jakarta)] text-lg font-extrabold text-[#10233f]">
          {formatValue(biomarker.value)}
        </span>
      </td>

      {/* UNIT */}
      <td className="px-6 py-5">
        <span className="text-sm font-semibold text-[#718096]">
          {biomarker.unit || "—"}
        </span>
      </td>

      {/* REFERENCE */}
      <td className="px-6 py-5">
        <span className="rounded-lg bg-[#f5f8fb] px-3 py-2 text-sm font-semibold text-[#52657d]">
          {biomarker.referenceText || "Not provided"}
        </span>
      </td>

      {/* STATUS */}
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
        >
          <StatusIcon size={14} />
          {status.label}
        </span>
      </td>

      {/* CONFIDENCE */}
      <td className="px-6 py-5">
        <div className="w-32">
          <div className="mb-1.5 flex items-center justify-between">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${confidence.className}`}
            >
              {confidence.label}
            </span>

            <span className="text-xs font-extrabold text-[#10233f]">
              {biomarker.confidence}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[#edf2f7]">
            <div
              className={`h-full rounded-full ${confidence.bar}`}
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, biomarker.confidence)
                )}%`,
              }}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

/* =========================================================
   MOBILE CARD
========================================================= */

function BiomarkerCard({
  biomarker,
}: {
  biomarker: Biomarker;
}) {
  const status = statusConfig(biomarker.status);
  const confidence = confidenceConfig(
    biomarker.confidence
  );

  const StatusIcon = status.icon;

  return (
    <article className="rounded-2xl border border-[#e5edf5] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1264e8]">
            <Activity size={18} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-[var(--font-jakarta)] text-sm font-extrabold text-[#10233f]">
              {biomarker.name}
            </h3>

            <p className="mt-0.5 text-xs text-[#8a99aa]">
              Extracted from report
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${status.className}`}
        >
          <StatusIcon size={12} />
          {status.label}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#f8fafc] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa9ba]">
            Observed value
          </p>

          <p className="mt-1 font-[var(--font-jakarta)] text-xl font-extrabold text-[#10233f]">
            {formatValue(biomarker.value)}
          </p>
        </div>

        <div className="rounded-xl bg-[#f8fafc] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa9ba]">
            Unit
          </p>

          <p className="mt-1 text-sm font-extrabold text-[#10233f]">
            {biomarker.unit || "—"}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-[#eaf0f5] bg-white p-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#9aa9ba]">
          Laboratory reference interval
        </p>

        <p className="mt-1 text-sm font-bold text-[#52657d]">
          {biomarker.referenceText || "Not provided"}
        </p>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-[#718096]">
            AI extraction confidence
          </span>

          <span className="text-xs font-extrabold text-[#10233f]">
            {biomarker.confidence}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#edf2f7]">
          <div
            className={`h-full rounded-full ${confidence.bar}`}
            style={{
              width: `${Math.min(
                100,
                Math.max(0, biomarker.confidence)
              )}%`,
            }}
          />
        </div>

        <p className="mt-1.5 text-[10px] text-[#9aa9ba]">
          {confidence.label}
        </p>
      </div>

      {biomarker.explanation && (
        <div className="mt-4 border-t border-[#edf2f7] pt-4">
          <p className="text-xs leading-5 text-[#718096]">
            {biomarker.explanation}
          </p>
        </div>
      )}
    </article>
  );
}

/* =========================================================
   EMPTY SEARCH STATE
========================================================= */

function EmptyResults({
  search,
  onClear,
}: {
  search: string;
  onClear: () => void;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f5f9] text-[#718096]">
        <Search size={23} />
      </div>

      <h3 className="mt-4 font-[var(--font-jakarta)] text-lg font-extrabold text-[#10233f]">
        No results found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#718096]">
        {search
          ? `No extracted test matches "${search}".`
          : "No extracted tests match the selected filter."}
      </p>

      <button
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#e5edf5] bg-white px-4 py-2.5 text-sm font-bold text-[#10233f] transition hover:border-[#1264e8] hover:text-[#1264e8]"
      >
        <XCircle size={16} />
        Clear filters
      </button>
    </div>
  );
}

/* =========================================================
   ACTION CARD
========================================================= */

function ActionCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[#e5edf5] bg-white p-5 shadow-[0_15px_45px_rgba(25,75,130,0.04)] transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_25px_60px_rgba(25,75,130,0.09)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1264e8] transition group-hover:bg-[#1264e8] group-hover:text-white">
          <Icon size={20} />
        </div>

        <ArrowRight
          size={18}
          className="text-[#b2bfcd] transition group-hover:translate-x-1 group-hover:text-[#1264e8]"
        />
      </div>

      <h3 className="mt-5 font-[var(--font-jakarta)] text-base font-extrabold text-[#10233f]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#718096]">
        {description}
      </p>
    </Link>
  );
}