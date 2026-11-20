
import { motion } from "framer-motion";
import {
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Clock3,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

const DetectionChart = lazy(
  () => import("./components/DetectionChart")
);

const stats = [
  {
    label: "Total Logo Scans",
    value: "12,840",
    change: "+18.6%",
    icon: ScanSearch,
    color: "#1ed760",
  },
  {
    label: "Potential Conflicts",
    value: "1,284",
    change: "+8.2%",
    icon: ShieldAlert,
    color: "#f5b942",
  },
  {
    label: "High Risk Detected",
    value: "186",
    change: "-4.3%",
    icon: Activity,
    color: "#ff6262",
  },
  {
    label: "Protected Trademarks",
    value: "8,492",
    change: "+12.8%",
    icon: ShieldCheck,
    color: "#58a6ff",
  },
];


const recentScans = [
  {
    name: "NOVA Technologies",
    application: "TM-2026-001842",
    jurisdiction: "United States",
    class: "Class 09",
    similarity: "94.8%",
    risk: "Critical",
  },
  {
    name: "AURELIA",
    application: "TM-2026-001831",
    jurisdiction: "European Union",
    class: "Class 03",
    similarity: "82.4%",
    risk: "High",
  },
  {
    name: "VERTEX GROUP",
    application: "TM-2026-001819",
    jurisdiction: "United Kingdom",
    class: "Class 35",
    similarity: "61.2%",
    risk: "Medium",
  },
  {
    name: "ORBITAL",
    application: "TM-2026-001802",
    jurisdiction: "Singapore",
    class: "Class 42",
    similarity: "28.6%",
    risk: "Low",
  },
];

export default function Overview() {
  return (
    <div className="overview-page">
      <div className="welcome-section">
        <div>
          <div className="eyebrow">
            <span className="live-dot" />
            GLOBAL INTELLIGENCE WORKSPACE
          </div>

          <h1>Trademark Intelligence</h1>

          <p>
            Monitor, analyze and protect intellectual property
            with AI-powered trademark intelligence.
          </p>
        </div>

        <Link to="/detection" className="primary-action">
          <Plus size={18} />
          New Logo Scan
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              className="stat-card"
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="stat-top">
                <div
                  className="stat-icon"
                  style={{ color: stat.color }}
                >
                  <Icon size={21} />
                </div>

                <span className="stat-change">
                  <TrendingUp size={13} />
                  {stat.change}
                </span>
              </div>

              <span className="stat-label">{stat.label}</span>
              <strong className="stat-value">{stat.value}</strong>

              <span className="stat-caption">
                Compared to previous period
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <section className="panel activity-panel">
          <div className="panel-header">
            <div>
              <h2>Detection Activity</h2>
              <p>Trademark scanning performance</p>
            </div>

            <button className="period-button">
              Last 7 days
            </button>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-green" />
              Logo scans
            </span>

            <span>
              <i className="legend-yellow" />
              Potential conflicts
            </span>
          </div>
          <div className="activity-chart">
            <Suspense
              fallback={
                <div className="chart-loading">
                  Loading detection analytics...
                </div>
              }
            >
              <DetectionChart />
            </Suspense>
          </div>
        </section>

        <section className="panel intelligence-panel">
          <div className="panel-header">
            <div>
              <h2>Intelligence Overview</h2>
              <p>Current detection distribution</p>
            </div>
          </div>

          <div className="intelligence-score">
            <div className="score-circle">
              <strong>94.2</strong>
              <span>INDEX</span>
            </div>
          </div>

          <div className="intelligence-description">
            <div className="score-indicator" />
            <div>
              <strong>Detection Performance</strong>
              <p>Illustrative platform performance index</p>
            </div>
          </div>

          <div className="intelligence-footer">
            <Globe2 size={16} />
            Global Intelligence Network
          </div>
        </section>
      </div>

      <section className="panel recent-panel">
        <div className="panel-header">
          <div>
            <h2>Recent Trademark Scans</h2>
            <p>Latest trademark detection activities</p>
          </div>

          <Link to="/history" className="text-action">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <div className="table-wrapper">
          <table className="scans-table">
            <thead>
              <tr>
                <th>TRADEMARK</th>
                <th>APPLICATION ID</th>
                <th>JURISDICTION</th>
                <th>CLASS</th>
                <th>SIMILARITY</th>
                <th>RISK LEVEL</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {recentScans.map((scan) => (
                <tr key={scan.application}>
                  <td>
                    <strong>{scan.name}</strong>
                  </td>

                  <td className="muted-cell">
                    {scan.application}
                  </td>

                  <td>{scan.jurisdiction}</td>

                  <td>{scan.class}</td>

                  <td>
                    <strong>{scan.similarity}</strong>
                  </td>

                  <td>
                    <span
                      className={`risk-badge risk-${scan.risk.toLowerCase()}`}
                    >
                      {scan.risk}
                    </span>
                  </td>

                  <td>
                    <button
                      className="table-icon-button"
                      aria-label={`Open ${scan.name}`}
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="dashboard-bottom">
        <div className="bottom-note">
          <Clock3 size={15} />
          Dashboard currently displays illustrative demo data.
        </div>

        <span>APEXIVEAI · TRADEMARK INTELLIGENCE</span>
      </div>
    </div>
  );
}
