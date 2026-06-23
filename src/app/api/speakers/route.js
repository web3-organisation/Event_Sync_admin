import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
    const speakers = await prisma.speaker.findMany({
        include: { speakerLinks: true },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(speakers);
}

export async function POST(request) {
    const body = await request.json();

    const speaker = await prisma.speaker.create({
        data: {
            fullName: body.fullName,
            photoUrl: body.photoUrl || null,
            bio: body.bio || null,
        },
    });

    return NextResponse.json(speaker, { status: 201 });
}