"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Website } from "@prisma/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { subDays, format } from "date-fns";

interface VisitorsChartProps {
  website: Website & {
    pageViews: any[];
    sessions: any[];
  };
}

export function VisitorsChart({ website }: VisitorsChartProps) {
  // Generate sample data for the last 7 days
  const data = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), i);
    return {
      date: format(date, "MMM d"),
      visitors: Math.floor(Math.random() * 100),
      pageViews: Math.floor(Math.random() * 200),
    };
  }).reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitors Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pageViews"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}