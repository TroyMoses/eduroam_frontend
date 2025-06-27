"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAuthSuccessCount } from "@/lib/api";
import { CheckCircle, TrendingUp } from "lucide-react";

export default function AuthSuccessCountCard({
  source_host,
}: {
  source_host: string;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchAuthSuccessCount(source_host);
        setCount(result.success_count);
      } catch (err) {
        setError("Failed to load authentication count");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [source_host]);

  if (loading) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Successful Authentications
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold animate-pulse bg-muted h-8 w-24 rounded"></div>
          <p className="text-xs text-muted-foreground mt-1">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Successful Authentications
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-muted-foreground mt-1">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
          Successful Authentications
        </CardTitle>
        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-1">
          {count?.toLocaleString() || 0}
        </div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          Total successful logins
        </p>
      </CardContent>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200 dark:bg-emerald-800 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-300 dark:bg-emerald-700 rounded-full translate-y-8 -translate-x-8 opacity-20"></div>
    </Card>
  );
}
