"use client";

import { useEffect, useState } from "react";
import { fetchTopUsers } from "@/lib/api";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function TopUsersChart({
  source_host,
}: {
  source_host: string;
}) {
  type TopUserData = { name: string; value: number; fill: string };
  const [data, setData] = useState<TopUserData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchTopUsers(source_host);
        console.log("TopUsersChart result:", result);

        // Transform data for recharts
        const transformedData = result.labels.map(
          (label: string, index: number) => ({
            name: label,
            value: result.datasets[0].data[index],
            fill:
              result.datasets[0].backgroundColor[index] ||
              `hsl(var(--chart-${(index % 5) + 1}))`,
          })
        );

        setData(transformedData);
      } catch (err) {
        setError("Failed to load top users data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [source_host]);

  console.log("TopUsersChart data:", data);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[350px]">
        Loading chart data...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-[350px] text-destructive">
        {error}
      </div>
    );
  if (!data) return null;

  return (
    <ChartContainer
      config={{
        value: {
          label: "Connection Time (hours)",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[350px]"
    >
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
