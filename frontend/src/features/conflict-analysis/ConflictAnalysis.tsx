
import { useState } from "react";
import {
  ArrowLeftRight,
  ShieldAlert,
  ScanSearch,
  Eye,
  Layers3,
  Palette,
  Type,
  Shapes,
  FileSearch,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Download,
  Info,
  Fingerprint,
  Scale,
} from "lucide-react";

type ComparisonMode = "side" | "overlay" | "difference";

type MatchRecord = {
  id: string;
  name: string;
  application: string;
  owner: string;
  jurisdiction: string;
  class: string;
  similarity: number;
  risk: string;
};

const records: MatchRecord[] = [
  {
    id: "MATCH-001",
    name: "NOVA TECHNOLOGIES",
    application: "US-2026-001842",
    owner: "Nova Global Holdings Inc.",
    jurisdiction: "United States",
    class: "09",
    similarity: 94.8,
    risk: "Critical",
  },
  {
    id: "MATCH-002",
    name: "NOVA DIGITAL",
    application: "EU-2026-008412",
    owner: "Nova Digital Group",
    jurisdiction: "European Union",
    class: "42",
    similarity: 82.4,
    risk: "High",
  },
  {
    id: "MATCH-003",
    name: "NOVA SYSTEMS",
    application: "UK-2026-004219",
    owner: "Nova Systems Ltd.",
    jurisdiction: "United Kingdom",
    class: "35",
    similarity: 61.2,
    risk: "Medium",
  },
];

const factors = [
  {
    label: "Visual Shape Similarity",
    score: 96,
    weight: "High",
    icon: Shapes,
    description: "Overall geometry and symbol structure",
  },
  {
    label: "Color Distribution",
    score: 89,
    weight: "Medium",
    icon: Palette,
    description: "Dominant colors and visual arrangement",
  },
  {
    label: "Textual Similarity",
    score: 92,
    weight: "High",
    icon: Type,
    description: "Extracted brand text and typography",
  },
];

function DemoLogo({
  variant = "original",
}: {
  variant?: "original" | "matched";
}) {
  return (
    <div className={`demo-logo demo-logo-${variant}`}>
      <svg viewBox="0 0 180 180" role="img" aria-label="Illustrative trademark logo">
        {variant === "original" ? (
          <>
            <circle cx="90" cy="90" r="69" fill="#1ed760" opacity=".13" />
            <path
              d="M90 26 L146 58 L146 122 L90 154 L34 122 L34 58 Z"
              fill="none"
              stroke="#1ed760"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <path
              d="M62 112 L90 55 L118 112 M74 92 H106"
              stroke="#1ed760"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        ) : (
          <>
            <circle cx="90" cy="90" r="69" fill="#58a6ff" opacity=".13" />
            <path
              d="M90 24 L149 60 L149 120 L90 156 L31 120 L31 60 Z"
              fill="none"
              stroke="#58a6ff"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <path
              d="M58 114 L90 52 L122 114 M72 91 H108"
              stroke="#58a6ff"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        )}
      </svg>

      <strong>
        {variant === "original" ? "APEX" : "NOVA"}
      </strong>
      <span>ILLUSTRATIVE MARK</span>
    </div>
  );
}

function ScoreBar({
  score,
  color = "#1ed760",
}: {
  score: number;
  color?: string;
}) {
  return (
    <div className="score-bar">
      <div
        className="score-bar-fill"
        style={{
          width: `${score}%`,
          background: color,
        }}
      />
    </div>
  );
}

export default function ConflictAnalysis() {
  const [selectedMatch, setSelectedMatch] = useState(records[0]);
  const [mode, setMode] = useState<ComparisonMode>("side");
  const [overlay, setOverlay] = useState(50);
  const [showDetails, setShowDetails] = useState(true);

  const [originalApplication, setOriginalApplication] = useState(
    "US-2026-001842"
  );

  const [matchedApplication, setMatchedApplication] = useState(
    selectedMatch.application
  );

  const [verificationResult, setVerificationResult] = useState<
    "none" | "match" | "different"
  >("none");

  const verifyApplication = () => {
    const original = originalApplication.trim().toUpperCase();
    const matched = matchedApplication.trim().toUpperCase();

    if (!original || !matched) {
      setVerificationResult("different");
      return;
    }

    setVerificationResult(
      original === matched ? "match" : "different"
    );
  };

  const exportReport = () => {
    const content = [
      "APEXIVEAI - TRADEMARK CONFLICT ANALYSIS",
      "",
      "DEMO REPORT - NOT A LEGAL OPINION",
      `Target: APEX`,
      `Compared trademark: ${selectedMatch.name}`,
      `Application: ${selectedMatch.application}`,
      `Jurisdiction: ${selectedMatch.jurisdiction}`,
      `Nice Class: ${selectedMatch.class}`,
      `Visual similarity: ${selectedMatch.similarity}%`,
      `Illustrative risk: ${selectedMatch.risk}`,
      "",
      "All records and scores in this demonstration are illustrative.",
    ].join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `apexiveai-${selectedMatch.id}-analysis.txt`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="conflict-page">

      <div className="conflict-heading">
        <div>
          <div className="eyebrow">
            <span className="live-dot" />
            TRADEMARK INTELLIGENCE
          </div>

          <h1>Conflict Analysis</h1>

          <p>
            Investigate visual similarities, trademark records
            and potential intellectual property conflicts.
          </p>
        </div>

        <button
          className="primary-action"
          onClick={exportReport}
        >
          <Download size={17} />
          Export Analysis
        </button>
      </div>

      <div className="analysis-reference">
        <div className="reference-item">
          <span>ANALYSIS REFERENCE</span>
          <strong>ATI-2026-000184</strong>
        </div>

        <div className="reference-item">
          <span>ORIGINAL TRADEMARK</span>
          <strong>APEX</strong>
        </div>

        <div className="reference-item">
          <span>DATABASE RECORDS</span>
          <strong>4 Illustrative matches</strong>
        </div>

        <div className="reference-item">
          <span>ANALYSIS STATUS</span>
          <strong className="status-complete">
            <CheckCircle2 size={14} />
            Demo Complete
          </strong>
        </div>
      </div>

      <div className="conflict-grid">

        <section className="panel comparison-panel">

          <div className="panel-header">
            <div>
              <h2>Visual Comparison</h2>
              <p>Compare original and matched trademark artwork</p>
            </div>

            <Eye color="#1ed760" size={20} />
          </div>

          <div className="comparison-toolbar">
            <div className="comparison-tabs">
              <button
                className={mode === "side" ? "selected" : ""}
                onClick={() => setMode("side")}
              >
                <ArrowLeftRight size={15} />
                Side by Side
              </button>

              <button
                className={mode === "overlay" ? "selected" : ""}
                onClick={() => setMode("overlay")}
              >
                <Layers3 size={15} />
                Overlay
              </button>

              <button
                className={mode === "difference" ? "selected" : ""}
                onClick={() => setMode("difference")}
              >
                <ScanSearch size={15} />
                Difference
              </button>
            </div>
          </div>

          {mode === "side" && (
            <div className="comparison-images">
              <div className="comparison-image-card">
                <div className="image-label">
                  <span>ORIGINAL MARK</span>
                  <span className="original-tag">SOURCE</span>
                </div>

                <DemoLogo variant="original" />
                <div className="comparison-image-footer">
                  <strong>APEX</strong>
                  <span>Original uploaded logo</span>
                </div>
              </div>

              <div className="comparison-divider">
                <ArrowLeftRight size={20} />
              </div>

              <div className="comparison-image-card">
                <div className="image-label">
                  <span>MATCHED MARK</span>
                  <span className="matched-tag">DATABASE</span>
                </div>

                <DemoLogo variant="matched" />
                <div className="comparison-image-footer">
                  <strong>{selectedMatch.name}</strong>
                  <span>{selectedMatch.application}</span>
                </div>
              </div>
            </div>
          )}

          {mode === "overlay" && (
            <div className="overlay-workspace">
              <div className="overlay-image">
                <DemoLogo variant="original" />

                <div
                  className="overlay-top"
                  style={{ clipPath: `inset(0 ${100 - overlay}% 0 0)` }}
                >
                  <DemoLogo variant="matched" />
                </div>

                <div
                  className="overlay-divider"
                  style={{ left: `${overlay}%` }}
                />
              </div>

              <div className="overlay-labels">
                <span>Matched Image</span>
                <span>Original Image</span>
              </div>

              <div className="overlay-control">
                <label>Overlay Blend</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlay}
                  onChange={(event) =>
                    setOverlay(Number(event.target.value))
                  }
                />
                <strong>{overlay}%</strong>
              </div>
            </div>
          )}

          {mode === "difference" && (
            <div className="difference-workspace">
              <div className="difference-preview">
                <DemoLogo variant="original" />
                <div className="difference-highlight">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="difference-description">
                <ScanSearch size={20} color="#1ed760" />
                <div>
                  <strong>Illustrative Difference View</strong>
                  <p>
                    Highlighted regions are demonstration graphics.
                    Real pixel-level difference analysis will be
                    connected to the image comparison engine.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="similarity-summary">
            <div>
              <span>VISUAL SIMILARITY</span>
              <strong>{selectedMatch.similarity}%</strong>
            </div>

            <div className="similarity-meter">
              <ScoreBar score={selectedMatch.similarity} />
              <span>
                Demonstration similarity score
              </span>
            </div>
          </div>

        </section>

        <section className="panel match-selector-panel">

          <div className="panel-header">
            <div>
              <h2>Matched Trademarks</h2>
              <p>Select a record to inspect</p>
            </div>

            <span className="match-count">03</span>
          </div>

          <div className="match-selector-list">
            {records.map((record) => (
              <button
                className={`match-selector-item ${
                  selectedMatch.id === record.id ? "active" : ""
                }`}
                key={record.id}
                onClick={() => {
                  setSelectedMatch(record);
                  setMatchedApplication(record.application);
                  setVerificationResult("none");
                }}
              >
                <div className="match-selector-icon">
                  <Fingerprint size={19} />
                </div>

                <div className="match-selector-info">
                  <strong>{record.name}</strong>
                  <span>{record.application}</span>
                  <span>{record.jurisdiction}</span>
                </div>

                <div className="match-selector-score">
                  <strong>{record.similarity}%</strong>
                  <span>{record.risk}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            className="show-details-button"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide" : "Show"} selected record details
            <ChevronRight
              size={16}
              style={{
                transform: showDetails ? "rotate(90deg)" : "none",
              }}
            />
          </button>

          {showDetails && (
            <div className="selected-record-details">
              <div>
                <span>Trademark Owner</span>
                <strong>{selectedMatch.owner}</strong>
              </div>

              <div>
                <span>Jurisdiction</span>
                <strong>{selectedMatch.jurisdiction}</strong>
              </div>

              <div>
                <span>Nice Classification</span>
                <strong>Class {selectedMatch.class}</strong>
              </div>

              <div>
                <span>Application Number</span>
                <strong>{selectedMatch.application}</strong>
              </div>
            </div>
          )}

        </section>

      </div>

      <section className="panel factor-panel">
        <div className="panel-header">
          <div>
            <h2>Similarity Factor Analysis</h2>
            <p>Illustrative individual feature scores</p>
          </div>

          <Info size={19} color="#1ed760" />
        </div>

        <div className="factor-grid">
          {factors.map((factor) => {
            const Icon = factor.icon;

            return (
              <div className="factor-card" key={factor.label}>
                <div className="factor-card-top">
                  <div className="factor-icon">
                    <Icon size={19} />
                  </div>

                  <span>{factor.weight} Priority</span>
                </div>

                <strong className="factor-score">
                  {factor.score}%
                </strong>

                <span className="factor-label">
                  {factor.label}
                </span>

                <ScoreBar score={factor.score} />

                <p>{factor.description}</p>
              </div>
            );
          })}
        </div>

        <div className="factor-disclaimer">
          <Info size={15} />
          These factor values are illustrative and are not calculated
          from the displayed artwork. Actual scores require validated
          image, OCR and matching algorithms.
        </div>
      </section>

      <div className="conflict-grid bottom-analysis-grid">

        <section className="panel risk-analysis-panel">
          <div className="panel-header">
            <div>
              <h2>Risk Assessment</h2>
              <p>Potential conflict indicators</p>
            </div>

            <ShieldAlert color="#ff7373" size={20} />
          </div>

          <div className="risk-main">
            <div className="risk-number">
              <strong>{selectedMatch.similarity.toFixed(1)}</strong>
              <span>Illustrative score</span>
            </div>

            <span
              className={`risk-badge risk-${selectedMatch.risk.toLowerCase()}`}
            >
              {selectedMatch.risk.toUpperCase()}
            </span>
          </div>

          <div className="risk-indicators">
            <div>
              <span>Visual resemblance</span>
              <strong>High</strong>
            </div>

            <div>
              <span>Classification overlap</span>
              <strong>Requires verification</strong>
            </div>

            <div>
              <span>Jurisdiction overlap</span>
              <strong>Requires verification</strong>
            </div>

            <div>
              <span>Legal conflict conclusion</span>
              <strong>Not determined</strong>
            </div>
          </div>

          <div className="risk-notice">
            <AlertTriangle size={16} />
            A high visual similarity score does not independently
            establish infringement or likelihood of confusion.
          </div>
        </section>

        <section className="panel verification-panel">
          <div className="panel-header">
            <div>
              <h2>Exact Application Verification</h2>
              <p>Independent application number comparison</p>
            </div>

            <Fingerprint color="#1ed760" size={21} />
          </div>

          <div className="verification-field">
            <label>Original Application Number</label>
            <input
              value={originalApplication}
              onChange={(event) => {
                setOriginalApplication(event.target.value);
                setVerificationResult("none");
              }}
              placeholder="Enter original application number"
            />
          </div>

          <div className="verification-field">
            <label>Matched Application Number</label>
            <input
              value={matchedApplication}
              onChange={(event) => {
                setMatchedApplication(event.target.value);
                setVerificationResult("none");
              }}
              placeholder="Enter matched application number"
            />
          </div>

          <button
            className="verify-button"
            onClick={verifyApplication}
          >
            <FileSearch size={17} />
            Verify Exact Number
          </button>

          {verificationResult === "match" && (
            <div className="verification-result exact-match">
              <CheckCircle2 size={18} />
              <div>
                <strong>Exact Number Match</strong>
                <p>The normalized application numbers are identical.</p>
              </div>
            </div>
          )}

          {verificationResult === "different" && (
            <div className="verification-result different-match">
              <XCircle size={18} />
              <div>
                <strong>Numbers Do Not Match</strong>
                <p>
                  The numbers differ or one of the fields is empty.
                  This does not rule out trademark similarity.
                </p>
              </div>
            </div>
          )}

          <div className="verification-note">
            <Scale size={16} />
            Exact application number matching is separate from
            visual similarity and legal risk assessment.
          </div>
        </section>

      </div>

      <div className="analysis-footer">
        <span>
          APEXIVEAI · TRADEMARK INTELLIGENCE
        </span>

        <span>
          DEMONSTRATION ANALYSIS · NOT A LEGAL OPINION
        </span>
      </div>

    </div>
  );
}
