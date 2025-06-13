import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopUsersChart from "@/components/charts/top-users-chart";
import LoginTrendsChart from "@/components/charts/login-trends-chart";
import ActiveUsersChart from "@/components/charts/active-users-chart";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChartsSection() {
  const source_host = "radius.umi.ac.ug";

  return (
    <section id="charts" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          data-aos="fade-up"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Data Visualization
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Interactive charts and graphs to help you understand your network
              usage patterns
            </p>
          </div>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <div className="flex justify-center mb-8" data-aos="fade-up">
            <TabsList>
              <TabsTrigger value="users">Top Users</TabsTrigger>
              <TabsTrigger value="logins">Login Trends</TabsTrigger>
              <TabsTrigger value="active">Active Users</TabsTrigger>
            </TabsList>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <TabsContent value="users" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Top Users by Connection Time</CardTitle>
                  <CardDescription>
                    The users with the most connection time on the network
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Suspense
                    fallback={<Skeleton className="h-[350px] w-full" />}
                  >
                    <TopUsersChart source_host={source_host} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logins" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Login Trends Over Time</CardTitle>
                  <CardDescription>
                    Number of logins over different time periods
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Suspense
                    fallback={<Skeleton className="h-[350px] w-full" />}
                  >
                    <LoginTrendsChart source_host={source_host} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Active Users by Hour</CardTitle>
                  <CardDescription>
                    Number of active users throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Suspense
                    fallback={<Skeleton className="h-[350px] w-full" />}
                  >
                    <ActiveUsersChart source_host={source_host} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card data-aos="fade-right">
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>
                Types of devices connecting to the network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Pie chart will be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-aos="fade-left">
            <CardHeader>
              <CardTitle>Network Traffic</CardTitle>
              <CardDescription>
                Network traffic volume over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Area chart will be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
