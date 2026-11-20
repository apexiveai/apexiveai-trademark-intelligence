
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import {
  UploadCloud,
  Image as ImageIcon,
  ScanSearch,
  Trash2,
  Crop,
  RotateCcw,
  ShieldCheck,
  Globe2,
  FileImage,
  X,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  ArrowRight,
  Download,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import { createCroppedImage } from "../../lib/imageProcessing";
import type {
  DetectionResult,
  RiskLevel,
} from "../../types/detection";

const MAX_FILE_SIZE = 15 * 1024 * 1024;

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const niceClasses = [
  { value: "09", label: "09 — Computer & Technology" },
  { value: "03", label: "03 — Cosmetics & Cleaning" },
  { value: "25", label: "25 — Clothing & Footwear" },
  { value: "35", label: "35 — Advertising & Business" },
  { value: "36", label: "36 — Financial Services" },
  { value: "41", label: "41 — Education & Entertainment" },
  { value: "42", label: "42 — Technology Services" },
  { value: "05", label: "05 — Pharmaceuticals" },
  { value: "14", label: "14 — Jewelry & Watches" },
  { value: "18", label: "18 — Leather Goods" },
];

const jurisdictions = [
  "International / All Jurisdictions",
  "United States",
  "European Union",
  "United Kingdom",
  "Japan",
  "South Korea",
  "China",
  "Singapore",
  "Thailand",
  "Myanmar",
  "India",
  "Australia",
];

function getRisk(score: number): RiskLevel {
  if (score >= 90) return "critical";
  if (score >= 75) return "high";
  if (score >= 50) return "medium";
  return "low";
}

function generateDemoResult(fileName: string): DetectionResult {
  const samples = [
    {
      name: "NOVA TECHNOLOGIES",
      app: "US-2026-001842",
      jurisdiction: "United States",
      class: "09",
      similarity: 94.8,
      owner: "Nova Global Holdings Inc.",
    },
    {
      name: "AURELIA",
      app: "EU-2026-008412",
      jurisdiction: "European Union",
      class: "03",
      similarity: 82.4,
      owner: "Aurelia International Ltd.",
    },
    {
      name: "VERTEX GROUP",
      app: "UK-2026-004219",
      jurisdiction: "United Kingdom",
      class: "35",
      similarity: 61.2,
      owner: "Vertex Enterprises Ltd.",
    },
    {
      name: "ORBITAL",
      app: "SG-2026-003182",
      jurisdiction: "Singapore",
      class: "42",
      similarity: 28.6,
      owner: "Orbital Systems Pte Ltd.",
    },
  ];

  const matches = samples.map((item, index) => ({
    id: `DEMO-${index + 1}`,
    name: item.name,
    applicationNumber: item.app,
    jurisdiction: item.jurisdiction,
    niceClass: item.class,
    similarity: item.similarity,
    risk: getRisk(item.similarity),
    owner: item.owner,
    status: "Illustrative record",
  }));

  return {
    scanId: `DEMO-${Date.now()}`,
    fileName,
    scannedAt: new Date().toISOString(),
    totalMatches: matches.length,
    matches,
  };
}

export default function DetectionStudio() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);

  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const [trademarkName, setTrademarkName] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [niceClass, setNiceClass] = useState("09");
  const [jurisdiction, setJurisdiction] = useState(
    "International / All Jurisdictions"
  );

  const [status, setStatus] = useState<"idle" | "processing" | "completed" | "error">("idle");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState("");

  const clearCrop = useCallback(() => {
    if (croppedPreview) {
      URL.revokeObjectURL(croppedPreview);
    }

    setCroppedBlob(null);
    setCroppedPreview(null);
  }, [croppedPreview]);

  const clearImage = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    clearCrop();

    setFile(null);
    setPreview(null);
    setResult(null);
    setError("");
    setStatus("idle");
    setShowCropper(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [preview, clearCrop]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (croppedPreview) URL.revokeObjectURL(croppedPreview);
    };
  }, [preview, croppedPreview]);

  const handleFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    setError("");

    if (!acceptedTypes.includes(selectedFile.type)) {
      setError("Unsupported format. Please upload JPG, PNG or WEBP.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 15 MB. Please upload a smaller image.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    clearCrop();

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setStatus("idle");
  };

  const onCropComplete = useCallback(
    (_: Area, pixels: Area) => {
      setCroppedArea(pixels);
    },
    []
  );

  const saveCrop = async () => {
    if (!preview || !croppedArea) return;

    try {
      const blob = await createCroppedImage(preview, croppedArea);
      clearCrop();

      const url = URL.createObjectURL(blob);

      setCroppedBlob(blob);
      setCroppedPreview(url);
      setShowCropper(false);
    } catch {
      setError("Unable to crop image. Please try again.");
    }
  };

  const resetCrop = () => {
    clearCrop();
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setShowCropper(false);
  };

  const analyzeLogo = async () => {
    if (!file) {
      setError("Please upload a logo before starting analysis.");
      return;
    }

    setError("");
    setResult(null);
    setStatus("processing");

    try {
      // Demonstration only.
      // Replace with the Django API integration later.
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const demoResult = generateDemoResult(file.name);

      setResult(demoResult);
      setStatus("completed");
    } catch {
      setStatus("error");
      setError("Analysis failed. Please try again.");
    }
  };

  const downloadImage = () => {
    const source = croppedPreview || preview;
    if (!source) return;

    const link = document.createElement("a");
    link.href = source;
    link.download = `apexiveai-${file?.name || "logo"}`;
    link.click();
  };

  const imageSource = croppedPreview || preview;

  return (
    <div className="detection-page">

      <div className="detection-heading">
        <div>
          <div className="eyebrow">
            <span className="live-dot" />
            AI INTELLIGENCE WORKSPACE
          </div>

          <h1>Logo Detection Studio</h1>

          <p>
            Identify visual similarities and potential trademark conflicts
            across global intellectual property records.
          </p>
        </div>

        <div className="studio-status">
          <span />
          Studio Ready
        </div>
      </div>

      <div className="detection-workspace">

        <div className="detection-main">

          <section className="panel upload-panel">
            <div className="panel-header">
              <div>
                <h2>Upload Trademark Logo</h2>
                <p>Start by uploading your trademark image</p>
              </div>

              <div className="upload-format">
                <FileImage size={17} />
                <span>IMAGE INPUT</span>
              </div>
            </div>

            {!preview ? (
              <div
                className={`upload-dropzone ${dragging ? "drag-active" : ""}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  handleFile(event.dataTransfer.files[0]);
                }}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(event) => {
                    handleFile(event.target.files?.[0]);
                  }}
                />

                <div className="upload-icon">
                  <UploadCloud size={32} />
                </div>

                <h3>Drop your trademark logo here</h3>

                <p>
                  Drag and drop your image, or browse files from your device.
                </p>

                <button
                  className="primary-action"
                  onClick={() => inputRef.current?.click()}
                >
                  <UploadCloud size={17} />
                  Browse Images
                </button>

                <div className="upload-requirements">
                  <span>JPG</span>
                  <span>PNG</span>
                  <span>WEBP</span>
                  <i />
                  <span>Maximum 15 MB</span>
                </div>
              </div>
            ) : (
              <div className="image-workspace">
                <div className="image-workspace-header">
                  <div className="file-info">
                    <div className="file-icon">
                      <ImageIcon size={19} />
                    </div>

                    <div>
                      <strong>{file?.name}</strong>
                      <span>
                        {file
                          ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <button
                    className="icon-button"
                    onClick={clearImage}
                    aria-label="Remove image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="image-preview-stage">
                  <div className="image-preview-container">
                    <img
                      src={imageSource || ""}
                      alt="Trademark logo preview"
                    />
                  </div>

                  <div className="preview-watermark">
                    <ShieldCheck size={15} />
                    ORIGINAL IMAGE PREVIEW
                  </div>
                </div>

                <div className="image-toolbar">
                  <button
                    className="secondary-action"
                    onClick={() => setShowCropper(true)}
                  >
                    <Crop size={16} />
                    Crop Image
                  </button>

                  <button
                    className="secondary-action"
                    onClick={resetCrop}
                  >
                    <RotateCcw size={16} />
                    Reset Crop
                  </button>

                  <button
                    className="secondary-action"
                    onClick={downloadImage}
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>

                {croppedPreview && (
                  <div className="crop-success">
                    <CheckCircle2 size={15} />
                    Cropped image ready for analysis
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="detection-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </section>

          <section className="panel configuration-panel">
            <div className="panel-header">
              <div>
                <h2>Detection Configuration</h2>
                <p>Define the trademark search parameters</p>
              </div>

              <ShieldCheck color="#1ed760" size={21} />
            </div>

            <div className="form-grid">

              <div className="field-group full-field">
                <label>Trademark / Brand Name</label>
                <input
                  value={trademarkName}
                  onChange={(event) => setTrademarkName(event.target.value)}
                  placeholder="Enter trademark or brand name..."
                />
              </div>

              <div className="field-group">
                <label>Application Number</label>
                <input
                  value={applicationNumber}
                  onChange={(event) =>
                    setApplicationNumber(event.target.value)
                  }
                  placeholder="Optional application number"
                />
              </div>

              <div className="field-group">
                <label>Nice Classification</label>

                <div className="select-wrapper">
                  <select
                    value={niceClass}
                    onChange={(event) => setNiceClass(event.target.value)}
                  >
                    {niceClasses.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} />
                </div>
              </div>

              <div className="field-group full-field">
                <label>Target Jurisdiction</label>

                <div className="select-wrapper">
                  <select
                    value={jurisdiction}
                    onChange={(event) =>
                      setJurisdiction(event.target.value)
                    }
                  >
                    {jurisdictions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} />
                </div>
              </div>

            </div>

            <div className="configuration-note">
              <Globe2 size={17} />
              <span>
                Jurisdiction and classification filters will be
                applied when connected to the trademark database.
              </span>
            </div>
          </section>

          <section className="analysis-action-panel">
            <div className="analysis-action-copy">
              <div className="analysis-icon">
                <Sparkles size={22} />
              </div>

              <div>
                <h3>Ready to analyze your trademark?</h3>
                <p>
                  Compare visual features and identify potential conflicts.
                </p>
              </div>
            </div>

            <button
              className="analyze-button"
              onClick={analyzeLogo}
              disabled={!file || status === "processing"}
            >
              {status === "processing" ? (
                <>
                  <LoaderCircle className="spin-icon" size={18} />
                  Processing...
                </>
              ) : (
                <>
                  <ScanSearch size={19} />
                  Analyze Trademark
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </section>

          {status === "processing" && (
            <div className="processing-panel">
              <LoaderCircle className="spin-icon" size={24} />
              <div>
                <strong>Preparing analysis...</strong>
                <p>Demonstration processing is in progress.</p>
              </div>
            </div>
          )}

          {result && (
            <section className="panel result-panel">
              <div className="panel-header">
                <div>
                  <div className="eyebrow">ANALYSIS COMPLETE</div>
                  <h2>Detection Results</h2>
                  <p>
                    Scan reference: {result.scanId}
                  </p>
                </div>

                <div className="result-indicator">
                  <CheckCircle2 size={17} />
                  Demo Complete
                </div>
              </div>

              <div className="result-summary-grid">
                <div>
                  <span>Total Matches</span>
                  <strong>{result.totalMatches}</strong>
                </div>

                <div>
                  <span>Highest Similarity</span>
                  <strong>
                    {Math.max(
                      ...result.matches.map((match) => match.similarity)
                    ).toFixed(1)}%
                  </strong>
                </div>

                <div>
                  <span>Jurisdiction</span>
                  <strong>{jurisdiction === "International / All Jurisdictions" ? "Global" : jurisdiction}</strong>
                </div>

                <div>
                  <span>Nice Class</span>
                  <strong>{niceClass}</strong>
                </div>
              </div>

              <div className="demo-disclaimer">
                <AlertCircle size={16} />
                These are illustrative demo records, not actual AI
                detections or verified trademark database matches.
              </div>

              <div className="result-list">
                {result.matches.map((match) => (
                  <div className="match-row" key={match.id}>
                    <div className="match-info">
                      <strong>{match.name}</strong>
                      <span>
                        {match.applicationNumber} · {match.jurisdiction}
                      </span>
                      <span>
                        Owner: {match.owner} · Class {match.niceClass}
                      </span>
                    </div>

                    <div className="match-score">
                      <strong>{match.similarity}%</strong>
                      <span
                        className={`risk-badge risk-${match.risk}`}
                      >
                        {match.risk.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="secondary-action"
                onClick={() => {
                  setResult(null);
                  setStatus("idle");
                }}
              >
                <RotateCcw size={15} />
                Clear Results
              </button>
            </section>
          )}

        </div>

        <aside className="detection-aside">

          <section className="panel guide-panel">
            <div className="aside-heading">
              <div className="aside-icon">
                <ScanSearch size={19} />
              </div>
              <h3>Detection Guide</h3>
            </div>

            <div className="guide-steps">
              {[
                ["01", "Upload Logo", "Upload a clear trademark image."],
                ["02", "Adjust Image", "Crop unnecessary background areas."],
                ["03", "Set Parameters", "Choose class and jurisdiction."],
                ["04", "Analyze", "Start the trademark analysis."],
                ["05", "Review Results", "Evaluate potential conflicts."],
              ].map((item) => (
                <div className="guide-step" key={item[0]}>
                  <div className="step-number">{item[0]}</div>
                  <div>
                    <strong>{item[1]}</strong>
                    <p>{item[2]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel quality-panel">
            <div className="aside-heading">
              <ShieldCheck size={19} color="#1ed760" />
              <h3>Image Requirements</h3>
            </div>

            {[
              "High resolution images",
              "Clear logo visibility",
              "Minimal background noise",
              "Original logo proportions",
              "Supported image formats",
            ].map((item) => (
              <div className="requirement-item" key={item}>
                <CheckCircle2 size={15} />
                <span>{item}</span>
              </div>
            ))}
          </section>

          <section className="panel security-panel">
            <div className="aside-heading">
              <ShieldCheck size={19} color="#1ed760" />
              <h3>Data Protection</h3>
            </div>

            <p>
              Trademark images may contain confidential
              intellectual property. Production processing
              will use authenticated and access-controlled
              file storage.
            </p>

            <div className="security-status">
              <span />
              Local preview mode
            </div>
          </section>

        </aside>
      </div>

      {showCropper && preview && (
        <div className="crop-modal-backdrop">
          <div className="crop-modal">

            <div className="crop-modal-header">
              <div>
                <h2>Crop Trademark Image</h2>
                <p>Adjust the selection to isolate your logo.</p>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowCropper(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="cropper-container">
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="zoom-control">
              <span>Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(event) =>
                  setZoom(Number(event.target.value))
                }
              />
              <strong>{zoom.toFixed(1)}x</strong>
            </div>

            <div className="crop-modal-actions">
              <button
                className="secondary-action"
                onClick={() => setShowCropper(false)}
              >
                Cancel
              </button>

              <button
                className="primary-action"
                onClick={saveCrop}
              >
                <Crop size={16} />
                Apply Crop
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
