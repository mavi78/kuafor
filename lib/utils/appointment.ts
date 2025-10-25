import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Generate a unique appointment follow-up code in format: APT-YYYY-NNNNN
 * where YYYY is the year and NNNNN is a sequential 5-digit number.
 *
 * @returns Promise<string> - Unique appointment code
 *
 * @example
 * const code = await generateAppointmentCode()
 * // Returns: "APT-2025-00001"
 */
export async function generateAppointmentCode(): Promise<string> {
  const currentYear = new Date().getFullYear();
  const yearPrefix = `APT-${currentYear}-`;

  // Find the highest sequential number for this year
  const lastAppointment = await prisma.appointment.findFirst({
    where: {
      code: {
        startsWith: yearPrefix,
      },
    },
    orderBy: {
      code: "desc",
    },
    select: {
      code: true,
    },
  });

  let nextNumber = 1;

  if (lastAppointment) {
    // Extract the sequential number from the last code
    const lastNumber = parseInt(lastAppointment.code.split("-")[2], 10);
    nextNumber = lastNumber + 1;
  }

  // Format with leading zeros (5 digits)
  const sequentialNumber = nextNumber.toString().padStart(5, "0");

  return `${yearPrefix}${sequentialNumber}`;
}

/**
 * Check if an appointment can be cancelled by the customer.
 * Customers can only cancel if there are more than 12 hours until the appointment.
 *
 * @param appointmentDate - Date of the appointment (YYYY-MM-DD)
 * @param appointmentTime - Time of the appointment (HH:mm)
 * @returns boolean - True if can be cancelled, false otherwise
 */
export function canCancelAppointment(
  appointmentDate: string,
  appointmentTime: string
): boolean {
  const now = new Date();
  const [year, month, day] = appointmentDate.split("-").map(Number);
  const [hours, minutes] = appointmentTime.split(":").map(Number);

  const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);
  const hoursUntilAppointment =
    (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  return hoursUntilAppointment > 12;
}

/**
 * Check if the selected time is within working hours.
 *
 * @param weekday - Day of week (0 = Sunday, 6 = Saturday)
 * @param time - Time in HH:mm format
 * @param workingHours - Array of working hours from database
 * @param specialWorkingDays - Array of special working days from database
 * @param selectedDate - Date in YYYY-MM-DD format
 * @returns object - { isWithinHours: boolean, message?: string }
 */
export function checkWorkingHours(
  weekday: number,
  time: string,
  workingHours: Array<{
    weekday: number;
    open_time: string | null;
    close_time: string | null;
    is_open: boolean;
  }>,
  specialWorkingDays: Array<{
    date: Date;
    open_time: string | null;
    close_time: string | null;
    is_open: boolean;
  }>,
  selectedDate: string
): { isWithinHours: boolean; message?: string } {
  // Check if there's a special working day for this date
  const selectedDateObj = new Date(selectedDate);
  const specialDay = specialWorkingDays.find((sd) => {
    const sdDate = new Date(sd.date);
    return (
      sdDate.getFullYear() === selectedDateObj.getFullYear() &&
      sdDate.getMonth() === selectedDateObj.getMonth() &&
      sdDate.getDate() === selectedDateObj.getDate()
    );
  });

  if (specialDay) {
    if (!specialDay.is_open) {
      return {
        isWithinHours: false,
        message:
          "Seçtiğiniz tarihte salonumuz kapalıdır. Lütfen başka bir tarih seçin.",
      };
    }

    if (specialDay.open_time && specialDay.close_time) {
      if (time < specialDay.open_time || time >= specialDay.close_time) {
        return {
          isWithinHours: false,
          message: `Seçtiğiniz saat çalışma saatlerimiz dışındadır. Çalışma saatlerimiz: ${specialDay.open_time} - ${specialDay.close_time}`,
        };
      }
    }

    return { isWithinHours: true };
  }

  // Check regular working hours
  const workingDay = workingHours.find((wh) => wh.weekday === weekday);

  if (!workingDay || !workingDay.is_open) {
    return {
      isWithinHours: false,
      message:
        "Seçtiğiniz gün salonumuz kapalıdır. Lütfen başka bir gün seçin.",
    };
  }

  if (workingDay.open_time && workingDay.close_time) {
    if (time < workingDay.open_time || time >= workingDay.close_time) {
      return {
        isWithinHours: false,
        message: `Seçtiğiniz saat çalışma saatlerimiz dışındadır. Çalışma saatlerimiz: ${workingDay.open_time} - ${workingDay.close_time}`,
      };
    }
  }

  return { isWithinHours: true };
}
