
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Globe2,
  FileSearch,
  ShieldCheck,
  X,
  ChevronRight,
  RotateCcw,
  CalendarDays,
  Hash,
} from "lucide-react";
import "./TrademarkSearch.css";
import type { Trademark } from "../../types/trademark";
import TrademarkDetail from "./components/TrademarkDetail";

type Trademark = {
  id: string;
  name: string;
  applicationNumber: string;
  registrationNumber: string;
  owner: string;
  classNumber: number;
  country: string;
  status: string;
  filingDate: string;
  registrationDate: string;
  description: string;
  events: { date: string; title: string; detail: string }[];
};

const demoRecords: Trademark[] = [
  {
    id: "TM-001",
    name: "NOVA",
    applicationNumber: "US-2026-001842",
    registrationNumber: "US-REG-009284",
    owner: "Nova Global Holdings Inc.",
    classNumber: 9,
    country: "United States",
    status: "Registered",
    filingDate: "2025-08-14",
    registrationDate: "2026-03-20",
    description: "Computer software, electronic devices and technology products.",
    events: [
      { date: "2025-08-14", title: "Application Filed", detail: "Trademark application submitted." },
      { date: "2025-10-02", title: "Examination", detail: "Application entered examination." },
      { date: "2026-01-12", title: "Publication", detail: "Application published for opposition." },
      { date: "2026-03-20", title: "Registered", detail: "Registration completed in this illustrative record." },
    ],
  },
  {
    id: "TM-002",
    name: "AURELIA",
    applicationNumber: "EU-2026-008412",
    registrationNumber: "EU-REG-008412",
    owner: "Aurelia Beauty Group Ltd.",
    classNumber: 3,
    country: "European Union",
    status: "Pending",
    filingDate: "2026-02-10",
    registrationDate: "—",
    description: "Cosmetics, skincare and personal care preparations.",
    events: [
      { date: "2026-02-10", title: "Application Filed", detail: "Application submitted." },
      { date: "2026-03-18", title: "Examination", detail: "Examination process initiated." },
      { date: "2026-04-02", title: "Pending", detail: "Awaiting further processing." },
    ],
  },
  {
    id: "TM-003",
    name: "VERTEX",
    applicationNumber: "UK-2026-004219",
    registrationNumber: "—",
    owner: "Vertex Systems Limited",
    classNumber: 35,
    country: "United Kingdom",
    status: "Opposed",
    filingDate: "2025-11-05",
    registrationDate: "—",
    description: "Business management, advertising and commercial services.",
    events: [
      { date: "2025-11-05", title: "Application Filed", detail: "Application submitted." },
      { date: "2026-01-14", title: "Publication", detail: "Application published." },
      { date: "2026-02-20", title: "Opposition", detail: "Opposition recorded in this illustrative record." },
    ],
  },
  {
    id: "TM-004",
    name: "ORBITAL",
    applicationNumber: "SG-2026-002810",
    registrationNumber: "SG-REG-003102",
    owner: "Orbital Digital Pte. Ltd.",
    classNumber: 42,
    country: "Singapore",
    status: "Registered",
    filingDate: "2025-06-12",
    registrationDate: "2026-01-08",
    description: "Technology development, software and IT consultancy.",
    events: [
      { date: "2025-06-12", title: "Application Filed", detail: "Application submitted." },
      { date: "2025-09-10", title: "Examination", detail: "Examination completed." },
      { date: "2026-01-08", title: "Registered", detail: "Registration completed in this illustrative record." },
    ],
  },
  {
    id: "TM-005",
    name: "APEX",
    applicationNumber: "US-2026-006501",
    registrationNumber: "—",
    owner: "Apex Industries LLC",
    classNumber: 7,
    country: "United States",
    status: "Refused",
    filingDate: "2025-12-01",
    registrationDate: "—",
    description: "Industrial machinery and mechanical equipment.",
    events: [
      { date: "2025-12-01", title: "Application Filed", detail: "Application submitted." },
      { date: "2026-02-15", title: "Examination", detail: "Examination completed." },
      { date: "2026-04-10", title: "Refused", detail: "Refusal recorded in this illustrative record." },
    ],
  },
];

const countries = [
  "United States",
  "European Union",
  "United Kingdom",
  "Singapore",
  "Myanmar",
  "Japan",
  "China",
  "Australia",
  "Canada",
  "India",
];

const statuses = [
  "Pending",
  "Registered",
  "Opposed",
  "Refused",
  "Expired",
  "Abandoned",
];

const niceClasses = Array.from({ length: 45 }, (_, i) => i + 1);

export default function TrademarkSearch() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [selected, setSelected] = useState<Trademark | null>(null);

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return demoRecords.filter((record) => {
      const matchesQuery =
        !normalized ||
        (searchType === "all" &&
          [
            record.name,
            record.applicationNumber,
            record.registrationNumber,
            record.owner,
          ].some((value) => value.toLowerCase().includes(normalized))) ||
        (searchType === "name" && record.name.toLowerCase().includes(normalized)) ||
        (searchType === "application" &&
          record.applicationNumber.toLowerCase().includes(normalized)) ||
        (searchType === "registration" &&
          record.registrationNumber.toLowerCase().includes(normalized)) ||
        (searchType === "owner" &&
          record.owner.toLowerCase().includes(normalized));

      return (
        matchesQuery &&
        (!country || record.country === country) &&
        (!status || record.status === status) &&
        (!classNumber || record.classNumber === Number(classNumber))
      );
    });
  }, [query, searchType, country, status, classNumber]);

  function resetFilters() {
    setQuery("");
    setSearchType("all");
    setCountry("");
    setStatus("");
    setClassNumber("");
    setSelected(null);
  }

  return (
    <div className="tm-search-page">
      <div className="tm-search-heading">
        <div>
          <div className="tm-eyebrow">
            <span className="tm-live-dot" />
            GLOBAL REGISTRY INTELLIGENCE
          </div>
          <h1>Trademark Search</h1>
          <p>
            Search and explore trademark records across multiple
            jurisdictions and classification systems.
          </p>
        </div>

        <div className="tm-source-indicator">
          <Globe2 size={17} />
          <span>Global Search Workspace</span>
        </div>
      </div>

      <section className="tm-search-box">
        <div className="tm-search-label">
          <Search size={17} />
          <span>TRADEMARK DATABASE SEARCH</span>
        </div>

        <div className="tm-search-main">
          <div className="tm-query-input">
            <Search size={20} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter trademark name, application number, registration number or owner..."
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                <X size={17} />
              </button>
            )}
          </div>

          <button className="tm-search-button">
            <Search size={17} />
            Search Records
          </button>
        </div>

        <div className="tm-search-type">
          <span>SEARCH BY</span>
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="all">All Fields</option>
            <option value="name">Trademark Name</option>
            <option value="application">Application Number</option>
            <option value="registration">Registration Number</option>
            <option value="owner">Trademark Owner</option>
          </select>
        </div>
      </section>

      <div className="tm-content-grid">
        <aside className="tm-filters">
          <div className="tm-filter-heading">
            <div>
              <SlidersHorizontal size={17} />
              <strong>Search Filters</strong>
            </div>
            <button onClick={resetFilters} title="Reset filters">
              <RotateCcw size={15} />
            </button>
          </div>

          <div className="tm-filter-group">
            <label><Globe2 size={15} /> Country / Jurisdiction</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">All Jurisdictions</option>
              {countries.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="tm-filter-group">
            <label><LayersIcon /> Nice Classification</label>
            <select value={classNumber} onChange={(e) => setClassNumber(e.target.value)}>
              <option value="">All Classes (01–45)</option>
              {niceClasses.map((item) => (
                <option key={item} value={item}>
                  Class {String(item).padStart(2, "0")}
                </option>
              ))}
            </select>
            <span className="tm-filter-hint">International Nice Classification</span>
          </div>

          <div className="tm-filter-group">
            <label><ShieldCheck size={15} /> Trademark Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Statuses</option>
              {statuses.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="tm-filter-note">
            <ShieldCheck size={17} />
            <div>
              <strong>45 Nice Classes</strong>
              <p>Search goods and services classifications from Class 01 to 45.</p>
            </div>
          </div>
        </aside>

        <section className="tm-results">
          <div className="tm-results-header">
            <div>
              <h2>Search Results</h2>
              <p>
                {filteredRecords.length} illustrative records found
              </p>
            </div>
            <span className="tm-demo-badge">DEMO DATA</span>
          </div>

          <div className="tm-results-table-wrap">
            <table className="tm-results-table">
              <thead>
                <tr>
                  <th>TRADEMARK</th>
                  <th>APPLICATION NUMBER</th>
                  <th>OWNER</th>
                  <th>CLASS</th>
                  <th>JURISDICTION</th>
                  <th>STATUS</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong className="tm-record-name">{record.name}</strong>
                      <span className="tm-record-id">{record.id}</span>
                    </td>
                    <td className="tm-mono">{record.applicationNumber}</td>
                    <td>{record.owner}</td>
                    <td><span className="tm-class-tag">{String(record.classNumber).padStart(2, "0")}</span></td>
                    <td>{record.country}</td>
                    <td>
                      <span className={`tm-status tm-status-${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="tm-open-button"
                        onClick={() => setSelected(record)}
                        aria-label={`View ${record.name}`}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={7} className="tm-empty">
                      <FileSearch size={30} />
                      <strong>No matching records</strong>
                      <span>Try another keyword or adjust your filters.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="tm-results-footer">
            <span>Showing {filteredRecords.length} of {demoRecords.length} demo records</span>
            <span>Official registry connections not enabled</span>
          </div>
        </section>
      </div>

      {selected && (
        <TrademarkDetail
          record={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <div className="tm-page-footnote">
        <CalendarDays size={14} />
        Trademark records and timelines shown here are sample data, not official registry results.
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="tm-detail-field">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LayersIcon() {
  return <Hash size={15} />;
}
