"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  data: Array<{ date: string; count: number }>;
};

export function RsvpTimeline({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">
        No RSVPs submitted yet.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="date" fontSize={10} tick={{ fill: "#8a7f7f" }} axisLine={{ stroke: "#f0e0e4" }} tickLine={false} />
        <YAxis allowDecimals={false} fontSize={10} tick={{ fill: "#8a7f7f" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff8f8",
            border: "1px solid #f0e0e4",
            borderRadius: 0,
            fontSize: 11,
            color: "#2c2424",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#d4a0b0"
          strokeWidth={2}
          dot={{ r: 3, fill: "#2c2424", strokeWidth: 0 }}
          activeDot={{ r: 4, fill: "#d4a0b0" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
