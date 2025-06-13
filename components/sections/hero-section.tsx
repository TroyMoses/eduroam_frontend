"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 px-3 md:px-10 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div
            className="flex flex-col justify-center space-y-4"
            data-aos="fade-right"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Visualize Your Network Analytics
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Powerful insights into your Eduroam network usage. Monitor
                trends, identify patterns, and make data-driven decisions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1.5 group">
                Explore Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          {/* <div
            className="flex items-center justify-center"
            data-aos="fade-left"
          >
            <div className="relative h-[350px] w-full md:h-[420px]">
              <Image
                src="/placeholder.svg?height=420&width=600"
                alt="Dashboard Preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
    </section>
  );
}
