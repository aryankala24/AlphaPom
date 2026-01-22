import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const mockSessionData = [
  { day: "Mon", sessions: 3 },
  { day: "Tue", sessions: 5 },
  { day: "Wed", sessions: 4 },
  { day: "Thu", sessions: 6 },
  { day: "Fri", sessions: 2 },
  { day: "Sat", sessions: 4 },
  { day: "Sun", sessions: 1 },
];

const productivityData = [
  { name: "Focus", value: 75 },
  { name: "Break", value: 20 },
  { name: "Idle", value: 5 },
];

export default function Stats() {
  return (
    <div className="text-white max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Pomodoro Stats</h2>

      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Weekly Sessions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockSessionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Productivity Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
