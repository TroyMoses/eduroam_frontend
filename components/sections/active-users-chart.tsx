"use client";

import { useEffect, useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for active users by hour
const mockData = [
  { hour: "12 AM", users: 120 },
  { hour: "1 AM", users: 80 },
  { hour: "2 AM", users: 60 },
  { hour: "3 AM", users: 40 },
  { hour: "4 AM", users: 30 },
  { hour: "5 AM", users: 50 },
  { hour: "6 AM", users: 90 },
  { hour: "7 AM", users: 180 },
  { hour: "8 AM", users: 350 },
  { hour: "9 AM", users: 620 },
  { hour: "10 AM", users: 780 },
  { hour: "11 AM", users: 820 },
  { hour: "12 PM", users: 750 },
  { hour: "1 PM", users: 690 },
  { hour: "2 PM", users: 730 },
  { hour: "3 PM", users: 790 },
  { hour: "4 PM", users: 720 },
  { hour: "5 PM", users: 580 },
  { hour: "6 PM", users: 480 },
  { hour: "7 PM", users: 390 },
  { hour: "8 PM", users: 310 },
  { hour: "9 PM", users: 280 },
  { hour: "10 PM", users: 220 },
  { hour: "11 PM", users: 170 },
];

export default function ActiveUsersChart({
  source_host,
}: {
  source_host: string;
}) {
  type ActiveUserData = { hour: string; users: number };
  const [data, setData] = useState<ActiveUserData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [source_host]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[350px]">
        Loading chart data...
      </div>
    );
  if (!data) return null;

  return (
    <ChartContainer
      config={{
        users: {
          label: "Active Users",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[350px]"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="users"
          stroke="hsl(var(--chart-3))"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
