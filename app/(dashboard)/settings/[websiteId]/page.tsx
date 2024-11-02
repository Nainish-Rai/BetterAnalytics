import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TrackingScript } from "@/components/tracking-script";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage({
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
  });

  if (!website) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{website.name} Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tracking Script</CardTitle>
        </CardHeader>
        <CardContent>
          <TrackingScript trackingId={website.trackingId} />
        </CardContent>
      </Card>
    </div>
  );
}