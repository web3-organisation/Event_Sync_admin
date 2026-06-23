import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const speaker = await prisma.speaker.findUnique({
        where: { id: params.id },
        include: { speakerLinks: true },
    });

    if (!speaker) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(speaker);
}

export async function PUT(request, { params }) {
    const body = await request.json();

    const speaker = await prisma.speaker.update({
        where: { id: params.id },
        data: {
            fullName: body.fullName,
            photoUrl: body.photoUrl || null,
            bio: body.bio || null,
        },
    });

    return NextResponse.json(speaker);
}

export async function DELETE(request, { params }) {
    await prisma.speaker.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ id: params.id });
}