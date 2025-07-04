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
};

export const fetchAuthSuccessCount = async (source_host: string) => {
  const res = await fetch(
    `${API_URL}/auth-success-count?source_host=${source_host}`
  );
  if (!res.ok) throw new Error("Failed to fetch auth success count");
  return await res.json();
};

// export const fetchAuthStatusSummary = async (source_host: string) => {
//   const res = await fetch(
//     `${API_URL}/auth-status-summary?source_host=${source_host}`
//   );
//   if (!res.ok) throw new Error("Failed to fetch auth status summary");
//   return await res.json();
// };

export const fetchAuthStatusSummary = async () => {
  const res = await fetch(
    `${API_URL}/auth-status-summary`
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
