import { PrismaClient, AppointmentStatus } from "@prisma/client";
import { requireStaffOrAdmin } from "@/lib/auth/guards";
import { AppointmentsList } from "./appointments-list";

const prisma = new PrismaClient();

export const metadata = {
  title: "Randevular - Yıldız Kuaförü Admin",
  description: "Randevu yönetimi",
};

async function getAppointments() {
  const appointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: [
          AppointmentStatus.PENDING,
          AppointmentStatus.APPROVED,
          AppointmentStatus.CANCELLED,
        ],
      },
    },
    include: {
      appointment_services: {
        include: {
          service: true,
        },
      },
      assigned_staff: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
      customer_user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: [{ date: "asc" }, { time: "asc" }],
  });

  return appointments;
}

async function getStaff() {
  const staff = await prisma.user.findMany({
    where: {
      role: {
        in: ["STAFF", "ADMIN"],
      },
    },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });

  return staff;
}

export default async function RandevularPage() {
  await requireStaffOrAdmin();

  const [appointments, staff] = await Promise.all([
    getAppointments(),
    getStaff(),
  ]);

  // Serialize Decimal values for client component
  const appointmentsForClient = appointments.map((appointment) => ({
    ...appointment,
    appointment_services: appointment.appointment_services.map((as) => ({
      ...as,
      price_try_at_booking: Number(as.price_try_at_booking),
      service: {
        ...as.service,
        price_try: Number(as.service.price_try),
      },
    })),
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Randevular</h1>
          <p className="text-gray-600 mt-2">
            Bekleyen ve onaylanmış randevuları yönetin
          </p>
        </div>

        <AppointmentsList appointments={appointmentsForClient} staff={staff} />
      </div>
    </div>
  );
}
