import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { WebsiteList } from "@/components/website-list";
import { CreateWebsiteButton } from "@/components/create-website-button";

export default async function DashboardPage() {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // const websites = await prisma.website.findMany({
  //   where: { userId },
  //   orderBy: { createdAt: "desc" },
  // });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Websites</h1>
        <CreateWebsiteButton />
      </div>
      {/* <WebsiteList websites={websites} /> */}
    </div>
  );
}
