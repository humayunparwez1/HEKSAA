import type { ReportData } from "./report";

const STORAGE_KEY = "heksaa-report";

export function saveReport(report: ReportData): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(report)
    );

    console.log("HEKSAA: Report saved.");

    return true;
  } catch (error) {
    console.error(
      "HEKSAA: Failed to save report:",
      error
    );

    return false;
  }
}

export function getReport(): ReportData | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedReport =
      localStorage.getItem(STORAGE_KEY);

    if (!storedReport) {
      console.log("HEKSAA: No report found in storage.");
      return null;
    }

    const report = JSON.parse(
      storedReport
    ) as ReportData;

    console.log(
      "HEKSAA: Report loaded:",
      report
    );

    return report;
  } catch (error) {
    console.error(
      "HEKSAA: Failed to load report:",
      error
    );

    return null;
  }
}

export function clearReport(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);

  console.log("HEKSAA: Report cleared.");
}