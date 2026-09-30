export type BiomarkerStatus =
  | "normal"
  | "low"
  | "high"
  | "unknown";

export type Biomarker = {
  id: string;

  name: string;

  value: number | string;

  unit: string;

  referenceMin?: number;

  referenceMax?: number;

  referenceText: string;

  status: BiomarkerStatus;

  confidence: number;

  explanation?: string;
};

export type ReportData = {
  id: string;

  fileName: string;

  uploadedAt: string;

  patientName?: string;

  reportDate?: string;

  laboratory?: string;

  biomarkers: Biomarker[];

  extractionConfidence: number;
};