"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchSuccessByDestinationBar } from "@/lib/api";

export default function SuccessByDestinationBarChart({
  source_host,
}: {
  source_host: string;
}) {
  const [data, setData] = useState<
    { name: string; value: number; fill: string }[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchSuccessByDestinationBar(source_host);

        // Transform data for recharts
        const transformedData = result.labels.map(
          (label: string, index: number) => ({
            name: label,
            value: result.datasets[0].data[index],
            fill: result.datasets[0].backgroundColor || "#4f46e5",
          })
        );

        setData(transformedData);
      } catch (err) {
        setError("Failed to load destination bar chart data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [source_host]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[350px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[350px] text-destructive">
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[350px] text-muted-foreground">
        No destination data available
      </div>
    );
  }

  return (
    <ChartContainer
      config={{
        value: {
          label: "Successful Logins",
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
