"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Website } from "@prisma/client";
import { Users, MousePointerClick, Timer, ArrowUpRight } from "lucide-react";

interface MetricsGridProps {
  website: Website & {
    pageViews: any[];
    events: any[];
    sessions: any[];
  };
}

export function MetricsGrid({ website }: MetricsGridProps) {
  const metrics = [
    {
      title: "Total Visitors",
      value: website.sessions.length,
      icon: Users,
      change: "+12.3%",
    },
    {
      title: "Page Views",
      value: website.pageViews.length,
      icon: MousePointerClick,
      change: "+8.1%",
    },
    {
      title: "Avg. Session Duration",
      value: "2m 13s",
      icon: Timer,
      change: "-3.2%",
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      icon: ArrowUpRight,
      change: "+4.3%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}>
                  {metric.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}