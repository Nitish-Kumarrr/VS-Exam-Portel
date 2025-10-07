import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function GlobalDashboard() {
  const [period, setPeriod] = useState("daily");

  // Dummy Revenue Data
  const data = {
    daily: [
      { name: "Mon", revenue: 1200 },
      { name: "Tue", revenue: 1500 },
      { name: "Wed", revenue: 900 },
      { name: "Thu", revenue: 2000 },
      { name: "Fri", revenue: 1700 },
      { name: "Sat", revenue: 2500 },
      { name: "Sun", revenue: 1800 },
    ],
    monthly: [
      { name: "Jan", revenue: 22000 },
      { name: "Feb", revenue: 18000 },
      { name: "Mar", revenue: 25000 },
      { name: "Apr", revenue: 20000 },
      { name: "May", revenue: 27000 },
      { name: "Jun", revenue: 30000 },
    ],
    yearly: [
      { name: "2021", revenue: 200000 },
      { name: "2022", revenue: 280000 },
      { name: "2023", revenue: 350000 },
      { name: "2024", revenue: 420000 },
      { name: "2025", revenue: 460000 },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Revenue Analysis ({period.charAt(0).toUpperCase() + period.slice(1)})
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => setPeriod("daily")}
            className={`px-3 py-1 rounded-lg ${
              period === "daily" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-3 py-1 rounded-lg ${
              period === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod("yearly")}
            className={`px-3 py-1 rounded-lg ${
              period === "yearly" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data[period]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
