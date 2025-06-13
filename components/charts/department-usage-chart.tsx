"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for department network usage
const departmentData = [
  { name: "Engineering", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Business", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Science", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Arts", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 8, color: "hsl(var(--chart-5))" },
];

export default function DepartmentUsageChart() {
  return (
    <div className="space-y-4">
      <ChartContainer
        className="h-[300px]"
        config={{
          // Example config, adjust as needed for your ChartContainer
          type: {
            label: "Pie",
            // Optionally add icon: SomeIconComponent,
            color: "hsl(var(--chart-1))"
          },
          title: { label: "Department Usage" },
          // Add other ChartConfig properties if required
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        {departmentData.map((entry, index) => (
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
