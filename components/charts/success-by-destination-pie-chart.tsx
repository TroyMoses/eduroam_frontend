"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchSuccessByDestinationPie } from "@/lib/api";

export default function SuccessByDestinationPieChart({
  source_host,
}: {
  source_host: string;
}) {
  const [data, setData] = useState<
    { name: string; value: number; color: string }[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchSuccessByDestinationPie(source_host);

        // Transform data for recharts
        const transformedData = result.labels.map(
          (label: string, index: number) => ({
            name: label,
            value: result.datasets[0].data[index],
            color:
              result.datasets[0].backgroundColor[index] ||
              `hsl(var(--chart-${(index % 5) + 1}))`,
          })
        );

        setData(transformedData);
      } catch (err) {
        setError("Failed to load destination success data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [source_host]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[300px] text-destructive">
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px] text-muted-foreground">
        No destination data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ChartContainer
        className="h-[300px]"
        config={{
          type: {
            label: "Success by Destination",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              nameKey="name"
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
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
              {entry.name}: {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
