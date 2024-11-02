import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { trackingId: string } }
) {
  try {
    const website = await prisma.website.findUnique({
      where: { trackingId: params.trackingId },
    });

    if (!website) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await req.json();
    const { event, payload } = body;

    await prisma.event.create({
      data: {
        websiteId: website.id,
        name: event,
        payload,
      },
    });

    return new NextResponse("OK");
  } catch (error) {
    console.error("[EVENT_TRACKING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}