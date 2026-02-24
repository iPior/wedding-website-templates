"use client";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { YES: "#2c2424", NO: "#d4a0b0", PENDING: "#c8bfbf" };

type Props = {
  data: Array<{ name: string; value: number }>;
};

export function AttendanceChart({ data }: Props) {
  if (data.every((d) => d.value === 0)) {
    return (
      <p className="py-8 text-center text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">
        No RSVP data yet.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={COLORS[entry.name as keyof typeof COLORS] ?? "#8a7f7f"}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff8f8",
            border: "1px solid #f0e0e4",
            borderRadius: 0,
            fontSize: 11,
            color: "#2c2424",
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ fontSize: 11, color: "#8a7f7f", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
