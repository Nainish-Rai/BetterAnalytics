import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AnalyticsPage({
  params,
}: {
  params: { websiteId: string };
}) {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const website = await prisma.website.findUnique({
    where: {
      id: params.websiteId,
      userId,
    },
    include: {
      pageViews: {
        orderBy: { createdAt: "desc" },
        take: 100,
      },
      events: {
        orderBy: { createdAt: "desc" },
        take: 100,
      },
      sessions: {
        orderBy: { createdAt: "desc" },
        take: 100,
      },
    },
  });

  if (!website) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{website.name} Analytics</h1>
        <DateRangePicker />
      </div>
      <AnalyticsDashboard website={website} />
    </div>
  );
}