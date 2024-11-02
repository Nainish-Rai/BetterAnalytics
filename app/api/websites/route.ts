import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, url } = body;

    if (!name || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const website = await prisma.website.create({
      data: {
        name,
        url,
        userId,
        trackingId: nanoid(),
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    console.error("[WEBSITES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}