"use client";

import { Website } from "@prisma/client";
import { MetricsGrid } from "./metrics-grid";
import { VisitorsChart } from "./visitors-chart";
import { PageViewsTable } from "./page-views-table";
import { EventsTable } from "./events-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsDashboardProps {
  website: Website & {
    pageViews: any[];
    events: any[];
    sessions: any[];
  };
}

export function AnalyticsDashboard({ website }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-8">
      <MetricsGrid website={website} />
      <VisitorsChart website={website} />
      
      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="space-y-4">
          <PageViewsTable pageViews={website.pageViews} />
        </TabsContent>
        <TabsContent value="events" className="space-y-4">
          <EventsTable events={website.events} />
        </TabsContent>
      </Tabs>
    </div>
  );
}