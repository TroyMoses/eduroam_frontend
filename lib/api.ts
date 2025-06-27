const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchTopUsers = async (source_host: string, limit = 50) => {
  // export const fetchTopUsers = async () => {
  // For demo purposes, we'll return mock data
  // In a real app, you would use the commented code below

  const res = await fetch(
    `${API_URL}/top-users?source_host=${source_host}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch top users");
  return await res.json();

  // Mock data
  // return {
  //   labels: [
  //     "temporary",
  //     "hynakasujja",
  //     "welcome2umi",
  //     "eobella",
  //     "mmsmarch",
  //     "umiwifi",
  //     "rmawanda",
  //     "jakumu",
  //     "mmsmarch58",
  //     "pnakimera",
  //   ],
  //   datasets: [
  //     {
  //       label: "Login Count",
  //       data: [
  //         552017, 286942, 94440, 62108, 40752, 31476, 28844, 27282, 26993,
  //         26894,
  //       ],
  //       backgroundColor: [
  //         "hsl(var(--chart-1))",
  //         "hsl(var(--chart-2))",
  //         "hsl(var(--chart-3))",
  //         "hsl(var(--chart-4))",
  //         "hsl(var(--chart-5))",
  //         "hsl(var(--chart-1))",
  //         "hsl(var(--chart-2))",
  //         "hsl(var(--chart-3))",
  //         "hsl(var(--chart-4))",
  //         "hsl(var(--chart-5))",
  //       ],
  //     },
  //   ],
  // };
};

export const fetchLoginTrends = async (
  source_host: string,
  interval = "week"
) => {
  // For demo purposes, we'll return mock data
  // In a real app, you would use the commented code below

  const res = await fetch(
    `${API_URL}/logins-over-time?source_host=${source_host}&interval=${interval}`
  );
  if (!res.ok) throw new Error("Failed to fetch login trends");
  return await res.json();

  // Mock data based on interval
  // let labels: string[] = []
  // let data: number[] = []

  // if (interval === "day") {
  //   labels = ["12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"]
  //   data = [42, 28, 15, 35, 85, 120, 95, 110, 105, 80, 65, 50]
  // } else if (interval === "week") {
  //   labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  //   data = [520, 580, 610, 590, 650, 420, 380]
  // } else if (interval === "month") {
  //   labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
  //   data = [2200, 2350, 2500, 2400]
  // }

  // return {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Number of Logins",
  //       data,
  //       fill: true,
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //     },
  //   ],
  // }
};

export const fetchAuthSuccessCount = async (source_host: string) => {
  const res = await fetch(
    `${API_URL}/auth-success-count?source_host=${source_host}`
  );
  if (!res.ok) throw new Error("Failed to fetch auth success count");
  return await res.json();
};

export const fetchAuthStatusSummary = async (source_host: string) => {
  const res = await fetch(
    `${API_URL}/auth-status-summary?source_host=${source_host}`
  );
  if (!res.ok) throw new Error("Failed to fetch auth status summary");
  return await res.json();
};

export const fetchSuccessByDestinationPie = async (source_host: string) => {
  const res = await fetch(
    `${API_URL}/success-by-destination-pie?source_host=${source_host}`
  );
  if (!res.ok)
    throw new Error("Failed to fetch success by destination pie data");
  return await res.json();
};

export const fetchSuccessByDestinationBar = async (source_host: string) => {
  const res = await fetch(
    `${API_URL}/success-by-destination-bar?source_host=${source_host}`
  );
  if (!res.ok)
    throw new Error("Failed to fetch success by destination bar data");
  return await res.json();
};
