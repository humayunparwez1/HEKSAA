import ReportUploader from "@/components/ReportUploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-xl">
              +
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Medi<span className="text-cyan-400">Lens</span>
              </h1>

              <p className="text-xs text-slate-400">
                Medical Report Demystifier
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#how-it-works" className="hover:text-white">
              How it works
            </a>

            <a href="#privacy" className="hover:text-white">
              Privacy
            </a>

            <button className="rounded-lg border border-white/15 px-4 py-2 hover:bg-white/5">
              About
            </button>
          </div>

        </div>
      </nav>


      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            AI-assisted health literacy
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Understand your medical report
            <span className="text-cyan-400"> in plain language.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Upload a blood test or biochemistry report and get an
            easy-to-understand breakdown of your reported values, reference
            ranges, and questions to discuss with your doctor.
          </p>

          {/* Functional uploader */}
          <ReportUploader />

        </div>
      </section>


      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-t border-white/10 bg-slate-900/40"
      >

        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Simple process
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              From report to understanding
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              The system converts complex laboratory information into a
              structured and easy-to-understand overview.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <Step
              number="01"
              icon="📄"
              title="Upload"
              description="Upload a PDF or image of your laboratory report."
            />

            <Step
              number="02"
              icon="🔎"
              title="Extract"
              description="OCR identifies biomarkers, values, units and reference ranges."
            />

            <Step
              number="03"
              icon="📊"
              title="Understand"
              description="Reported values are compared with the laboratory reference range."
            />

            <Step
              number="04"
              icon="💬"
              title="Prepare"
              description="Get plain-language explanations and questions for your doctor."
            />

          </div>

        </div>
      </section>


      {/* Medical Disclaimer */}
      <section
        id="privacy"
        className="border-t border-white/10"
      >

        <div className="mx-auto max-w-5xl px-6 py-20">

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8 md:p-10">

            <div className="flex flex-col gap-6 md:flex-row md:items-start">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-xl">
                ⚠️
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Important medical disclaimer
                </h2>

                <p className="mt-3 leading-7 text-slate-400">
                  MediLens is an informational tool designed to help users
                  understand laboratory report values. It does not provide a
                  medical diagnosis, replace a doctor, or determine what
                  treatment you should receive.
                </p>

                <p className="mt-3 leading-7 text-slate-400">
                  Abnormal laboratory results can have many possible
                  explanations. Always discuss your results with a qualified
                  healthcare professional.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 MediLens — AI Medical Report Demystifier
          </p>

          <p>
            Informational tool • Not a medical diagnosis
          </p>

        </div>

      </footer>

    </main>
  );
}


/* Reusable process step */

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30">

      <div className="flex items-center justify-between">

        <span className="text-xs font-semibold text-cyan-400">
          {number}
        </span>

        <span className="text-2xl">
          {icon}
        </span>

      </div>

      <h3 className="mt-6 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

    </div>
  );
}