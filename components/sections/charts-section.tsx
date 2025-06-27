"use client";

import { useState, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TopUsersChart from "@/components/charts/top-users-chart";
import LoginTrendsChart from "@/components/charts/login-trends-chart";
import ActiveUsersChart from "@/components/charts/active-users-chart";
import { Skeleton } from "@/components/ui/skeleton";
import AuthSuccessCountCard from "@/components/charts/auth-success-count-card";
import AuthStatusPieChart from "@/components/charts/auth-status-pie-chart";
import SuccessByDestinationPieChart from "@/components/charts/success-by-destination-pie-chart";
import SuccessByDestinationBarChart from "@/components/charts/success-by-destination-bar-chart";
import DeviceDistributionChart from "@/components/charts/device-distribution-chart";

// Source host mapping
const SOURCE_HOST_MAP = {
  "Metro CSQ": "eduroam-metro.renu.ac.ug",
  "Metro MESH": "eduroam-mesh.renu.ac.ug",
  Homelinks: "homelinks.renu.ac.ug",
  "eduroam On The Go": "mobile-eduroam.renu.ac.ug",
  "Managed IdP": "schools.net.renu.ac.ug",
  "Outside Uganda": "etlr1.eduroam.org",
  "African Center of Excellence in Bioinformatics and Data Internsive Sciences":
    "aceradius.ace.ac.ug",
  "Islamic University in Uganda": "edradac.iuiu.ac.ug",
  "Insurance Training College (ITC)": "eduroam.itc.ac.ug",
  "Kampala International University": "eduroam.kiu.ac.ug",
  "Mbale Clinical Research Institute": "eduroam.mcri.ac.ug",
  "Makerere University John-Hopkins University": "eduroam.mujhu.org",
  "Soroti University": "eduroam.sorotiuni.ac.ug",
  "Uganda National Council for Science and Technology": "eduroam.uncst.go.ug",
  "Medical Research Council - Kyamulibwa": "eduroam-kyamulibwa.mrcuganda.org",
  "Medical Research Council - Masaka": "eduroam-msk.mrcuganda.org",
  "Busitema University Faculty of Health Sciences": "ipa.bufhs.ac.ug",
  "Mbarara University of Science and Technology": "proxy.must.ac.ug",
  "Nsambya Hospital": "rad.nsambyahospital.or.ug",
  "Bishop Stuart University": "radius.bsu.ac.ug",
  "Busitema University": "radius.busitema.ac.ug",
  "Cavendish University": "radius.cavendish.ac.ug",
  "Clarke International University": "radius.ciu.ac.ug",
  "Ernest Cook Ultrasound Research and Education Institute":
    "radius.ecurei.ac.ug",
  "Equator University of Science and Technology": "radius.equsat.ac.ug",
  "Gulu University": "radius.gu.ac.ug",
  "Heritage International School": "radius.heritage.co.ug",
  "The Interdisciplinary Consortium for Epidemics Research (ICER) - Uganda":
    "radius.iceruganda.ug",
  "Infectious Diseases Research Collaboration": "radius.idrc.ug",
  "Inter-University Council in East Africa": "radius.iucea.org",
  "Kabale University": "radius.kab.ac.ug",
  "Kampala Evangelical School of Theology": "radius.kest.ac.ug",
  "Kuluva School of Nursing and Midwifery":
    "radius.kuluvaschoolofnursing.ac.ug",
  "Kumi University": "radius.kumiuniversity.ac.ug",
  "Kyambogo University": "radius.kyu.ac.ug",
  "Lira University": "radius.lirauni.ac.ug",
  "Makerere University": "radius.mak.ac.ug",
  "MAT ABACUS": "radius.matabacus.ac.ug",
  "Mengo Hospital": "radius.mengohospital.org",
  "Mountains of the Moon University": "radius.mmu.ac.ug",
  "Medical Research Council - Uganda": "radius.mrcuganda.org",
  "Muteesa Royal University": "radius.mru.ac.ug",
  "Makerere University Business School": "radius.mubs.ac.ug",
  "Ndejje University": "radius.ndejjeuniversity.ac.ug",
  "Acacia International School": "radius.rce-acacia.org",
  "Research and Education Network for Uganda(RENU) - Secretariat":
    "radius.renu.ac.ug",
  "Uganda Christian University": "radius.ucu.ac.ug",
  "Uganda Institute of Communications Technology": "radius.uict.ac.ug",
  "Uganda Management Institute": "radius.umi.ac.ug",
  "Uganda Martyrs University": "radius.umu.ac.ug",
  "University of Kisubi": "radius.unik.ac.ug",
  "University of St. Joseph": "radius.usj.ac.ug",
  "University of Rwanda": "radius.ur.ac.rw",
  "Uganda Virus Research Institute": "radius.uvri.go.ug",
  "freeradius32.renu.ac.ug": "freeradius32.renu.ac.ug",
  "eduroam On The Go Tests": "otgdev.renu.ac.ug",
  "Nkumba University": "rad.nkumbauniversity.ac.ug",
  "Bugema University": "radius.bugemauniv.ac.ug",
  "eduroam Visitor Access": "radius.eva.org",
  "Hutchinson Central Research Institute - Uganda": "radius.fredhutch.org",
  "Infectious Diseases Institute": "radius.idi.co.ug",
  "Joint Clinical Research Collaboration": "radius.jcrc.org.ug",
  "University of Burundi": "radius.ub.edu.bi",
  "Refugee Law Project": "roam.refugeelawproject.org",
  "Managed IdP eduroam CAT Tests": "rad.renu.ac.ug",
};

export default function ChartsSection() {
  const [selectedSourceHost, setSelectedSourceHost] =
    useState<string>("radius.umi.ac.ug");
  const [selectedSourceName, setSelectedSourceName] = useState<string>(
    "Uganda Management Institute"
  );

  const handleSourceHostChange = (sourceName: string) => {
    setSelectedSourceName(sourceName);
    setSelectedSourceHost(
      SOURCE_HOST_MAP[sourceName as keyof typeof SOURCE_HOST_MAP]
    );
  };

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

        {/* Source Host Selection */}
        <div className="flex justify-center mb-8" data-aos="fade-up">
          <div className="w-full max-w-md">
            <label
              htmlFor="source-host-select"
              className="block text-sm font-medium mb-2"
            >
              Select Institution
            </label>
            <Select
              value={selectedSourceName}
              onValueChange={handleSourceHostChange}
            >
              <SelectTrigger id="source-host-select">
                <SelectValue placeholder="Select an institution" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(SOURCE_HOST_MAP).map((sourceName) => (
                  <SelectItem key={sourceName} value={sourceName}>
                    {sourceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                    The users with the most connection time on the network for{" "}
                    {selectedSourceName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Suspense
                    fallback={<Skeleton className="h-[350px] w-full" />}
                  >
                    <TopUsersChart source_host={selectedSourceHost} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logins" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Login Trends Over Time</CardTitle>
                  <CardDescription>
                    Number of logins over different time periods for{" "}
                    {selectedSourceName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Suspense
                    fallback={<Skeleton className="h-[350px] w-full" />}
                  >
                    <LoginTrendsChart source_host={selectedSourceHost} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Active Users by Hour</CardTitle>
                  <CardDescription>
                    Number of active users throughout the day for{" "}
                    {selectedSourceName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Suspense
                    fallback={<Skeleton className="h-[350px] w-full" />}
                  >
                    <ActiveUsersChart source_host={selectedSourceHost} />
                  </Suspense>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Authentication Success Count Card */}
        <div className="mt-12" data-aos="fade-up">
          <AuthSuccessCountCard source_host={selectedSourceHost} />
        </div>

        {/* New Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card data-aos="fade-right">
            <CardHeader>
              <CardTitle>Authentication Status</CardTitle>
              <CardDescription>
                Distribution of successful vs failed authentications for{" "}
                {selectedSourceName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
                <AuthStatusPieChart source_host={selectedSourceHost} />
              </Suspense>
            </CardContent>
          </Card>

          <Card data-aos="fade-left">
            <CardHeader>
              <CardTitle>Success by Destination</CardTitle>
              <CardDescription>
                Successful logins distribution by destination host for{" "}
                {selectedSourceName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
                <SuccessByDestinationPieChart
                  source_host={selectedSourceHost}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Top Visited Locations Bar Chart */}
        <div className="mt-8" data-aos="zoom-in">
          <Card>
            <CardHeader>
              <CardTitle>Top Visited Locations</CardTitle>
              <CardDescription>
                Most visited destination hosts by successful logins for{" "}
                {selectedSourceName}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                <SuccessByDestinationBarChart
                  source_host={selectedSourceHost}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Existing Device Distribution and Network Traffic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card data-aos="fade-right">
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>
                Types of devices connecting to the network at{" "}
                {selectedSourceName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DeviceDistributionChart />
            </CardContent>
          </Card>

          <Card data-aos="fade-left">
            <CardHeader>
              <CardTitle>Network Traffic</CardTitle>
              <CardDescription>
                Network traffic volume over time for {selectedSourceName}
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
