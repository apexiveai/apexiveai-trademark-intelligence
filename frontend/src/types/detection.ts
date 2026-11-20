
export type DetectionStatus =
  | "idle"
  | "ready"
  | "processing"
  | "completed"
  | "error";

export type RiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface DetectionFile {
  file: File;
  previewUrl: string;
}

export interface TrademarkMatch {
  id: string;
  name: string;
  applicationNumber: string;
  jurisdiction: string;
  niceClass: string;
  similarity: number;
  risk: RiskLevel;
  owner: string;
  status: string;
}

export interface DetectionResult {
  scanId: string;
  fileName: string;
  scannedAt: string;
  totalMatches: number;
  matches: TrademarkMatch[];
}
