
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ScanSearch,
  Search,
  ShieldAlert,
  ChartNoAxesCombined,
  FolderCheck,
  FileBarChart,
  History,
  Settings,
  HelpCircle,
  ShieldCheck,
  Globe2,
} from "lucide-react";

const sections = [
  {
    title: "WORKSPACE",
    items: [
      { label: "Overview", path: "/overview", icon: LayoutDashboard },
      { label: "Logo Detection", path: "/detection", icon: ScanSearch },
      { label: "Trademark Search", path: "/trademark-search", icon: Search },
      { label: "Conflict Analysis", path: "/conflicts", icon: ShieldAlert },
      { label: "Risk Assessment", path: "/risk", icon: ChartNoAxesCombined },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { label: "Evidence Center", path: "/evidence", icon: FolderCheck },
      { label: "Reports", path: "/reports", icon: FileBarChart },
      { label: "Scan History", path: "/history", icon: History },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <ShieldCheck size={24} />
        </div>

        <div className="brand-info">
          <strong>APEXIVEAI</strong>
          <span>TRADEMARK INTELLIGENCE</span>
        </div>
      </div>

      <div className="workspace-selector">
        <div className="workspace-icon">
          <Globe2 size={19} />
        </div>
        <div className="workspace-info">
          <span>Workspace</span>
          <strong>Global Intelligence</strong>
        </div>
      </div>

      <nav className="sidebar-navigation">
        {sections.map((section) => (
          <div className="nav-section" key={section.title}>
            <span className="nav-section-title">{section.title}</span>

            {section.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className="nav-link">
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

        <a href="mailto:support@apexiveai.com" className="nav-link">
          <HelpCircle size={19} />
          <span>Help & Support</span>
        </a>

        <div className="sidebar-footer">
          <div className="footer-indicator" />
          <span>AI Intelligence Platform</span>
        </div>
      </div>
    </aside>
  );
}
