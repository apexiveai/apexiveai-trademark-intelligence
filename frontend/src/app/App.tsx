
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

// Load feature pages only when their routes are visited.
const Overview = lazy(
  () => import("../features/overview/Overview")
);

const DetectionStudio = lazy(
  () => import("../features/detection/DetectionStudio")
);

const ConflictAnalysis = lazy(
  () => import("../features/conflict-analysis/ConflictAnalysis")
);

const TrademarkSearch = lazy(
  () => import("../features/trademark-search/TrademarkSearch")
);

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "14px",
        color: "#a1a1aa",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "3px solid rgba(255,255,255,0.12)",
          borderTopColor: "#1ed760",
          borderRadius: "50%",
          animation: "apexive-spin 0.8s linear infinite",
        }}
      />

      <span
        style={{
          fontSize: "12px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        Loading workspace...
      </span>

      <style>
        {`
          @keyframes apexive-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={<Navigate to="/overview" replace />}
          />

          <Route
            path="/overview"
            element={<Overview />}
          />

          <Route
            path="/detection"
            element={<DetectionStudio />}
          />

          <Route
            path="/conflicts"
            element={<ConflictAnalysis />}
          />
          
          <Route
            path="/trademark-search"
            element={<TrademarkSearch />}
          />

          <Route
            path="*"
            element={<Navigate to="/overview" replace />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
