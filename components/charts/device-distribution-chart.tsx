"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

// Mock data for device types
const deviceData = [
  { name: "Laptops", value: 42, color: "hsl(var(--chart-1))" },
  { name: "Smartphones", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Tablets", value: 15, color: "hsl(var(--chart-3))" },
  { name: "IoT Devices", value: 8, color: "hsl(var(--chart-4))" },
  { name: "Others", value: 7, color: "hsl(var(--chart-5))" },
];

// Mock data for operating systems
const osData = [
  { name: "Windows", value: 35, color: "hsl(var(--chart-1))" },
  { name: "iOS", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Android", value: 22, color: "hsl(var(--chart-3))" },
  { name: "macOS", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Linux", value: 3, color: "hsl(var(--chart-5))" },
];

export default function DeviceDistributionChart() {
  const [dataType, setDataType] = useState<"devices" | "os">("devices");
  const data = dataType === "devices" ? deviceData : osData;

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          variant={dataType === "devices" ? "default" : "outline"}
          size="sm"
          onClick={() => setDataType("devices")}
        >
          Device Types
        </Button>
        <Button
          variant={dataType === "os" ? "default" : "outline"}
          size="sm"
          onClick={() => setDataType("os")}
        >
          Operating Systems
        </Button>
      </div>

      <ChartContainer
        className="h-[300px]"
        config={{
          pie: {
            label: dataType === "devices" ? "Device Types" : "Operating Systems",
            // Optionally add icon or color if needed
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        {data.map((entry, index) => (
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
