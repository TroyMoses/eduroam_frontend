import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTopUsers } from "@/lib/api";
import { Users, ArrowUpRight, Clock, Wifi } from "lucide-react";

async function getStats() {
  const source_host = "radius.umi.ac.ug";
  const data = await fetchTopUsers(source_host);
  console.log("Stats data:", data);

  // Extract some stats from the data
  const totalUsers = data.datasets[0].data.reduce(
    (a: number, b: number) => a + b,
    0
  );
  const activeDevices = Math.floor(totalUsers * 1.4); // Just for demo
  const averageSessionTime = "42 minutes";
  const peakHour = "2:00 PM";

  return {
    totalUsers,
    activeDevices,
    averageSessionTime,
    peakHour,
  };
}

export default async function StatsSection() {
  const stats = await getStats();

  return (
    <section id="stats" className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          data-aos="fade-up"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Network Statistics
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Real-time insights into your Eduroam network performance and usage
              patterns
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card data-aos="zoom-in" data-aos-delay="100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3" /> 12%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card data-aos="zoom-in" data-aos-delay="200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Devices
              </CardTitle>
              <Wifi className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.activeDevices.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3" /> 8%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card data-aos="zoom-in" data-aos-delay="300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Session Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.averageSessionTime}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3" /> 3%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card data-aos="zoom-in" data-aos-delay="400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.peakHour}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Consistent with last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
