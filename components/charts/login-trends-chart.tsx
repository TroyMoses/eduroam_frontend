"use client";

import { useEffect, useState } from "react";
import { fetchLoginTrends } from "@/lib/api";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

export default function LoginTrendsChart({
  source_host,
}: {
  source_host: string;
}) {
  type ChartData = { name: string; value: number };
  const [data, setData] = useState<ChartData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<"day" | "week" | "month">("week");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchLoginTrends(source_host, interval);

        // Transform data for recharts
        const transformedData = result.labels.map(
          (label: string, index: number) => ({
            name: label,
            value: result.datasets[0].data[index],
          })
        );

        setData(transformedData);
      } catch (err) {
        setError("Failed to load login trends data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [source_host, interval]);

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
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button
          variant={interval === "day" ? "default" : "outline"}
          size="sm"
          onClick={() => setInterval("day")}
        >
          Day
        </Button>
        <Button
          variant={interval === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => setInterval("week")}
        >
          Week
        </Button>
        <Button
          variant={interval === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => setInterval("month")}
        >
          Month
        </Button>
      </div>

      <ChartContainer
        config={{
          value: {
            label: "Number of Logins",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-[350px]"
      >
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--chart-2))"
            fill="hsl(var(--chart-2) / 0.2)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
