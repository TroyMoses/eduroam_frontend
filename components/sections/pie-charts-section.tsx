"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import DeviceDistributionChart from "@/components/charts/device-distribution-chart";
import DepartmentUsageChart from "@/components/charts/department-usage-chart";

// Mock data for bandwidth usage by application
const applicationData = [
  { name: "Web Browsing", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Video Streaming", value: 25, color: "hsl(var(--chart-2))" },
  { name: "File Downloads", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Social Media", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Email", value: 8, color: "hsl(var(--chart-5))" },
  { name: "Other", value: 5, color: "hsl(221.2 83.2% 53.3% / 0.5)" },
];

// Mock data for bandwidth usage by time of day
const timeOfDayData = [
  { name: "Morning (6AM-12PM)", value: 30, color: "hsl(var(--chart-1))" },
  { name: "Afternoon (12PM-5PM)", value: 40, color: "hsl(var(--chart-2))" },
  { name: "Evening (5PM-10PM)", value: 25, color: "hsl(var(--chart-3))" },
  { name: "Night (10PM-6AM)", value: 5, color: "hsl(var(--chart-4))" },
];

// Mock data for bandwidth usage by location
const locationData = [
  { name: "Library", value: 30, color: "hsl(var(--chart-1))" },
  { name: "Dormitories", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Academic Buildings", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Student Center", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Sports Facilities", value: 10, color: "hsl(var(--chart-5))" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    startAngle = 0,
    endAngle = 0,
    fill = "#8884d8",
    payload,
    percent = 0,
    value = 0,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="text-sm font-medium"
      >
        {(payload && "name" in payload ? payload.name : "")}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="currentColor"
        className="text-xs"
      >
        {`${value}%`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="currentColor"
        className="text-xs"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("applications");

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const getActiveData = () => {
    switch (activeTab) {
      case "applications":
        return applicationData;
      case "time":
        return timeOfDayData;
      case "location":
        return locationData;
      default:
        return applicationData;
    }
  };

  return (
    <section id="pie-charts" className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          data-aos="fade-up"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Network Usage Insights
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Detailed breakdown of how the network is being utilized across the
              campus
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card data-aos="fade-right">
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>
                Types of devices connecting to the network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeviceDistributionChart />
            </CardContent>
          </Card>

          <Card data-aos="fade-left">
            <CardHeader>
              <CardTitle>Network Usage by Department</CardTitle>
              <CardDescription>
                Distribution of network usage across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DepartmentUsageChart />
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden" data-aos="zoom-in">
          <CardHeader>
            <CardTitle>Bandwidth Distribution</CardTitle>
            <CardDescription>
              Interactive visualization of network bandwidth usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="applications" onValueChange={setActiveTab}>
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="applications">By Application</TabsTrigger>
                <TabsTrigger value="time">By Time of Day</TabsTrigger>
                <TabsTrigger value="location">By Location</TabsTrigger>
              </TabsList>

              <div className="h-[400px]">
                <ChartContainer config={{ pie: { label: "Bandwidth Distribution" } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={getActiveData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                      >
                        {getActiveData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: "20px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
