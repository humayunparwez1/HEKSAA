"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  Lightbulb,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type BiomarkerStatus = "Normal" | "Low" | "High";

type Biomarker = {
  id: string;
  name: string;
  value: number;
  unit: string;
  referenceMin: number;
  referenceMax: number;
  referenceText: string;
  status: BiomarkerStatus;
  confidence: number;
  category: string;
  quickExplanation: string;
  simpleExplanation: string;
  detailedExplanation: string;
};

/*
  FRONTEND DEMO DATA

  Later this will be replaced by the actual AI-extracted
  data from the uploaded medical report.
*/

const biomarkers: Biomarker[] = [
  {
    id: "hemoglobin",
    name: "Hemoglobin",
    value: 11.2,
    unit: "g/dL",
    referenceMin: 13,
    referenceMax: 17,
    referenceText: "13.0 – 17.0 g/dL",
    status: "Low",
    confidence: 99,
    category: "Complete Blood Count",
    quickExplanation:
      "The reported hemoglobin value is below the laboratory reference interval shown in the report.",
    simpleExplanation:
      "Hemoglobin is a protein found in red blood cells that carries oxygen around the body. HEKSAA compares the observed value with the reference interval provided by the laboratory.",
    detailedExplanation:
      "Hemoglobin is one of the measurements commonly included in a blood count. HEKSAA reports the observed value and compares it with the laboratory interval. The result alone does not establish why the value is outside the interval. Interpretation depends on clinical history, symptoms and other laboratory findings.",
  },
  {
    id: "rbc",
    name: "RBC Count",
    value: 4.21,
    unit: "million/µL",
    referenceMin: 4.5,
    referenceMax: 5.5,
    referenceText: "4.5 – 5.5 million/µL",
    status: "Low",
    confidence: 98,
    category: "Complete Blood Count",
    quickExplanation:
      "The reported RBC count is below the laboratory reference interval.",
    simpleExplanation:
      "RBC count represents the number of red blood cells measured in the sample. HEKSAA compares the observed value with the laboratory range.",
    detailedExplanation:
      "RBC count is interpreted together with other blood-count measurements and the individual's clinical context. HEKSAA does not use this value alone to establish a diagnosis.",
  },
  {
    id: "hematocrit",
    name: "Hematocrit",
    value: 34.8,
    unit: "%",
    referenceMin: 40,
    referenceMax: 50,
    referenceText: "40 – 50 %",
    status: "Low",
    confidence: 99,
    category: "Complete Blood Count",
    quickExplanation:
      "The reported hematocrit value is below the laboratory reference interval.",
    simpleExplanation:
      "Hematocrit represents the proportion of blood volume occupied by red blood cells. HEKSAA compares the reported value with the laboratory interval.",
    detailedExplanation:
      "Hematocrit is one component of a blood count and is normally considered together with other measurements. HEKSAA reports the value and comparison without determining the underlying cause.",
  },
  {
    id: "mch",
    name: "MCH",
    value: 26.6,
    unit: "pg",
    referenceMin: 27,
    referenceMax: 33,
    referenceText: "27 – 33 pg",
    status: "Low",
    confidence: 97,
    category: "Complete Blood Count",
    quickExplanation:
      "The reported MCH value is below the laboratory reference interval.",
    simpleExplanation:
      "MCH describes the average amount of hemoglobin in an individual red blood cell. HEKSAA compares the reported value against the laboratory range.",
    detailedExplanation:
      "MCH is one of several red-cell indices. Its interpretation generally depends on the other blood-count measurements and clinical context.",
  },
  {
    id: "esr",
    name: "ESR",
    value: 24,
    unit: "mm/hr",
    referenceMin: 0,
    referenceMax: 15,
    referenceText: "0 – 15 mm/hr",
    status: "High",
    confidence: 98,
    category: "Inflammatory Marker",
    quickExplanation:
      "The reported ESR value is above the laboratory reference interval.",
    simpleExplanation:
      "ESR is a laboratory measurement that reports how quickly red blood cells settle under specified testing conditions.",
    detailedExplanation:
      "ESR can be influenced by multiple factors and is interpreted together with other clinical information. HEKSAA does not determine the cause of an elevated result.",
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    value: 21,
    unit: "ng/mL",
    referenceMin: 30,
    referenceMax: 100,
    referenceText: "30 – 100 ng/mL",
    status: "Low",
    confidence: 99,
    category: "Vitamin",
    quickExplanation:
      "The reported Vitamin D value is below the laboratory reference interval.",
    simpleExplanation:
      "Vitamin D is measured in blood to assess the amount present in the sample. HEKSAA compares the observed value with the laboratory reference interval.",
    detailedExplanation:
      "The interpretation of Vitamin D results can depend on the laboratory method, reference interval and individual clinical circumstances. Treatment decisions should be discussed with a qualified healthcare professional.",
  },
  {
    id: "glucose",
    name: "Glucose",
    value: 96,
    unit: "mg/dL",
    referenceMin: 70,
    referenceMax: 100,
    referenceText: "70 – 100 mg/dL",
    status: "Normal",
    confidence: 99,
    category: "Metabolic",
    quickExplanation:
      "The reported glucose value falls within the laboratory reference interval.",
    simpleExplanation:
      "Glucose is a type of sugar measured in the blood. HEKSAA compares the reported value with the reference interval supplied by the laboratory.",
    detailedExplanation:
      "Glucose interpretation can depend on the testing context and other clinical information. HEKSAA displays the reported value and laboratory comparison without making a diagnosis.",
  },
];

const questionTemplates = [
  "Could you explain what this result means in the context of my other results?",
  "Is this result something that needs follow-up or monitoring?",
  "Would you recommend repeating this test?",
  "Is there anything about this result that I should discuss further with you?",
  "How should this result be considered alongside my symptoms and medical history?",
];

export default function BiomarkerPage() {
  const [selectedId, setSelectedId] = useState("hemoglobin");

  const [level, setLevel] = useState<
    "quick" | "simple" | "detailed"
  >("simple");

  const selected = useMemo(() => {
    return (
      biomarkers.find((item) => item.id === selectedId) ??
      biomarkers[0]
    );
  }, [selectedId]);

  /*
    Calculate where the observed value sits relative
    to the laboratory reference interval.
  */

  const rangeWidth =
    selected.referenceMax - selected.referenceMin;

  const position =
    rangeWidth > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((selected.value - selected.referenceMin) /
              rangeWidth) *
              100
          )
        )
      : 50;

  /*
    The visual gauge reserves:

    20% = low zone
    60% = normal/reference zone
    20% = high zone
  */

  const markerPosition = `${20 + position * 0.6}%`;

  const explanation =
    level === "quick"
      ? selected.quickExplanation
      : level === "simple"
        ? selected.simpleExplanation
        : selected.detailedExplanation;

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#10233f]">
      {/* =====================================================
          NAVBAR
      ====================================================== */}

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
            <Target className="h-4 w-4" />
            Biomarker Details
          </div>
        </div>
      </header>

      {/* =====================================================
          PAGE
      ====================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        {/* BACK / COMPARE */}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-[#1264e8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to report
          </Link>

          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1264e8]"
          >
            Compare reports
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* =====================================================
            TITLE
        ====================================================== */}

        <section className="mt-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1264e8]">
            Biomarker intelligence
          </p>

          <h1 className="mt-2 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Understand one result at a time.
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
            Review the exact reported value, unit and laboratory reference
            interval, then explore a plain-language explanation.
          </p>
        </section>

        {/* =====================================================
            TEST SELECTOR
        ====================================================== */}

        <section className="mt-7 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_15px_45px_rgba(25,75,130,0.04)] sm:p-6">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Select test
          </label>

          <div className="relative mt-2">
            <select
              value={selectedId}
              onChange={(event) =>
                setSelectedId(event.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-[#1264e8] focus:ring-4 focus:ring-blue-500/10"
            >
              {biomarkers.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} — {item.value} {item.unit}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </section>

        {/* =====================================================
            MAIN BIOMARKER AREA
        ====================================================== */}

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ===================================================
              VALUE CARD
          ==================================================== */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(25,75,130,0.06)] sm:p-8">
            {/* HEADER */}

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#1264e8]">
                    {selected.category}
                  </span>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                    AI extracted
                  </span>
                </div>

                <h2 className="mt-4 font-[var(--font-jakarta)] text-2xl font-extrabold sm:text-3xl">
                  {selected.name}
                </h2>
              </div>

              <StatusBadge
                status={selected.status}
              />
            </div>

            {/* OBSERVED VALUE */}

            <div className="mt-9 rounded-[24px] bg-[#f8fbff] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Observed value
              </p>

              <div className="mt-3 flex items-end gap-3">
                <span className="font-[var(--font-jakarta)] text-5xl font-extrabold tracking-[-0.04em] text-[#10233f] sm:text-6xl">
                  {selected.value}
                </span>

                <span className="mb-2 text-sm font-bold text-slate-400">
                  {selected.unit}
                </span>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Laboratory reference interval
                </p>

                <p className="mt-2 font-[var(--font-jakarta)] text-base font-extrabold text-slate-700">
                  {selected.referenceText}
                </p>
              </div>
            </div>

            {/* =================================================
                PREMIUM CLINICAL RANGE GAUGE
            ================================================== */}

            <div className="mt-7 rounded-[22px] border border-slate-100 bg-gradient-to-b from-white to-[#f8fbff] p-5 sm:p-6">
              {/* GAUGE HEADER */}

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Result position
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-[var(--font-jakarta)] text-xl font-extrabold text-[#10233f]">
                      {selected.value}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      {selected.unit}
                    </span>
                  </div>
                </div>

                <StatusBadge
                  status={selected.status}
                />
              </div>

              {/* GAUGE */}

              <div className="mt-10 px-1 sm:px-3">
                {/* ZONE LABELS */}

                <div className="mb-4 grid grid-cols-[20%_60%_20%] text-[9px] font-bold uppercase tracking-[0.12em]">
                  <span className="text-left text-amber-500">
                    Low
                  </span>

                  <span className="text-center text-emerald-600">
                    Normal range
                  </span>

                  <span className="text-right text-red-500">
                    High
                  </span>
                </div>

                {/* BAR */}

                <div className="relative h-[18px]">
                  {/* BASE TRACK */}

                  <div className="absolute inset-0 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                    {/* LOW */}

                    <div
                      className="absolute inset-y-0 left-0 w-[20%]"
                      style={{
                        background:
                          "linear-gradient(90deg,#fff4cf,#ffe8a3)",
                      }}
                    />

                    {/* NORMAL */}

                    <div
                      className="absolute inset-y-0 left-[20%] w-[60%]"
                      style={{
                        background:
                          "linear-gradient(90deg,#a7f3d0,#6ee7b7,#86efac)",
                      }}
                    />

                    {/* HIGH */}

                    <div
                      className="absolute inset-y-0 right-0 w-[20%]"
                      style={{
                        background:
                          "linear-gradient(90deg,#fecaca,#fee2e2)",
                      }}
                    />

                    {/* INNER HIGHLIGHT */}

                    <div className="absolute inset-y-[4px] left-[20%] right-[20%] rounded-full bg-white/30" />
                  </div>

                  {/* DIVIDERS */}

                  <div className="absolute left-[20%] top-1/2 h-7 w-px -translate-y-1/2 bg-white/80" />

                  <div className="absolute right-[20%] top-1/2 h-7 w-px -translate-y-1/2 bg-white/80" />

                  {/* VALUE MARKER */}

                  <div
                    className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: markerPosition,
                    }}
                  >
                    {/* GLOW */}

                    <div
                      className={`absolute -inset-3 rounded-full opacity-30 blur-md ${
                        selected.status === "High"
                          ? "bg-red-400"
                          : selected.status === "Low"
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                      }`}
                    />

                    {/* MARKER */}

                    <div
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full border-[4px] border-white shadow-[0_7px_25px_rgba(15,35,63,0.22)] ${
                        selected.status === "High"
                          ? "bg-red-500"
                          : selected.status === "Low"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                    >
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* FLOATING VALUE LABEL */}

                <div className="relative mt-3 h-12">
                  <div
                    className="absolute -translate-x-1/2"
                    style={{
                      left: markerPosition,
                    }}
                  >
                    {/* POINTER */}

                    <div className="mx-auto h-3 w-px bg-slate-300" />

                    {/* VALUE PILL */}

                    <div
                      className={`whitespace-nowrap rounded-lg border px-3 py-1.5 shadow-sm ${
                        selected.status === "High"
                          ? "border-red-100 bg-red-50"
                          : selected.status === "Low"
                            ? "border-amber-100 bg-amber-50"
                            : "border-emerald-100 bg-emerald-50"
                      }`}
                    >
                      <span
                        className={`font-[var(--font-jakarta)] text-xs font-extrabold ${
                          selected.status === "High"
                            ? "text-red-600"
                            : selected.status === "Low"
                              ? "text-amber-600"
                              : "text-emerald-600"
                        }`}
                      >
                        {selected.value} {selected.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RANGE INFORMATION */}

                <div className="mt-2 grid grid-cols-3">
                  {/* LOW */}

                  <div className="text-left">
                    <p className="text-[9px] font-medium text-slate-400">
                      Below range
                    </p>

                    <p className="mt-1 font-[var(--font-jakarta)] text-xs font-extrabold text-amber-600">
                      &lt; {selected.referenceMin}
                    </p>
                  </div>

                  {/* NORMAL */}

                  <div className="text-center">
                    <p className="text-[9px] font-medium text-slate-400">
                      Laboratory interval
                    </p>

                    <p className="mt-1 font-[var(--font-jakarta)] text-xs font-extrabold text-emerald-600">
                      {selected.referenceMin} –{" "}
                      {selected.referenceMax}
                    </p>
                  </div>

                  {/* HIGH */}

                  <div className="text-right">
                    <p className="text-[9px] font-medium text-slate-400">
                      Above range
                    </p>

                    <p className="mt-1 font-[var(--font-jakarta)] text-xs font-extrabold text-red-500">
                      &gt; {selected.referenceMax}
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTTOM INFORMATION */}

              <div className="mt-7 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white/80 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                {/* CURRENT RESULT */}

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      selected.status === "High"
                        ? "bg-red-50"
                        : selected.status === "Low"
                          ? "bg-amber-50"
                          : "bg-emerald-50"
                    }`}
                  >
                    {selected.status === "High" ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : selected.status === "Low" ? (
                      <TrendingDown className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Check className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Current result
                    </p>

                    <p className="text-xs font-bold text-[#10233f]">
                      {selected.value} {selected.unit}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-100 sm:hidden" />

                {/* REFERENCE */}

                <div className="text-left sm:text-right">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Laboratory reference
                  </p>

                  <p className="text-xs font-bold text-[#10233f]">
                    {selected.referenceText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              CONFIDENCE CARD
          ==================================================== */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(25,75,130,0.06)] sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Extraction confidence
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="font-[var(--font-jakarta)] text-5xl font-extrabold">
                {selected.confidence}
              </span>

              <span className="mb-2 text-xl font-bold text-slate-400">
                %
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{
                  width: `${selected.confidence}%`,
                }}
              />
            </div>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              This score represents the confidence of the extraction process
              in identifying the test information from the source report.
            </p>

            <div className="mt-7 border-t border-slate-100 pt-6">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#1264e8]" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Source information
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Test name, observed value, unit and laboratory reference
                    interval should come directly from the uploaded report.
                  </p>
                </div>
              </div>
            </div>

            {/* EXTRACTION CHECKS */}

            <div className="mt-6 space-y-2">
              <ExtractionCheck text="Test name detected" />
              <ExtractionCheck text="Numerical value detected" />
              <ExtractionCheck text="Unit detected" />
              <ExtractionCheck text="Reference interval detected" />
            </div>
          </div>
        </section>

        {/* =====================================================
            EXPLANATION
        ====================================================== */}

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(25,75,130,0.05)] sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <BookOpen className="h-5 w-5 text-[#1264e8]" />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1264e8]">
                Three-level explanation
              </p>

              <h2 className="mt-1 font-[var(--font-jakarta)] text-2xl font-extrabold">
                Understand it your way.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <ExplanationButton
                active={level === "quick"}
                onClick={() => setLevel("quick")}
                label="Quick"
              />

              <ExplanationButton
                active={level === "simple"}
                onClick={() => setLevel("simple")}
                label="Simple"
              />

              <ExplanationButton
                active={level === "detailed"}
                onClick={() => setLevel("detailed")}
                label="Detailed"
              />
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                {level === "quick" ? (
                  <Lightbulb className="h-5 w-5 text-[#1264e8]" />
                ) : level === "simple" ? (
                  <BookOpen className="h-5 w-5 text-[#1264e8]" />
                ) : (
                  <Sparkles className="h-5 w-5 text-[#1264e8]" />
                )}
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#1264e8]">
                  {level === "quick"
                    ? "Quick explanation"
                    : level === "simple"
                      ? "Simple explanation"
                      : "Detailed explanation"}
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {explanation}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STATUS CARDS
        ====================================================== */}

        <section className="mt-4 grid gap-5 lg:grid-cols-3">
          <StatusInfo
            icon={
              selected.status === "Low"
                ? TrendingDown
                : TrendingUp
            }
            title="Observed status"
            value={selected.status}
            description={`The observed value is ${selected.status.toLowerCase()} compared with the laboratory reference interval shown above.`}
            status={selected.status}
          />

          <StatusInfo
            icon={Target}
            title="Reference interval"
            value={selected.referenceText}
            description="This interval comes from the laboratory information associated with the report."
            status="Normal"
          />

          <StatusInfo
            icon={CircleHelp}
            title="What this means"
            value="Context matters"
            description="HEKSAA does not use one laboratory result alone to establish a diagnosis."
            status="Normal"
          />
        </section>

        {/* =====================================================
            DOCTOR QUESTIONS
        ====================================================== */}

        <section className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <MessageCircleQuestion className="h-5 w-5 text-[#1264e8]" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1264e8]">
                Doctor consultation
              </p>

              <h2 className="mt-1 font-[var(--font-jakarta)] text-2xl font-extrabold">
                Questions you can ask
              </h2>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                These are conversation starters generated from the displayed
                report information.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {questionTemplates.map(
              (question, index) => (
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
              )
            )}
          </div>
        </section>

        {/* =====================================================
            SOURCE + SAFETY
        ====================================================== */}

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          {/* SOURCE */}

          <div className="rounded-[26px] border border-slate-200 bg-white p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FileText className="h-5 w-5 text-[#1264e8]" />
            </div>

            <h3 className="mt-5 font-[var(--font-jakarta)] text-lg font-extrabold">
              Source-first extraction
            </h3>

            <p className="mt-3 text-xs leading-6 text-slate-500">
              In the final HEKSAA workflow, this page will display the exact
              test name, numerical value, unit and laboratory reference
              interval extracted from the uploaded report. If information is
              unreadable or uncertain, HEKSAA should flag it rather than
              inventing a value.
            </p>

            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1264e8]" />

                <p className="text-[10px] leading-5 text-slate-500">
                  Exact source data takes priority over assumptions or
                  generalized reference values.
                </p>
              </div>
            </div>
          </div>

          {/* SAFETY */}

          <div className="rounded-[26px] border border-amber-100 bg-amber-50/60 p-6 sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>

            <h3 className="mt-5 font-[var(--font-jakarta)] text-lg font-extrabold">
              Important medical notice
            </h3>

            <p className="mt-3 text-xs leading-6 text-amber-700">
              HEKSAA explains reported laboratory information for educational
              purposes. A result outside a reference interval does not by
              itself establish a diagnosis. Discuss your results with a
              qualified healthcare professional.
            </p>
          </div>
        </section>

        {/* =====================================================
            BOTTOM NAVIGATION
        ====================================================== */}

        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-[#1264e8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Compare reports
          </Link>

          <Link
            href="/doctor"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1264e8] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]"
          >
            Doctor Consultation Guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
  status,
}: {
  status: BiomarkerStatus;
}) {
  const isHigh = status === "High";
  const isLow = status === "Low";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${
        isHigh
          ? "border border-red-100 bg-red-50 text-red-600"
          : isLow
            ? "border border-amber-100 bg-amber-50 text-amber-600"
            : "border border-emerald-100 bg-emerald-50 text-emerald-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isHigh
            ? "bg-red-500"
            : isLow
              ? "bg-amber-500"
              : "bg-emerald-500"
        }`}
      />

      {status}
    </span>
  );
}

/* ============================================================
   EXPLANATION BUTTON
============================================================ */

function ExplanationButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
        active
          ? "border-[#1264e8] bg-[#1264e8] text-white shadow-md shadow-blue-500/20"
          : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-[#1264e8]"
      }`}
    >
      {label}
    </button>
  );
}

/* ============================================================
   EXTRACTION CHECK
============================================================ */

function ExtractionCheck({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
        <Check className="h-3 w-3 text-emerald-600" />
      </div>

      <span className="text-[10px] font-semibold text-slate-500">
        {text}
      </span>
    </div>
  );
}

/* ============================================================
   STATUS INFORMATION CARD
============================================================ */

function StatusInfo({
  icon: Icon,
  title,
  value,
  description,
  status,
}: {
  icon: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  value: string;
  description: string;
  status: BiomarkerStatus;
}) {
  const isHigh = status === "High";
  const isLow = status === "Low";

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          isHigh
            ? "bg-red-50"
            : isLow
              ? "bg-amber-50"
              : "bg-emerald-50"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            isHigh
              ? "text-red-500"
              : isLow
                ? "text-amber-500"
                : "text-emerald-500"
          }`}
        />
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <p className="mt-1 font-[var(--font-jakarta)] text-base font-extrabold">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}