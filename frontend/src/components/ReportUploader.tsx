"use client";

import { useRef, useState } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export default function ReportUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState("");

  function validateFile(selectedFile: File) {
    setError("");

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Please upload a PDF, JPG, JPEG, or PNG file.");
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10 MB.");
      return false;
    }

    return true;
  }

  function handleFile(selectedFile: File) {
    setError("");
    setResult("");

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  }

  function removeFile() {
    setFile(null);
    setError("");
    setResult("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  async function analyzeReport() {
    if (!file) {
      setError("Please select a report first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("The backend could not process the report.");
      }

      const data = await response.json();

      setResult(
        `Backend received "${data.filename}" successfully.`
      );

    } catch (error) {
      console.error(error);

      setError(
        "Could not connect to the MediLens backend. Make sure the FastAPI server is running."
      );

    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="mx-auto mt-12 max-w-2xl">

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Upload area */}
      {!file ? (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-3xl border bg-white/[0.04] p-3 shadow-2xl transition ${
            isDragging
              ? "border-cyan-400 bg-cyan-400/5"
              : "border-white/10"
          }`}
        >
          <div
            className={`rounded-2xl border-2 border-dashed px-6 py-14 transition ${
              isDragging
                ? "border-cyan-400 bg-cyan-400/5"
                : "border-slate-700 bg-slate-900/70"
            }`}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-3xl">
              📄
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Upload your medical report
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {isDragging
                ? "Drop your report here"
                : "Drag & drop your report here or select a file"}
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-7 rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Select Report
            </button>

            <p className="mt-4 text-xs text-slate-500">
              Supported formats: PDF, JPG, JPEG, PNG • Maximum 10 MB
            </p>
          </div>
        </div>
      ) : (
        /* Selected file */
        <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.04] p-6 shadow-2xl">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
              📄
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-semibold text-white">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {formatFileSize(file.size)}
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={isAnalyzing}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              Remove
            </button>

          </div>

          <button
            type="button"
            onClick={analyzeReport}
            disabled={isAnalyzing}
            className="mt-6 w-full rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAnalyzing ? "Sending Report..." : "Analyze Report"}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            Your report is sent to the MediLens backend for processing.
          </p>

        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
          ⚠️ {error}
        </div>
      )}

      {/* Success */}
      {result && (
        <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
          ✓ {result}
        </div>
      )}

      {/* Privacy notice */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
        <span>🔒</span>

        <span>
          Your report contains sensitive information. Privacy protection
          will be applied before AI processing.
        </span>
      </div>

    </div>
  );
}