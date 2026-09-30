"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  EyeOff,
  FileText,
  Fingerprint,
  LockKeyhole,
  Shield,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
};

export default function PrivacyPage() {
  const router = useRouter();

  const [file, setFile] = useState<UploadedFile | null>(null);
  const [protectionEnabled, setProtectionEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("heksaa-uploaded-file");

    if (!stored) {
      router.replace("/upload");
      return;
    }

    try {
      setFile(JSON.parse(stored));
    } catch {
      router.replace("/upload");
    }
  }, [router]);

  function continueToProcessing() {
    if (!protectionEnabled) {
      return;
    }

    localStorage.setItem(
      "heksaa-privacy-status",
      JSON.stringify({
        enabled: true,
        redactionPreview: true,
        protectedAt: new Date().toISOString(),
      })
    );

    router.push("/processing");
  }

  if (!file) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9fd]">
        <div className="text-sm text-slate-400">
          Preparing your privacy workspace...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#10233f]">
      {/* Navbar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
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
            <ShieldCheck className="h-3.5 w-3.5" />
            Privacy Shield
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-slate-200/70 bg-white/70">
        <div className="mx-auto flex max-w-4xl items-center justify-center px-5 py-5">
          <Step number="01" title="Upload" done />
          <StepLine />
          <Step number="02" title="Privacy Shield" active />
          <StepLine />
          <Step number="03" title="AI Analysis" />
          <StepLine />
          <Step number="04" title="Results" />
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
            <ShieldCheck className="h-7 w-7 text-emerald-600" />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            Privacy Shield
          </p>

          <h1 className="mt-3 font-[var(--font-jakarta)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
            Protect your information
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Before analysis, HEKSAA prepares your report for privacy-aware
            processing and separates personal information from laboratory
            results.
          </p>
        </div>

        {/* Main privacy card */}
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(25,75,130,0.08)]">
          <div className="border-b border-slate-100 bg-slate-50/70 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <FileText className="h-6 w-6 text-[#1264e8]" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-[var(--font-jakarta)] text-base font-extrabold">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Report selected for protected analysis
                </p>
              </div>

              <div className="ml-auto hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600 sm:block">
                Ready
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <PrivacyFeature
                icon={EyeOff}
                title="PII awareness"
                description="Personal identifiers can be separated from report measurements."
              />

              <PrivacyFeature
                icon={Fingerprint}
                title="Data minimization"
                description="Analysis focuses on the information required to understand the report."
              />

              <PrivacyFeature
                icon={LockKeyhole}
                title="Protected workflow"
                description="Your report moves through a dedicated privacy stage before analysis."
              />
            </div>

            {/* Preview */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-[#f8fbff] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Privacy preview
                  </p>

                  <h2 className="mt-1 font-[var(--font-jakarta)] text-base font-extrabold">
                    What HEKSAA focuses on
                  </h2>
                </div>

                <Shield className="h-5 w-5 text-emerald-500" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <PreviewRow
                  icon={UserRound}
                  title="Personal identifiers"
                  status="Protected"
                />

                <PreviewRow
                  icon={FileText}
                  title="Laboratory measurements"
                  status="Analyzed"
                />

                <PreviewRow
                  icon={Fingerprint}
                  title="Sensitive identifiers"
                  status="Minimized"
                />

                <PreviewRow
                  icon={Sparkles}
                  title="Test values & ranges"
                  status="Extracted"
                />
              </div>
            </div>

            {/* Toggle */}
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-xs font-bold text-emerald-800">
                    Privacy protection enabled
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-emerald-700/70">
                    Keep this enabled to continue through the protected
                    analysis workflow.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setProtectionEnabled((value) => !value)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  protectionEnabled
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }`}
                aria-label="Toggle privacy protection"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    protectionEnabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Continue */}
            <button
              onClick={continueToProcessing}
              disabled={!protectionEnabled}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold transition ${
                protectionEnabled
                  ? "bg-[#1264e8] text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:bg-[#0958d5]"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              Protect & Continue to AI Analysis
              <ArrowRight className="h-4 w-4" />
            </button>

            <Link
              href="/upload"
              className="mx-auto mt-4 flex w-fit items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#1264e8]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Change report
            </Link>
          </div>
        </div>

        {/* Safety */}
        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
          <p className="text-center text-[11px] leading-5 text-amber-700">
            <strong>Important:</strong> Privacy protection is part of the
            HEKSAA workflow. Medical reports contain sensitive information;
            review the information you choose to upload and use HEKSAA as an
            educational tool, not as a replacement for professional medical
            advice.
          </p>
        </div>
      </section>
    </main>
  );
}

function Step({
  number,
  title,
  active = false,
  done = false,
}: {
  number: string;
  title: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-extrabold ${
          active
            ? "bg-[#1264e8] text-white shadow-md shadow-blue-500/20"
            : done
              ? "bg-emerald-500 text-white"
              : "bg-slate-100 text-slate-400"
        }`}
      >
        {done ? <Check className="h-4 w-4" /> : number}
      </div>

      <span
        className={`hidden text-[10px] font-bold sm:block ${
          active
            ? "text-[#1264e8]"
            : done
              ? "text-emerald-600"
              : "text-slate-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function StepLine() {
  return (
    <div className="mx-2 h-px w-5 bg-slate-200 sm:mx-4 sm:w-12" />
  );
}

function PrivacyFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
        <Icon className="h-5 w-5 text-[#1264e8]" />
      </div>

      <h3 className="mt-4 font-[var(--font-jakarta)] text-sm font-extrabold">
        {title}
      </h3>

      <p className="mt-2 text-[11px] leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function PreviewRow({
  icon: Icon,
  title,
  status,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
        <Icon className="h-4 w-4 text-[#1264e8]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-600">{title}</p>
        <p className="mt-0.5 text-[9px] text-slate-400">{status}</p>
      </div>

      <Check className="h-4 w-4 text-emerald-500" />
    </div>
  );
}