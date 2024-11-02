import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { trackingId: string } }
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer");
    const userAgent = headersList.get("user-agent");

    const website = await prisma.website.findUnique({
      where: { trackingId: params.trackingId },
    });

    if (!website) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Create or update session
    const session = await prisma.session.create({
      data: {
        websiteId: website.id,
        userAgent,
      },
    });

    // Record page view
    await prisma.pageView.create({
      data: {
        websiteId: website.id,
        sessionId: session.id,
        path: referer || "",
        userAgent,
      },
    });

    // Return tracking script
    const script = `
      function track(event, payload) {
        fetch('/api/track/${params.trackingId}/event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event, payload }),
        });
      }
      window.analytics = { track };
    `;

    return new NextResponse(script, {
      headers: { "Content-Type": "application/javascript" },
    });
  } catch (error) {
    console.error("[TRACKING_SCRIPT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}