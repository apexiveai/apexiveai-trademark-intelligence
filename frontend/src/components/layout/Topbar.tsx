
import { Bell, Search, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search trademarks, logos, applications..."
          aria-label="Search platform"
        />
        <kbd>⌘ K</kbd>
      </div>

      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="topbar-divider" />

        <button className="profile-button">
          <div className="profile-avatar">BH</div>
          <div className="profile-details">
            <strong>Administrator</strong>
            <span>Workspace Owner</span>
          </div>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}
