import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Takip kodu gereklidir" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.findUnique({
      where: { code },
      include: {
        appointment_services: {
          include: {
            service: true,
          },
        },
        assigned_staff: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Randevu bulunamadı. Lütfen takip kodunuzu kontrol edin." },
        { status: 404 }
      );
    }

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("Appointment tracking error:", error);
    return NextResponse.json(
      { error: "Randevu sorgulanırken bir hata oluştu" },
      { status: 500 }
    );
  }
}
