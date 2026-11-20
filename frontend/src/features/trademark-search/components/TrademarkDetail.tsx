
import { useState } from "react";
import {
  X,
  ShieldCheck,
  Clock3,
  Building2,
  Globe2,
  FileText,
  CalendarDays,
  Hash,
  Layers3,
} from "lucide-react";

import type { Trademark } from "../../../types/trademark";

type Props = {
  record: Trademark;
  onClose: () => void;
};

type Tab = "profile" | "timeline";

export default function TrademarkDetail({ record, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const statusClass = record.status.toLowerCase();

  return (
    <div className="tm-detail-backdrop" onClick={onClose}>
      <section
        className="tm-detail-workspace"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="tm-workspace-header">
          <div className="tm-workspace-brand">
            <div className="tm-workspace-brand-icon">
              <ShieldCheck size={19} />
            </div>
            <div>
              <strong>TRADEMARK INTELLIGENCE</strong>
              <span>RECORD DETAIL WORKSPACE</span>
            </div>
          </div>

          <button
            className="tm-workspace-close"
            onClick={onClose}
            aria-label="Close trademark details"
          >
            <X size={20} />
          </button>
        </header>

        <div className="tm-workspace-content">
          <div className="tm-profile-heading">
            <div className="tm-mark-preview">
              <span>{record.name}</span>
              <small>WORDMARK PREVIEW</small>
            </div>

            <div className="tm-profile-title">
              <div className="tm-profile-overline">
                {record.id} · {record.country}
              </div>

              <h1>{record.name}</h1>

              <span className={`tm-status tm-status-${statusClass}`}>
                {record.status}
              </span>

              <p>
                Illustrative trademark record. Official registry verification
                is required before relying on this information.
              </p>
            </div>
          </div>

          <nav className="tm-detail-tabs">
            <button
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              <FileText size={16} />
              Trademark Profile
            </button>

            <button
              className={activeTab === "timeline" ? "active" : ""}
              onClick={() => setActiveTab("timeline")}
            >
              <Clock3 size={16} />
              Registration Timeline
            </button>
          </nav>

          {activeTab === "profile" && (
            <div className="tm-profile-content">
              <section className="tm-detail-section">
                <div className="tm-section-title">
                  <FileText size={17} />
                  <h2>Registration Information</h2>
                </div>

                <div className="tm-profile-fields">
                  <DetailField
                    label="Trademark Name"
                    value={record.name}
                  />
                  <DetailField
                    label="Application Number"
                    value={record.applicationNumber}
                    mono
                  />
                  <DetailField
                    label="Registration Number"
                    value={record.registrationNumber}
                    mono
                  />
                  <DetailField
                    label="Current Status"
                    value={record.status}
                  />
                  <DetailField
                    label="Filing Date"
                    value={record.filingDate}
                  />
                  <DetailField
                    label="Registration Date"
                    value={record.registrationDate}
                  />
                </div>
              </section>

              <section className="tm-detail-section">
                <div className="tm-section-title">
                  <Building2 size={17} />
                  <h2>Trademark Owner</h2>
                </div>

                <div className="tm-owner-card">
                  <div className="tm-owner-icon">
                    <Building2 size={23} />
                  </div>

                  <div>
                    <strong>{record.owner}</strong>
                    <span>Illustrative owner record</span>
                  </div>
                </div>
              </section>

              <section className="tm-detail-section">
                <div className="tm-section-title">
                  <Layers3 size={17} />
                  <h2>Goods & Services Classification</h2>
                </div>

                <div className="tm-class-detail">
                  <div className="tm-class-number">
                    {String(record.classNumber).padStart(2, "0")}
                  </div>

                  <div>
                    <strong>
                      Nice Classification — Class{" "}
                      {String(record.classNumber).padStart(2, "0")}
                    </strong>
                    <p>{record.description}</p>
                  </div>
                </div>
              </section>

              <section className="tm-detail-section">
                <div className="tm-section-title">
                  <Globe2 size={17} />
                  <h2>Jurisdiction</h2>
                </div>

                <div className="tm-jurisdiction-card">
                  <Globe2 size={20} />
                  <div>
                    <strong>{record.country}</strong>
                    <span>Jurisdiction in illustrative record</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "timeline" && (
            <section className="tm-detail-section tm-timeline-section">
              <div className="tm-section-title">
                <CalendarDays size={17} />
                <h2>Registration Timeline</h2>
              </div>

              <p className="tm-timeline-intro">
                Recorded events for this illustrative trademark entry.
              </p>

              <div className="tm-timeline">
                {record.events.map((event, index) => (
                  <div
                    className="tm-timeline-item"
                    key={`${event.date}-${index}`}
                  >
                    <div className="tm-timeline-marker" />

                    <div className="tm-timeline-event">
                      <span>{event.date}</span>
                      <strong>{event.title}</strong>
                      <p>{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="tm-detail-disclaimer">
            <ShieldCheck size={17} />
            <p>
              Demo data only. This record is not connected to an official
              trademark registry and does not establish legal ownership,
              registration or protection.
            </p>
          </div>
        </div>

        <footer className="tm-workspace-footer">
          <span>APEXIVEAI · TRADEMARK INTELLIGENCE</span>
          <span>
            <Hash size={12} /> {record.id}
          </span>
        </footer>
      </section>
    </div>
  );
}

function DetailField({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="tm-detail-field">
      <span>{label}</span>
      <strong className={mono ? "tm-mono" : ""}>{value}</strong>
    </div>
  );
}
