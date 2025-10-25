import { PrismaClient } from "@prisma/client";
import { AppointmentRequestForm } from "./appointment-request-form";

const prisma = new PrismaClient();

export const metadata = {
  title: "Randevu Talebi - Yıldız Kuaförü",
  description: "Online randevu talebi oluşturun",
};

async function getFormData() {
  const [services, workingHours, specialWorkingDays] = await Promise.all([
    prisma.service.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
    }),
    prisma.workingHours.findMany(),
    prisma.specialWorkingDay.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
    }),
  ]);

  // Convert Decimal to number for client component
  const servicesForClient = services.map((service) => ({
    ...service,
    price_try: Number(service.price_try),
  }));

  return { services: servicesForClient, workingHours, specialWorkingDays };
}

export default async function RandevuPage() {
  const { services, workingHours, specialWorkingDays } = await getFormData();

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Randevu Talebi
            </h1>
            <p className="text-gray-600">
              Randevu talebinizi oluşturun, size en kısa sürede dönüş yapalım
            </p>
          </div>

          <AppointmentRequestForm
            services={services}
            workingHours={workingHours}
            specialWorkingDays={specialWorkingDays}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Randevu takip kodu ile randevunuzu{" "}
            <a href="/takip" className="text-pink-600 hover:underline">
              buradan
            </a>{" "}
            takip edebilirsiniz
          </p>
        </div>
      </div>
    </div>
  );
}
