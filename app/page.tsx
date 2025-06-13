import { Suspense } from "react";
import HeroSection from "@/components/sections/hero-section";
import StatsSection from "@/components/sections/stats-section";
import ChartsSection from "@/components/sections/charts-section";
import PieChartsSection from "@/components/sections/pie-charts-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <HeroSection />

      <Suspense
        fallback={
          <div className="container mx-auto p-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        }
      >
        <StatsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="container mx-auto p-6">
            <Skeleton className="h-[600px] w-full rounded-xl" />
          </div>
        }
      >
        <ChartsSection />
      </Suspense>

      <PieChartsSection />
    </main>
  );
}
