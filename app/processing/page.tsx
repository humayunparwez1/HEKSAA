"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  Brain,
  Check,
  CheckCircle2,
  FileSearch,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { saveReport } from "../lib/report-storage";

const steps = [
  {
    id: 1,
    title: "Securing your report",
    description: "Applying privacy protection before analysis.",
    icon: LockKeyhole,
  },
  {
    id: 2,
    title: "Reading the report",
    description: "Scanning text, tables and laboratory values.",
    icon: ScanLine,
  },
  {
    id: 3,
    title: "Extracting biomarkers",
    description: "Identifying measurements, units and reference ranges.",
    icon: FileSearch,
  },
  {
    id: 4,
    title: "Validating results",
    description: "Checking values against lab-specific ranges.",
    icon: CheckCircle2,
  },
  {
    id: 5,
    title: "Preparing explanations",
    description: "Creating clear, non-diagnostic explanations.",
    icon: Brain,
  },
];

/* ------------------------------------------------ */
/* TEMPORARY DEVELOPMENT REPORT                    */
/* ------------------------------------------------ */
/*
 * This is ONLY to test the complete application flow.
 *
 * These values are NOT extracted from the user's medical
 * report yet.
 *
 * Later this function will be replaced by the real
 * OCR / Vision extraction pipeline.
 */

function createDevelopmentReport(fileName: string) {
  return {
    id: `report-${Date.now()}`,

    fileName,

    uploadedAt: new Date().toISOString(),

    laboratory: "Development Report",

    reportDate: new Date().toLocaleDateString("en-IN"),

    extractionConfidence: 97,

    biomarkers: [
      {
        id: "hemoglobin",
        name: "Hemoglobin",
        value: 13.8,
        unit: "g/dL",
        referenceMin: 13,
        referenceMax: 17,
        referenceText: "13.0 – 17.0 g/dL",
        status: "normal" as const,
        confidence: 98,
        explanation:
          "Hemoglobin is a protein in red blood cells that helps carry oxygen throughout the body.",
      },

      {
        id: "glucose",
        name: "Glucose",
        value: 96,
        unit: "mg/dL",
        referenceMin: 70,
        referenceMax: 100,
        referenceText: "70 – 100 mg/dL",
        status: "normal" as const,
        confidence: 97,
        explanation:
          "Glucose is a type of sugar that provides energy for the body.",
      },

      {
        id: "vitamin-d",
        name: "Vitamin D",
        value: 28,
        unit: "ng/mL",
        referenceMin: 30,
        referenceMax: 100,
        referenceText: "30 – 100 ng/mL",
        status: "low" as const,
        confidence: 95,
        explanation:
          "Vitamin D is involved in several functions including calcium absorption and bone health.",
      },

      {
        id: "platelets",
        name: "Platelets",
        value: 245,
        unit: "10³/µL",
        referenceMin: 150,
        referenceMax: 450,
        referenceText: "150 – 450 10³/µL",
        status: "normal" as const,
        confidence: 98,
        explanation:
          "Platelets are blood components that play an important role in blood clotting.",
      },
    ],
  };
}

export default function ProcessingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(4);
  const [isSaving, setIsSaving] = useState(false);

  /* --------------------------------------------- */
  /* PROCESSING STEPS */
  /* --------------------------------------------- */

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((current) => {
        if (current >= steps.length - 1) {
          clearInterval(stepTimer);
          return current;
        }

        return current + 1;
      });
    }, 1400);

    return () => clearInterval(stepTimer);
  }, []);

  /* --------------------------------------------- */
  /* PROGRESS */
  /* --------------------------------------------- */

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(progressTimer);
          return 100;
        }

        return Math.min(current + 2, 100);
      });
    }, 70);

    return () => clearInterval(progressTimer);
  }, []);

  /* --------------------------------------------- */
  /* SAVE REPORT WHEN PROCESSING FINISHES          */
  /* --------------------------------------------- */

  useEffect(() => {
    if (progress < 100 || isSaving) {
      return;
    }

    setIsSaving(true);

    const finishProcessing = async () => {
      try {
        console.log("HEKSAA: Processing complete.");

        /* ----------------------------------------- */
        /* GET UPLOADED FILE INFORMATION             */
        /* ----------------------------------------- */

        const storedFile = localStorage.getItem(
          "heksaa-uploaded-file"
        );

        let uploadedFileName = "Medical report";

        if (storedFile) {
          try {
            const parsedFile = JSON.parse(storedFile);

            if (parsedFile?.name) {
              uploadedFileName = parsedFile.name;
            }
          } catch (error) {
            console.error(
              "HEKSAA: Could not read uploaded file:",
              error
            );
          }
        }

        console.log(
          "HEKSAA: Uploaded file:",
          uploadedFileName
        );

        /* ----------------------------------------- */
        /* CREATE TEMPORARY REPORT                   */
        /* ----------------------------------------- */

        const report =
          createDevelopmentReport(uploadedFileName);

        console.log(
          "HEKSAA: Generated report:",
          report
        );

        /* ----------------------------------------- */
        /* SAVE REPORT                               */
        /* ----------------------------------------- */

        const saved = saveReport(report);

        console.log(
          "HEKSAA: Report saved:",
          saved
        );

        /* ----------------------------------------- */
        /* VERIFY STORAGE                            */
        /* ----------------------------------------- */

        const verification =
          localStorage.getItem("heksaa-report");

        if (!verification) {
          console.error(
            "HEKSAA ERROR: Report was NOT saved."
          );

          setIsSaving(false);

          return;
        }

        console.log(
          "HEKSAA: Report successfully stored."
        );

        /* ----------------------------------------- */
        /* GO TO DASHBOARD                           */
        /* ----------------------------------------- */

        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 800);
      } catch (error) {
        console.error(
          "HEKSAA: Processing failed:",
          error
        );

        setIsSaving(false);
      }
    };

    finishProcessing();
  }, [progress, isSaving]);

  const currentStep = steps[activeStep];

  const CurrentIcon = currentStep.icon;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f9fd] text-[#10233f]">
      {/* Ambient background */}

      <div className="pointer-events-none fixed inset-0">
        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-blue-200/25 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full bg-cyan-200/20 blur-3xl"
        />
      </div>

      {/* Navbar */}

      <header className="relative z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1264e8] shadow-lg shadow-blue-500/20">
              <Activity className="h-5 w-5 text-white" />
            </div>

            <div>
              <div className="font-[var(--font-jakarta)] text-lg font-extrabold tracking-tight">
                HEKSAA
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Medical Intelligence
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-[#1264e8]">
            <Sparkles className="h-4 w-4" />
            AI Analysis
          </div>
        </div>
      </header>

      {/* Main */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-6xl items-center px-5 py-12 sm:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.15fr]">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#1264e8]">
              <Brain className="h-3.5 w-3.5" />
              HEKSAA Intelligence Engine
            </div>

            <h1 className="font-[var(--font-jakarta)] text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
              Turning your report into
              <span className="text-[#1264e8]">
                {" "}
                understanding.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
              HEKSAA is carefully processing your report to identify medical
              measurements, understand their context and prepare clear
              explanations.
            </p>

            {/* Current status */}

            <motion.div
              layout
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(25,75,130,0.07)]"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(18,100,232,0.12)",
                      "0 0 0 12px rgba(18,100,232,0)",
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50"
                >
                  <CurrentIcon className="h-6 w-6 text-[#1264e8]" />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1264e8]">
                    {isSaving
                      ? "Finalizing report"
                      : "Currently processing"}
                  </p>

                  <motion.h2
                    key={isSaving ? "finalizing" : currentStep.title}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-1 font-[var(--font-jakarta)] text-base font-bold text-[#10233f]"
                  >
                    {isSaving
                      ? "Preparing your dashboard"
                      : currentStep.title}
                  </motion.h2>

                  <motion.p
                    key={
                      isSaving
                        ? "saving"
                        : currentStep.description
                    }
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="mt-1 text-xs text-slate-400"
                  >
                    {isSaving
                      ? "Saving the extracted report information."
                      : currentStep.description}
                  </motion.p>
                </div>

                <div className="text-right">
                  <motion.p
                    key={progress}
                    className="font-[var(--font-jakarta)] text-lg font-extrabold text-[#1264e8]"
                  >
                    {progress}%
                  </motion.p>
                </div>
              </div>

              {/* Progress */}

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-[#1264e8]"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                />
              </div>
            </motion.div>

            {/* Safety note */}

            <div className="mt-5 flex gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

              <div>
                <p className="text-xs font-bold text-amber-800">
                  Safety-first analysis
                </p>

                <p className="mt-1 text-[11px] leading-5 text-amber-700/80">
                  HEKSAA explains report information but does not diagnose
                  conditions or replace professional medical advice.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              x: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            className="relative"
          >
            {/* Main card */}

            <div className="relative overflow-hidden rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-[0_35px_100px_rgba(25,75,130,0.12)] sm:p-8">

              {/* Top glow */}

              <motion.div
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-300 blur-3xl"
              />

              {/* Report visualization */}

              <div className="relative mx-auto h-[250px] max-w-[390px] overflow-hidden rounded-[25px] border border-slate-200 bg-[#f8fbff]">

                {/* Scan line */}

                <motion.div
                  animate={{
                    y: [0, 220, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-[#1264e8] shadow-[0_0_18px_rgba(18,100,232,0.8)]"
                />

                {/* Report paper */}

                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-[12%] top-[12%] h-[76%] w-[76%] rounded-xl border border-slate-200 bg-white p-5 shadow-[0_15px_40px_rgba(25,75,130,0.08)]"
                >
                  {/* Report header */}

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 w-28 rounded-full bg-slate-200" />
                      <div className="mt-2 h-1.5 w-20 rounded-full bg-slate-100" />
                    </div>

                    <div className="h-7 w-7 rounded-lg bg-blue-50">
                      <Activity className="m-1.5 h-4 w-4 text-[#1264e8]" />
                    </div>
                  </div>

                  {/* Report rows */}

                  <div className="mt-6 space-y-3">
                    {[
                      ["Hemoglobin", "13.8", "g/dL"],
                      ["Glucose", "96", "mg/dL"],
                      ["Vitamin D", "28", "ng/mL"],
                      ["Platelets", "245", "10³/µL"],
                    ].map((row, index) => (
                      <motion.div
                        key={row[0]}
                        animate={{
                          opacity: [0.45, 1, 0.45],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.35,
                        }}
                        className="grid grid-cols-[1.5fr_0.7fr_0.7fr] items-center border-b border-slate-100 pb-2"
                      >
                        <span className="text-[8px] font-semibold text-slate-500">
                          {row[0]}
                        </span>

                        <span className="text-right text-[9px] font-bold text-[#10233f]">
                          {row[1]}
                        </span>

                        <span className="text-right text-[7px] text-slate-400">
                          {row[2]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* AI badge */}

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-4 right-4 z-30 flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 shadow-[0_12px_30px_rgba(18,100,232,0.14)]"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                    <Brain className="h-4 w-4 text-[#1264e8]" />
                  </div>

                  <div>
                    <p className="text-[8px] font-bold text-[#10233f]">
                      AI Reading
                    </p>

                    <p className="text-[7px] text-slate-400">
                      Report detected
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Pipeline */}

              <div className="mt-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">
                      Analysis pipeline
                    </p>

                    <h3 className="mt-1 font-[var(--font-jakarta)] text-lg font-bold">
                      Intelligent report processing
                    </h3>
                  </div>

                  <Stethoscope className="h-6 w-6 text-blue-200" />
                </div>

                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const Icon = step.icon;

                    const completed =
                      index < activeStep;

                    const active =
                      index === activeStep;

                    return (
                      <motion.div
                        key={step.id}
                        animate={{
                          opacity:
                            index <= activeStep
                              ? 1
                              : 0.42,
                        }}
                        className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
                          active
                            ? "bg-blue-50"
                            : completed
                              ? "bg-emerald-50/60"
                              : "bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            completed
                              ? "bg-emerald-100 text-emerald-600"
                              : active
                                ? "bg-white text-[#1264e8] shadow-sm"
                                : "bg-white text-slate-400"
                          }`}
                        >
                          {completed ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Icon className="h-4 w-4" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-xs font-bold ${
                              active || completed
                                ? "text-[#10233f]"
                                : "text-slate-500"
                            }`}
                          >
                            {step.title}
                          </p>

                          <p className="mt-0.5 truncate text-[9px] text-slate-400">
                            {step.description}
                          </p>
                        </div>

                        {active && (
                          <motion.div
                            animate={{
                              opacity: [
                                0.3,
                                1,
                                0.3,
                              ],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                            }}
                            className="h-2 w-2 rounded-full bg-[#1264e8]"
                          />
                        )}

                        {completed && (
                          <span className="text-[9px] font-bold text-emerald-600">
                            Done
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating confidence card */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_20px_50px_rgba(25,75,130,0.12)] sm:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Extraction confidence
                </p>

                <p className="font-[var(--font-jakarta)] text-sm font-extrabold text-[#10233f]">
                  96%
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}