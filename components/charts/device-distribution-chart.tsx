"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for device types
const deviceData = [
  { name: "Mobile Phones", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Laptops", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Tablets", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Desktop", value: 8, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 2, color: "hsl(var(--chart-5))" },
];

export default function DeviceDistributionChart() {
  return (
    <div className="space-y-4">
      <ChartContainer
        className="h-[300px]"
        config={{
          type: {
            label: "Pie",
            color: "hsl(var(--chart-1))",
          },
          title: { label: "Device Distribution" },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deviceData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        {deviceData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
