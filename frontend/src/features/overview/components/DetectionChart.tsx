
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const activityData = [
  { day: "Mon", scans: 320, conflicts: 42 },
  { day: "Tue", scans: 480, conflicts: 58 },
  { day: "Wed", scans: 390, conflicts: 37 },
  { day: "Thu", scans: 620, conflicts: 81 },
  { day: "Fri", scans: 550, conflicts: 65 },
  { day: "Sat", scans: 780, conflicts: 92 },
  { day: "Sun", scans: 690, conflicts: 74 },
];

export default function DetectionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={activityData}>
        <defs>
          <linearGradient
            id="scanGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#1ed760" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#1ed760" stopOpacity={0} />
          </linearGradient>

          <linearGradient
            id="conflictGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#f5b942" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#f5b942" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="#303030"
          vertical={false}
          strokeDasharray="4 4"
        />

        <XAxis
          dataKey="day"
          stroke="#777"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#777"
          tickLine={false}
          axisLine={false}
          width={35}
        />

        <Tooltip
          contentStyle={{
            background: "#242424",
            border: "1px solid #383838",
            borderRadius: 12,
            color: "#fff",
          }}
        />

        <Area
          type="monotone"
          dataKey="scans"
          stroke="#1ed760"
          strokeWidth={2.5}
          fill="url(#scanGradient)"
        />

        <Area
          type="monotone"
          dataKey="conflicts"
          stroke="#f5b942"
          strokeWidth={2}
          fill="url(#conflictGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
