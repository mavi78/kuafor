import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkWorkingHours } from "@/lib/utils/appointment";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, staff_id, service_ids, appointment_id } = body;

    const warnings: any = {
      workingHoursWarning: null,
      staffLeaveWarning: null,
      conflicts: [],
    };

    // Check working hours
    const [workingHours, specialWorkingDays] = await Promise.all([
      prisma.workingHours.findMany(),
      prisma.specialWorkingDay.findMany({
        where: {
          date: {
            gte: new Date(date),
            lte: new Date(date),
          },
        },
      }),
    ]);

    const selectedDate = new Date(date);
    const weekday = selectedDate.getDay();
    const hoursCheck = checkWorkingHours(
      weekday,
      time,
      workingHours,
      specialWorkingDays,
      date
    );

    if (!hoursCheck.isWithinHours && hoursCheck.message) {
      warnings.workingHoursWarning = hoursCheck.message;
    }

    // Check staff leaves
    if (staff_id) {
      const staffLeave = await prisma.staffLeave.findFirst({
        where: {
          staff_user_id: staff_id,
          start_date: {
            lte: new Date(date),
          },
          end_date: {
            gte: new Date(date),
          },
        },
      });

      if (staffLeave) {
        warnings.staffLeaveWarning = `Seçilen çalışan ${new Date(
          staffLeave.start_date
        ).toLocaleDateString("tr-TR")} - ${new Date(
          staffLeave.end_date
        ).toLocaleDateString("tr-TR")} tarihleri arasında izinlidir.`;
      }
    }

    // Check conflicts
    if (staff_id && service_ids && service_ids.length > 0) {
      const services = await prisma.service.findMany({
        where: {
          id: { in: service_ids },
        },
      });

      const totalDuration = services.reduce(
        (sum, s) => sum + s.duration_min,
        0
      );

      // Parse time (HH:mm)
      const [hours, minutes] = time.split(":").map(Number);
      const appointmentStart = new Date(date);
      appointmentStart.setHours(hours, minutes, 0, 0);

      const appointmentEnd = new Date(appointmentStart);
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + totalDuration);

      // Find overlapping appointments for the same staff
      const overlappingAppointments = await prisma.appointment.findMany({
        where: {
          id: {
            not: appointment_id, // Exclude current appointment
          },
          assigned_staff_id: staff_id,
          date: new Date(date),
          status: {
            in: ["PENDING", "APPROVED"],
          },
        },
        include: {
          appointment_services: {
            include: {
              service: true,
            },
          },
        },
      });

      const conflicts = overlappingAppointments.filter((apt) => {
        const [aptHours, aptMinutes] = apt.time.split(":").map(Number);
        const aptStart = new Date(date);
        aptStart.setHours(aptHours, aptMinutes, 0, 0);

        const aptDuration = apt.appointment_services.reduce(
          (sum, as) => sum + as.service.duration_min,
          0
        );

        const aptEnd = new Date(aptStart);
        aptEnd.setMinutes(aptEnd.getMinutes() + aptDuration);

        // Check if times overlap
        return (
          (appointmentStart >= aptStart && appointmentStart < aptEnd) ||
          (appointmentEnd > aptStart && appointmentEnd <= aptEnd) ||
          (appointmentStart <= aptStart && appointmentEnd >= aptEnd)
        );
      });

      warnings.conflicts = conflicts.map((apt) => ({
        id: apt.id,
        customer_name: apt.customer_name,
        time: apt.time,
        duration: apt.appointment_services.reduce(
          (sum, as) => sum + as.service.duration_min,
          0
        ),
        services: apt.appointment_services.map((as) => as.service.name),
      }));
    }

    return NextResponse.json(warnings);
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      { error: "Doğrulama sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
