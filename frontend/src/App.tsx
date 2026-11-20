
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Overview from "./features/overview/Overview";
import DetectionStudio from "./features/detection/DetectionStudio";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/detection" element={<DetectionStudio />} />

        <Route
          path="*"
          element={<Navigate to="/overview" replace />}
        />
      </Route>
    </Routes>
  );
}
