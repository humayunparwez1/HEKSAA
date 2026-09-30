"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileImage,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
  AlertCircle,
} from "lucide-react";

type UploadedFileInfo = {
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (selectedFile: File) => {
    setError("");

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const maxSize = 15 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Please upload a PDF, JPG, PNG, or WEBP file."
      );
      return false;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 15 MB.");
      return false;
    }

    if (selectedFile.size === 0) {
      setError("This file appears to be empty.");
      return false;
    }

    return true;
  };

  /*
   * Save information about the actual uploaded report.
   *
   * IMPORTANT:
   * We are not putting the complete medical file into localStorage.
   * We only store basic file metadata here.
   *
   * Later, this can be replaced by a secure backend upload.
   */
  const saveUploadedFileInfo = (selectedFile: File) => {
    const fileInfo: UploadedFileInfo = {
      name: selectedFile.name,
      type: selectedFile.type,
      size: selectedFile.size,
      uploadedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "heksaa-uploaded-file",
      JSON.stringify(fileInfo)
    );
  };

  const handleFile = (selectedFile: File) => {
    if (!validateFile(selectedFile)) {
      return;
    }

    setFile(selectedFile);
    setError("");

    saveUploadedFileInfo(selectedFile);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }

    /*
     * Allows the user to select the same file again
     * after removing it.
     */
    event.target.value = "";
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      setIsDragging(false);

      const droppedFile =
        event.dataTransfer.files?.[0];

      if (droppedFile) {
        handleFile(droppedFile);
      }
    },
    []
  );

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    /*
     * Prevent the border from flickering when moving
     * between children of the upload area.
     */
    if (
      event.currentTarget.contains(
        event.relatedTarget as Node
      )
    ) {
      return;
    }

    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    setError("");

    localStorage.removeItem("heksaa-uploaded-file");
  };

  const continueToPrivacy = () => {
    if (!file) {
      setError(
        "Please select a medical report first."
      );
      return;
    }

    setIsUploading(true);

    /*
     * Give the user a short premium transition before
     * moving to the Privacy Shield.
     */
    setTimeout(() => {
      window.location.href = "/privacy";
    }, 900);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(
      2
    )} MB`;
  };

  const isPdf =
    file?.type === "application/pdf";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f9fd] text-[#10233f]">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-200/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-200/15 blur-3xl"
        />
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

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

          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              Privacy Protected
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
        {/* Back */}

        <motion.div
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
        >
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#1264e8]"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

            Back to Home
          </Link>
        </motion.div>

        {/* Heading */}

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
          className="mb-10 max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1264e8]">
            <Sparkles className="h-3.5 w-3.5" />

            AI Report Analysis
          </div>

          <h1 className="font-[var(--font-jakarta)] text-4xl font-extrabold leading-tight tracking-[-0.035em] text-[#10233f] sm:text-5xl">
            Upload your
            <span className="text-[#1264e8]">
              {" "}
              medical report.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Upload a laboratory or medical report and
            HEKSAA will help turn complex medical
            information into something easier to
            understand.
          </p>
        </motion.div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid gap-7 lg:grid-cols-[1.5fr_0.8fr]">
          {/* =================================================
              UPLOAD CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_80px_rgba(25,75,130,0.09)] sm:p-7"
          >
            {/* Drop zone */}

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden rounded-[24px] border-2 border-dashed p-8 text-center transition-all duration-300 ${
                isDragging
                  ? "scale-[1.01] border-[#1264e8] bg-blue-50"
                  : "border-slate-200 bg-[#f8fbff] hover:border-blue-300 hover:bg-blue-50/40"
              }`}
            >
              {/* Decorative circles */}

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/60 blur-2xl" />

              <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-cyan-100/50 blur-2xl" />

              {/* Upload icon */}

              <motion.div
                animate={
                  isDragging
                    ? {
                        scale: 1.12,
                        y: -8,
                      }
                    : {
                        scale: 1,
                        y: [0, -6, 0],
                      }
                }
                transition={
                  isDragging
                    ? {
                        duration: 0.25,
                      }
                    : {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-white shadow-[0_15px_40px_rgba(18,100,232,0.12)]"
              >
                <UploadCloud className="h-9 w-9 text-[#1264e8]" />
              </motion.div>

              <h2 className="relative z-10 font-[var(--font-jakarta)] text-xl font-bold text-[#10233f]">
                {isDragging
                  ? "Drop your report here"
                  : "Drag & drop your report"}
              </h2>

              <p className="relative z-10 mt-2 text-sm text-slate-500">
                or select a file from your device
              </p>

              {/* Browse */}

              <label className="relative z-10 mt-6 cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                  onChange={handleInputChange}
                  className="hidden"
                />

                <span className="inline-flex items-center gap-2 rounded-xl bg-[#1264e8] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0958d5]">
                  <UploadCloud className="h-4 w-4" />

                  Browse Files
                </span>
              </label>

              {/* Formats */}

              <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "PDF",
                  "JPG",
                  "PNG",
                  "WEBP",
                ].map((type) => (
                  <span
                    key={type}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {type}
                  </span>
                ))}
              </div>

              <p className="relative z-10 mt-4 text-[11px] text-slate-400">
                Maximum file size: 15 MB
              </p>
            </div>

            {/* =================================================
                ERROR
            ================================================== */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />

                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                SELECTED FILE
            ================================================== */}

            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.98,
                  }}
                  className="mt-5 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60 p-4"
                >
                  <div className="flex items-center gap-4">
                    {/* File icon */}

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      {isPdf ? (
                        <FileText className="h-6 w-6 text-red-500" />
                      ) : (
                        <FileImage className="h-6 w-6 text-[#1264e8]" />
                      )}
                    </div>

                    {/* File info */}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#10233f]">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatFileSize(file.size)}
                        {" · "}
                        {file.type || "Unknown format"}
                      </p>
                    </div>

                    {/* Remove */}

                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove uploaded file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Validation */}

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />

                    File validated successfully
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                CONTINUE
            ================================================== */}

            <motion.button
              type="button"
              whileHover={{
                y: file ? -2 : 0,
              }}
              whileTap={{
                scale: file ? 0.98 : 1,
              }}
              onClick={continueToPrivacy}
              disabled={isUploading}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#1264e8] px-6 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition hover:bg-[#0958d5] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isUploading ? (
                <>
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />

                  Preparing Secure Upload...
                </>
              ) : (
                <>
                  Continue Securely

                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* =================================================
              SIDE INFORMATION
          ================================================== */}

          <motion.aside
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="space-y-5"
          >
            {/* Privacy Card */}

            <div className="relative overflow-hidden rounded-[28px] bg-[#10233f] p-6 text-white shadow-[0_25px_70px_rgba(16,35,63,0.18)]">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <LockKeyhole className="h-6 w-6 text-blue-300" />
                </div>

                <h3 className="font-[var(--font-jakarta)] text-xl font-bold">
                  Privacy comes first.
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Before AI analysis begins, HEKSAA gives
                  you a dedicated privacy step where
                  sensitive information can be reviewed and
                  protected.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Review uploaded information",
                    "Protect personally identifiable data",
                    "Continue only when you're ready",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-xs font-medium text-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Card */}

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(25,75,130,0.07)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1264e8]">
                What happens next
              </p>

              <div className="mt-5 space-y-5">
                {[
                  {
                    number: "01",
                    title: "Privacy Shield",
                    text: "Review and protect sensitive information.",
                  },
                  {
                    number: "02",
                    title: "AI Extraction",
                    text: "Extract biomarkers, values and reference ranges.",
                  },
                  {
                    number: "03",
                    title: "Understand",
                    text: "Get clear explanations and doctor questions.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 0,
                      x: 10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay:
                        0.5 + index * 0.12,
                    }}
                    className="flex gap-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold text-[#1264e8]">
                      {step.number}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#10233f]">
                        {step.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* =====================================================
            BOTTOM TRUST BAR
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/70 px-5 py-4 text-center backdrop-blur sm:flex-row sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700">
                Your report stays under your control
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                HEKSAA is designed around privacy-first
                report analysis.
              </p>
            </div>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            HEKSAA • Medical Intelligence
          </span>
        </motion.div>
      </section>
    </main>
  );
}